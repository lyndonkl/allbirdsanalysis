/* =========================================================================
   The Last Trade of Allbirds — scrollytelling runtime
   Plan sections: §3 (scene plans), §4 (design tokens), §9 (Scene 13 spec)
   Vanilla JS + D3 v7 + scrollama (no bundler, no build step).
   ========================================================================= */

'use strict';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Design tokens — mirror of CSS custom properties so D3 can read them.
const T = {
  ink: '#1A1A1A', ink60: '#5C5C5C', ink40: '#9E9E9E',
  accent: '#0E7C7B', bull: '#3A8E5C', bear: '#B23A48',
  marginal: '#D9A441', grey: '#8A8A8A', highlight: '#FFF4D6',
  paper: '#FBFAF7', paperWarm: '#F8F4EC', cream: '#F3EBDA',
  slate: '#1A1F2A', black: '#0B0B0E', closing: '#FAF7F0', white: '#FFFFFF',
  crimsonWash: '#F3E0DD'
};

// Ticker logic — the piece's heartbeat (plan §4)
const tickerEl = document.getElementById('birdTicker');
const tickerPriceEl = document.getElementById('birdTickerPrice');
let lastPrice = 2.49;

function setTicker(price, opts = {}) {
  const p = Number(price);
  if (!Number.isFinite(p)) return;
  const dir = p > lastPrice + 0.005 ? 'up' : (p < lastPrice - 0.005 ? 'down' : '');
  tickerEl.classList.remove('up', 'down');
  if (dir) tickerEl.classList.add(dir);
  tickerPriceEl.textContent = '$' + p.toFixed(2);
  lastPrice = p;
  if (opts.dark === true) tickerEl.classList.add('dark');
  else if (opts.dark === false) tickerEl.classList.remove('dark');
}

// Progress bar
const progressFill = document.getElementById('progressFill');
const progressTicks = document.getElementById('progressTicks');
for (let i = 0; i < 17; i++) {
  const t = document.createElement('div');
  t.className = 'progress-bar__tick';
  progressTicks.appendChild(t);
}
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progressFill.style.width = pct + '%';
}, { passive: true });

// Body background swap based on active scene
const scenes = Array.from(document.querySelectorAll('[data-scene]'));

function updateBodyBg(sceneEl) {
  if (!sceneEl) return;
  const bg = sceneEl.getAttribute('data-bg');
  if (bg) document.body.setAttribute('data-bg', bg);
  // ticker dark mode for dark backgrounds
  const dark = bg === 'black' || bg === 'slate';
  setTicker(lastPrice, { dark });
}

// Skip intro button
const skipBtn = document.getElementById('skipIntro');
setTimeout(() => {
  if (window.scrollY < 40) skipBtn.classList.add('visible');
}, 3000);
skipBtn.addEventListener('click', () => {
  document.querySelector('#scene-2').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  skipBtn.classList.remove('visible');
});
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) skipBtn.classList.remove('visible');
}, { passive: true });

// Keyboard nav — arrow keys advance one scene
document.addEventListener('keydown', (e) => {
  if (e.target.matches('input, textarea, [contenteditable]')) return;
  const scenesOrdered = scenes;
  const cy = window.scrollY + window.innerHeight / 2;
  let idx = 0;
  for (let i = 0; i < scenesOrdered.length; i++) {
    const r = scenesOrdered[i].getBoundingClientRect();
    const top = r.top + window.scrollY;
    if (cy >= top) idx = i;
  }
  if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
    e.preventDefault();
    const next = scenesOrdered[Math.min(idx + 1, scenesOrdered.length - 1)];
    next.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
    e.preventDefault();
    const prev = scenesOrdered[Math.max(idx - 1, 0)];
    prev.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  }
});

// Data loader — prefers inline `window.__BIRD_DATA__` (file:// safe),
// falls back to fetch() for the JSON files when served over HTTP.
const DATA = {};
async function loadAllData() {
  const files = ['agents', 'chardan-deals', 'gpu-prices', 'npv-grid',
                 'intraday-bird', 'capital-ladder', 'lbcc-overlay', 'may18'];
  if (window.__BIRD_DATA__) {
    files.forEach(f => { DATA[f] = window.__BIRD_DATA__[f]; });
    return;
  }
  await Promise.all(files.map(async (f) => {
    try {
      const res = await fetch(`data/${f}.json`);
      DATA[f] = await res.json();
    } catch (err) {
      console.error('Failed to load', f, err);
    }
  }));
}

// =============================================================
// Scene 1 — trailing 12-month BIRD line
// =============================================================
function renderScene1() {
  const el = document.getElementById('s1-chart');
  if (!el || !DATA['intraday-bird']) return;
  const data = DATA['intraday-bird'].trailing12;
  const W = 720, H = 170, M = { t: 20, r: 24, b: 28, l: 36 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b;

  const x = d3.scaleLinear().domain([0, data.length - 1]).range([0, iw]);
  const y = d3.scaleLinear().domain([2.2, 3.3]).range([ih, 0]);
  const line = d3.line().x((d, i) => x(i)).y(d => y(d.p)).curve(d3.curveMonotoneX);

  const svg = d3.select(el).selectAll('svg').data([0]).join('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  svg.selectAll('*').remove();

  const g = svg.append('g').attr('transform', `translate(${M.l},${M.t})`);

  // y ticks
  [2.5, 3.0].forEach(v => {
    g.append('line').attr('x1', 0).attr('x2', iw).attr('y1', y(v)).attr('y2', y(v))
      .attr('stroke', 'rgba(255,255,255,0.15)').attr('stroke-width', 1);
    g.append('text').attr('x', -6).attr('y', y(v) + 4).attr('text-anchor', 'end')
      .attr('class', 'axis-label').text('$' + v.toFixed(2));
  });
  // x ticks
  [0, data.length - 1].forEach(i => {
    g.append('text').attr('x', x(i)).attr('y', ih + 18)
      .attr('text-anchor', i === 0 ? 'start' : 'end')
      .attr('class', 'axis-label').text(data[i].d);
  });

  g.append('path').attr('class', 'bird-line').attr('d', line(data));
  // last point (the close before the pivot = 2.49)
  g.append('circle').attr('class', 'low-dot')
    .attr('cx', x(data.length - 1)).attr('cy', y(data[data.length - 1].p)).attr('r', 4);
  g.append('text').attr('class', 'axis-label')
    .attr('x', x(data.length - 1) - 8).attr('y', y(data[data.length - 1].p) - 8)
    .attr('text-anchor', 'end').attr('fill', '#F5F3EE').text('52-week low · $2.49');

  setTimeout(() => el.classList.add('is-drawn'), 300);
}

// =============================================================
// Scene 3 — intraday candlesticks
// =============================================================
function renderScene3(progress = 1) {
  const el = document.getElementById('s3-chart');
  if (!el || !DATA['intraday-bird']) return;
  const allBars = DATA['intraday-bird'].intraday;
  // Scene 3 reveals the morning up to peak. Scene 11 continues the fade.
  const peakIdx = allBars.findIndex(b => b.t === '09:47');
  const revealCount = Math.ceil((peakIdx + 1) * Math.max(0.15, progress));
  const bars = allBars.slice(0, revealCount);

  const W = 960, H = 460, M = { t: 50, r: 80, b: 70, l: 50 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b;
  const volH = 70;
  const priceH = ih - volH - 12;

  const x = d3.scaleBand().domain(allBars.map(b => b.t)).range([0, iw]).padding(0.22);
  const y = d3.scaleLinear().domain([2, 26]).range([priceH, 0]).nice();
  const vScale = d3.scaleLinear().domain([0, 100]).range([0, volH]);

  const svg = d3.select(el).selectAll('svg').data([0]).join('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  svg.selectAll('*').remove();

  // title
  svg.append('text').attr('x', M.l).attr('y', 26)
    .attr('font-family', 'Source Serif 4, Georgia, serif').attr('font-size', 20).attr('font-style', 'italic')
    .attr('fill', T.ink).text('BIRD intraday · April 15, 2026');
  svg.append('text').attr('x', M.l).attr('y', 42)
    .attr('font-family', 'Inter, sans-serif').attr('font-size', 11).attr('fill', T.ink60)
    .text('5-minute bars. Left axis: price (USD). Grey strip: share volume as % of float.');

  const g = svg.append('g').attr('transform', `translate(${M.l},${M.t})`);

  // y grid
  y.ticks(6).forEach(v => {
    g.append('line').attr('x1', 0).attr('x2', iw).attr('y1', y(v)).attr('y2', y(v))
      .attr('stroke', T.ink40).attr('stroke-opacity', 0.2);
    g.append('text').attr('x', -8).attr('y', y(v) + 4).attr('text-anchor', 'end')
      .attr('class', 'axis-text').text('$' + v.toFixed(0));
  });

  // x axis labels (every 3rd)
  allBars.forEach((b, i) => {
    if (i % 3 === 0 || b.t === '09:47' || b.t === '16:00') {
      g.append('text').attr('x', x(b.t) + x.bandwidth() / 2).attr('y', priceH + 18)
        .attr('text-anchor', 'middle').attr('class', 'axis-text').text(b.t);
    }
  });

  // Short-interest band (18.3% of 2.49 prior close — conceptual shading behind bars near the bottom)
  const siY1 = y(2.49);
  const siY2 = y(2.49 - (2.49 * 0.183));
  g.append('rect').attr('class', 'short-band')
    .attr('x', 0).attr('y', Math.min(siY1, siY2))
    .attr('width', iw).attr('height', Math.abs(siY2 - siY1));

  // Candles
  bars.forEach((b) => {
    const cx = x(b.t) + x.bandwidth() / 2;
    const up = b.c >= b.o;
    g.append('line').attr('class', 'wick')
      .attr('x1', cx).attr('x2', cx).attr('y1', y(b.h)).attr('y2', y(b.l));
    const bodyY = y(Math.max(b.o, b.c));
    const bodyH = Math.max(2, Math.abs(y(b.o) - y(b.c)));
    g.append('rect').attr('class', up ? 'candle-up' : 'candle-down')
      .attr('x', x(b.t)).attr('y', bodyY)
      .attr('width', x.bandwidth()).attr('height', bodyH);
  });

  // Volume bars
  const volTop = priceH + 12;
  g.append('text').attr('x', -8).attr('y', volTop + volH / 2)
    .attr('text-anchor', 'end').attr('class', 'axis-text').text('Vol');
  bars.forEach((b) => {
    g.append('rect').attr('class', 'volume-bar')
      .attr('x', x(b.t)).attr('y', volTop + volH - vScale(b.v))
      .attr('width', x.bandwidth()).attr('height', vScale(b.v));
  });

  // Peak annotation if we reached 09:47
  if (bars.some(b => b.t === '09:47')) {
    const cx = x('09:47') + x.bandwidth() / 2;
    g.append('line').attr('x1', cx).attr('x2', cx + 60).attr('y1', y(24.31)).attr('y2', y(24.31))
      .attr('stroke', T.bear).attr('stroke-width', 1);
    g.append('text').attr('class', 'peak-label')
      .attr('x', cx + 66).attr('y', y(24.31) + 2).attr('alignment-baseline', 'middle')
      .text('$24.31 · +582%');
    g.append('text').attr('x', cx + 66).attr('y', y(24.31) + 22)
      .attr('class', 'axis-text').attr('fill', T.ink60)
      .text('9:47 AM · 288M shares traded · 35× float');
  }

  // BIRD ticker reflects the last visible bar
  const last = bars[bars.length - 1];
  if (last) setTicker(last.c);
}

// =============================================================
// Scene 5 — shrinking valuation box
// =============================================================
const S5_FRAMES = [
  { year: 'Nov 2021',  label: '$4.1B',  sub: 'IPO at $15/share',             area: 1.0  },
  { year: '2023',      label: '$1.1B',  sub: 'Post-reset trading range',     area: 0.27 },
  { year: '2025',      label: '$180M',  sub: 'Going-concern warning filed',  area: 0.045 },
  { year: 'Mar 2026',  label: '$39M',   sub: 'Asset sale to American Exchange Group', area: 0.0095 }
];

function renderScene5(stepIdx = 0) {
  const stage = document.getElementById('s5-stage');
  if (!stage) return;
  const frame = S5_FRAMES[Math.min(stepIdx, S5_FRAMES.length - 1)];
  const canvas = document.getElementById('s5-canvas');
  const cw = canvas.clientWidth || 500;
  const ch = 500;
  // area-proportional scaling so the box is honestly smaller
  const side = Math.sqrt(frame.area) * Math.min(cw, ch) * 0.95;
  const box = document.getElementById('s5-box');
  box.style.width = Math.max(18, side) + 'px';
  box.style.height = Math.max(18, side) + 'px';

  const lbl = document.getElementById('s5-label');
  lbl.textContent = frame.label;
  lbl.style.fontSize = Math.max(14, Math.min(64, side / 4)) + 'px';

  const sub = document.getElementById('s5-sub');
  sub.textContent = frame.year + ' · ' + frame.sub;

  // timeline ticks
  const tl = document.getElementById('s5-timeline');
  if (tl.childElementCount === 0) {
    S5_FRAMES.forEach((f, i) => {
      const row = document.createElement('div');
      row.className = 'tl-row';
      row.innerHTML = `${f.year}<span class="val">${f.label}</span>`;
      row.style.top = (18 + (i / (S5_FRAMES.length - 1)) * 440) + 'px';
      row.dataset.idx = i;
      tl.appendChild(row);
    });
  }
  tl.querySelectorAll('.tl-row').forEach(r => {
    r.classList.toggle('is-active', Number(r.dataset.idx) <= stepIdx);
  });

  document.getElementById('s5-destruction').classList.toggle('visible', stepIdx >= 3);
  document.getElementById('s5-conv').classList.toggle('visible', stepIdx >= 3);
}

// =============================================================
// Scene 6 — redacted document (state toggled by entry)
// =============================================================
function renderScene6() {
  document.getElementById('scene-6').classList.add('revealed');
}

// =============================================================
// Scene 7 — Chardan small multiples
// =============================================================
function buildScene7() {
  const grid = document.getElementById('s7-grid');
  if (!grid || !DATA['chardan-deals']) return;
  if (grid.childElementCount > 0) return;
  const deals = DATA['chardan-deals'].deals;
  deals.forEach((d, i) => {
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.dataset.idx = i;
    const seriesNorm = d.series;
    const max = 260, min = 0;
    const w = 220, h = 60;
    const xs = seriesNorm.map((_, j) => (j / (seriesNorm.length - 1)) * w);
    const ys = seriesNorm.map(v => h - ((v - min) / (max - min)) * h);
    const path = xs.map((x, j) => (j === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + ys[j].toFixed(1)).join(' ');
    panel.innerHTML = `
      <h5><span class="ticker-pill">${d.ticker}</span>${d.company}</h5>
      <div class="theme">${d.theme} · ${d.year}</div>
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
        <path class="spark" d="${path}"></path>
        <circle class="end-dot" cx="${xs[xs.length - 1]}" cy="${ys[ys.length - 1]}" r="3.5"></circle>
      </svg>
      <div class="outcome">${d.outcome}</div>
    `;
    grid.appendChild(panel);
  });

  // 7th panel
  const qPanel = document.createElement('div');
  qPanel.className = 'panel panel--bird';
  qPanel.innerHTML = `<div class="q">?</div><div class="caption">NewBird AI · day 1</div>`;
  grid.appendChild(qPanel);
}

function lightScene7Panel(n) {
  const grid = document.getElementById('s7-grid');
  if (!grid) return;
  grid.querySelectorAll('.panel').forEach((p, idx) => {
    p.classList.toggle('is-lit', idx < n);
  });
}

// =============================================================
// Scene 8 — LBCC overlay
// =============================================================
function renderScene8(stepIdx = 0) {
  const el = document.getElementById('s8-chart');
  if (!el || !DATA['lbcc-overlay']) return;
  const d = DATA['lbcc-overlay'];
  const W = 880, H = 460, M = { t: 30, r: 30, b: 50, l: 48 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b;

  const x = d3.scaleLinear().domain([-30, 365]).range([0, iw]);
  const y = d3.scaleLinear().domain([0, 620]).range([ih, 0]);

  const svg = d3.select(el).selectAll('svg').data([0]).join('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  svg.selectAll('*').remove();

  svg.append('text').attr('x', M.l).attr('y', 18)
    .attr('font-family', 'Inter, sans-serif').attr('font-size', 11).attr('fill', T.ink60)
    .attr('letter-spacing', '0.12em').text('INDEXED TO 100 AT ANNOUNCEMENT · DAYS FROM REBRAND');

  const g = svg.append('g').attr('transform', `translate(${M.l},${M.t})`);

  // Future shade beyond BIRD day 0
  g.append('rect').attr('class', 'future-shade')
    .attr('x', x(0)).attr('y', 0).attr('width', iw - x(0)).attr('height', ih);

  // Grid
  y.ticks(5).forEach(v => {
    g.append('line').attr('x1', 0).attr('x2', iw).attr('y1', y(v)).attr('y2', y(v))
      .attr('stroke', T.ink40).attr('stroke-opacity', 0.2);
    g.append('text').attr('x', -6).attr('y', y(v) + 3).attr('text-anchor', 'end')
      .attr('font-family', 'JetBrains Mono, monospace').attr('font-size', 10).attr('fill', T.ink60).text(v);
  });
  [-30, 0, 90, 180, 270, 365].forEach(v => {
    g.append('text').attr('x', x(v)).attr('y', ih + 18).attr('text-anchor', 'middle')
      .attr('font-family', 'JetBrains Mono, monospace').attr('font-size', 10).attr('fill', T.ink60)
      .text((v > 0 ? '+' : '') + v);
  });

  // Announcement vertical
  g.append('line').attr('class', 'announce-line')
    .attr('x1', x(0)).attr('x2', x(0)).attr('y1', 0).attr('y2', ih);
  g.append('text').attr('x', x(0)).attr('y', -6).attr('text-anchor', 'middle')
    .attr('font-family', 'Inter, sans-serif').attr('font-size', 11).attr('fill', T.ink60)
    .text('ANNOUNCEMENT');

  // LBCC line progressive: step 1 shows pre-announce only, step 2 to day 0, 3 to 90, 4 to 180, 5 to 365
  const dayCutoffs = [-1, 0, 90, 180, 365, 365];
  const cutoff = dayCutoffs[Math.min(stepIdx, dayCutoffs.length - 1)];
  const lineGen = d3.line().x(d => x(d.d)).y(d => y(d.p)).curve(d3.curveMonotoneX);
  const lbcc = d.lbcc.series.filter(pt => pt.d <= cutoff);
  if (lbcc.length > 1) {
    g.append('path').attr('class', 'line-lbcc').attr('d', lineGen(lbcc));
  }

  // BIRD line — always drawn through day 0 with the pulse at the endpoint
  const bird = d.bird.series.filter(pt => pt.d <= 0);
  g.append('path').attr('class', 'line-bird').attr('d', lineGen(bird));
  // Pulse + dot at day 0
  g.append('circle').attr('class', 'bird-dot-pulse')
    .attr('cx', x(0)).attr('cy', y(582));
  g.append('circle').attr('class', 'bird-dot')
    .attr('cx', x(0)).attr('cy', y(582)).attr('r', 5);

  // Legend
  const legend = g.append('g').attr('transform', `translate(${iw - 200},10)`);
  legend.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 20).attr('y2', 0)
    .attr('stroke', T.grey).attr('stroke-width', 2);
  legend.append('text').attr('x', 26).attr('y', 4).attr('font-family', 'Inter, sans-serif').attr('font-size', 12).attr('fill', T.ink60)
    .text('Long Blockchain (2017-18)');
  legend.append('line').attr('x1', 0).attr('y1', 18).attr('x2', 20).attr('y2', 18)
    .attr('stroke', T.accent).attr('stroke-width', 2.6);
  legend.append('text').attr('x', 26).attr('y', 22).attr('font-family', 'Inter, sans-serif').attr('font-size', 12).attr('fill', T.accent)
    .text('NewBird AI (today)');

  // Milestone labels progressive
  const milestones = d.lbcc.milestones;
  const visibleMilestones = Math.max(0, Math.min(milestones.length, stepIdx));
  milestones.slice(0, visibleMilestones).forEach(m => {
    const day = m.d;
    if (day > cutoff) return;
    const pt = d.lbcc.series.reduce((a, b) => (Math.abs(b.d - day) < Math.abs(a.d - day) ? b : a));
    g.append('circle').attr('class', 'milestone-dot').attr('cx', x(day)).attr('cy', y(pt.p)).attr('r', 3);
    g.append('text').attr('class', 'milestone-label').attr('x', x(day) + 6).attr('y', y(pt.p) - 6).text(m.label);
  });
}

// =============================================================
// Scene 9 — scale zoom (SIGNATURE)
// =============================================================
const S9_ZOOMS = [1, 18, 55, 116, 4688, 8000]; // last one gives hyperscalers headroom + the $500M-$1B band annotation

function renderScene9(stepIdx = 0) {
  const el = document.getElementById('s9-stage');
  if (!el || !DATA['capital-ladder']) return;
  const d = DATA['capital-ladder'];
  const rungs = d.rungs;
  const W = 720, H = 620;
  const cx = W / 2, cy = H / 2;

  const svg = d3.select(el).selectAll('svg').data([0]).join('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  svg.selectAll('*').remove();

  const zoom = S9_ZOOMS[Math.min(stepIdx, S9_ZOOMS.length - 1)];
  // base anchor radius when zoom=1
  const anchorR = 110;
  // each rung radius is proportional to sqrt(value/anchor.value) because area ratio
  const areaRatio = v => Math.sqrt(v / rungs[0].value); // = sqrt(ratio)
  // on-screen radius = anchorR * areaRatio(v) / zoom
  // but we want anchor to stay visible at zoom=1 and shrink as zoom grows
  // So on-screen anchor radius = anchorR / zoom. Visible circles must have enough screen room.

  rungs.forEach((r, i) => {
    const onscreen = (anchorR / 1) * (areaRatio(r.value)) / zoom * 1; // simplified
    // use an asymptotic clamp — the anchor should be visible but tiny at max zoom
    const screenR = Math.max(0.8, Math.min(280, (anchorR * areaRatio(r.value)) / zoom));
    const visible = screenR >= 0.8 && screenR <= 320;
    if (!visible && i !== 0) return;
    const isAnchor = i === 0;
    svg.append('circle').attr('class', 'ring')
      .attr('cx', cx).attr('cy', cy).attr('r', screenR)
      .attr('stroke', isAnchor ? T.accent : T.grey)
      .attr('stroke-opacity', isAnchor ? 1 : 0.6)
      .attr('stroke-width', isAnchor ? 2 : 1.2)
      .attr('fill', isAnchor ? T.accent : 'none')
      .attr('fill-opacity', isAnchor ? 0.15 : 0);

    // Label position: at top of ring when big enough
    if (screenR > 18) {
      svg.append('text').attr('class', 'ring-label')
        .attr('x', cx).attr('y', cy - screenR - 12)
        .attr('text-anchor', 'middle').attr('fill', isAnchor ? T.accent : T.ink60)
        .text(r.name);
      svg.append('text').attr('class', 'ring-value')
        .attr('x', cx).attr('y', cy - screenR + 4)
        .attr('text-anchor', 'middle').attr('fill', isAnchor ? T.accent : T.ink)
        .text(r.value >= 1000 ? '$' + (r.value / 1000).toFixed(r.value >= 10000 ? 0 : 1) + 'B' : '$' + r.value + 'M');
    }
  });

  // Min-viable band as a subtle ring between $500M and $1B
  if (stepIdx >= 5) {
    const rMin = Math.max(0.8, (anchorR * areaRatio(500)) / zoom);
    const rMax = Math.max(0.8, (anchorR * areaRatio(1000)) / zoom);
    svg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', rMax)
      .attr('fill', T.marginal).attr('fill-opacity', 0.08).attr('stroke', 'none');
    svg.append('circle').attr('cx', cx).attr('cy', cy).attr('r', rMin)
      .attr('fill', T.white).attr('fill-opacity', 1).attr('stroke', T.marginal)
      .attr('stroke-dasharray', '3 3').attr('stroke-width', 1);
    svg.append('text').attr('x', cx).attr('y', cy - rMax - 14)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Inter, sans-serif').attr('font-size', 12).attr('fill', T.marginal)
      .text('Minimum viable neocloud: $500M–$1B');
  }

  // "You are here" arrow when zoom is large
  if (zoom >= 116) {
    svg.append('text').attr('class', 'you-are-here')
      .attr('x', cx).attr('y', cy + 50)
      .attr('text-anchor', 'middle')
      .text('↑ YOU ARE HERE — NewBird AI');
  }

  // Caption panel update
  const captionData = [
    { ratio: '1×',    text: 'NewBird AI has $128 million. That is the denominator for everything that follows.' },
    { ratio: '18×',   text: 'Lambda Labs, private and Nvidia-backed, has raised $2.3 billion. Eighteen times NewBird\'s entire capital base.' },
    { ratio: '55×',   text: 'Applied Digital has invested $7 billion in AI data centers and still reports only $340M in revenue.' },
    { ratio: '116×',  text: 'CoreWeave spent $14.9 billion on capex in 2025 alone. NewBird\'s capital is one pixel inside that bar.' },
    { ratio: '4,688×',text: 'AWS + Azure + GCP + Meta will spend over $600 billion on AI infrastructure in 2025. NewBird\'s capital is 0.02% of table stakes.' },
    { ratio: '3.9×–7.8×', text: 'To matter at this table NewBird needs $500M–$1B. It has $128M. That is not a competitive disadvantage. That is a category error.' }
  ];
  const c = captionData[Math.min(stepIdx, captionData.length - 1)];
  document.getElementById('s9-ratio').textContent = c.ratio;
  document.getElementById('s9-captext').textContent = c.text;
}

// =============================================================
// Scene 10 — NPV heatmap
// =============================================================
function renderScene10(stepIdx = 0) {
  const el = document.getElementById('s10-stage');
  if (!el || !DATA['npv-grid']) return;
  const d = DATA['npv-grid'];
  const W = 780, H = 520, M = { t: 70, r: 30, b: 60, l: 130 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b;

  const x = d3.scaleBand().domain(d.utils.map(u => u + '%')).range([0, iw]).padding(0.06);
  const y = d3.scaleBand().domain([...d.rates].reverse().map(r => '$' + r.toFixed(2))).range([0, ih]).padding(0.06);
  const maxAbs = 60;
  const color = v => {
    if (v < 0) {
      const t = Math.min(1, Math.abs(v) / 50);
      return d3.interpolateRgb('#F6D8D8', T.bear)(t);
    } else if (v === 0) return T.marginal;
    else {
      const t = Math.min(1, v / 50);
      return d3.interpolateRgb('#E0EEDE', T.bull)(t);
    }
  };

  const svg = d3.select(el).selectAll('svg').data([0]).join('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  svg.selectAll('*').remove();

  // title
  svg.append('text').attr('x', M.l).attr('y', 28)
    .attr('font-family', 'Source Serif 4, Georgia, serif').attr('font-size', 22).attr('font-style', 'italic')
    .attr('fill', T.ink).text('Unit economics live or die at $3.50/hour');
  svg.append('text').attr('x', M.l).attr('y', 48)
    .attr('font-family', 'Inter, sans-serif').attr('font-size', 12).attr('fill', T.ink60)
    .text('Project NPV ($M) at six rental rates × six utilization rates, 5-year DCF at 10.5% WACC');

  const g = svg.append('g').attr('transform', `translate(${M.l},${M.t})`);

  // axes
  d.utils.forEach(u => {
    g.append('text').attr('class', 'hm-axis').attr('x', x(u + '%') + x.bandwidth() / 2).attr('y', ih + 18)
      .attr('text-anchor', 'middle').text(u + '%');
  });
  g.append('text').attr('class', 'hm-title').attr('x', iw / 2).attr('y', ih + 42)
    .attr('text-anchor', 'middle').text('Utilization →');
  d.rates.forEach(r => {
    g.append('text').attr('class', 'hm-axis').attr('x', -8).attr('y', y('$' + r.toFixed(2)) + y.bandwidth() / 2 + 4)
      .attr('text-anchor', 'end').text('$' + r.toFixed(2) + '/hr');
  });
  g.append('text').attr('class', 'hm-title')
    .attr('transform', `translate(${-100},${ih / 2}) rotate(-90)`)
    .attr('text-anchor', 'middle').text('↑ Rental rate');

  // cells — animate by column based on stepIdx
  const maxCol = stepIdx >= 1 ? d.utils.length : 0;
  d.rates.forEach((r, ri) => {
    // data grid is rates[ri]→utils[ci]
    const rowData = d.grid[ri];
    d.utils.forEach((u, ci) => {
      if (ci >= maxCol) return;
      const v = rowData[ci];
      g.append('rect').attr('class', 'hm-cell')
        .attr('x', x(u + '%')).attr('y', y('$' + r.toFixed(2)))
        .attr('width', x.bandwidth()).attr('height', y.bandwidth())
        .attr('fill', color(v));
      g.append('text').attr('class', 'hm-label')
        .attr('x', x(u + '%') + x.bandwidth() / 2)
        .attr('y', y('$' + r.toFixed(2)) + y.bandwidth() / 2 + 4)
        .attr('text-anchor', 'middle')
        .attr('fill', Math.abs(v) > 25 ? '#FFF' : T.ink)
        .text((v >= 0 ? '+' : '') + v);
    });
  });

  // thesis row highlight
  if (stepIdx >= 2) {
    const thesisY = y('$' + d.thesisRate.toFixed(2));
    g.append('rect').attr('x', -6).attr('y', thesisY - 3)
      .attr('width', iw + 12).attr('height', y.bandwidth() + 6)
      .attr('fill', 'none').attr('stroke', T.marginal).attr('stroke-width', 2);
    g.append('text').attr('x', iw + 10).attr('y', thesisY + y.bandwidth() / 2 + 4)
      .attr('font-family', 'Inter, sans-serif').attr('font-size', 11)
      .attr('fill', T.marginal).attr('font-weight', 600).text('break-even');
  }

  // break-even frontier — straight line through approx zero cells
  if (stepIdx >= 3) {
    // zero-NPV contour: iterate rates, find where NPV crosses zero across utils
    const frontier = [];
    d.rates.forEach((r, ri) => {
      const row = d.grid[ri];
      for (let ci = 0; ci < row.length - 1; ci++) {
        if ((row[ci] < 0 && row[ci + 1] >= 0) || (row[ci] >= 0 && row[ci + 1] < 0)) {
          const t = Math.abs(row[ci]) / (Math.abs(row[ci]) + Math.abs(row[ci + 1]));
          const xA = x(d.utils[ci] + '%') + x.bandwidth() / 2;
          const xB = x(d.utils[ci + 1] + '%') + x.bandwidth() / 2;
          frontier.push({ x: xA + (xB - xA) * t, y: y('$' + r.toFixed(2)) + y.bandwidth() / 2 });
        }
      }
    });
    if (frontier.length > 1) {
      const ln = d3.line().x(p => p.x).y(p => p.y).curve(d3.curveMonotoneY);
      g.append('path').attr('class', 'hm-breakeven').attr('d', ln(frontier));
    }
  }

  // markers
  if (stepIdx >= 4) {
    const m = d.marketMarker;
    g.append('circle').attr('class', 'hm-market-marker')
      .attr('cx', x(m.util + '%') + x.bandwidth() / 2)
      .attr('cy', y('$' + m.rate.toFixed(2)) + y.bandwidth() / 2)
      .attr('r', 10);
    g.append('text').attr('x', x(m.util + '%') + x.bandwidth() / 2)
      .attr('y', y('$' + m.rate.toFixed(2)) + y.bandwidth() / 2 - 14)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Inter, sans-serif').attr('font-size', 10).attr('font-weight', 600)
      .attr('fill', T.ink).text('MARKET TODAY');

    const th = d.thesisMarker;
    g.append('circle').attr('class', 'hm-thesis-marker')
      .attr('cx', x(th.util + '%') + x.bandwidth() / 2)
      .attr('cy', y('$' + th.rate.toFixed(2)) + y.bandwidth() / 2)
      .attr('r', 10);
    g.append('text').attr('x', x(th.util + '%') + x.bandwidth() / 2)
      .attr('y', y('$' + th.rate.toFixed(2)) + y.bandwidth() / 2 - 14)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Inter, sans-serif').attr('font-size', 10).attr('font-weight', 600)
      .attr('fill', T.marginal).text('THESIS');

    // arrow market → thesis
    g.append('line')
      .attr('x1', x(m.util + '%') + x.bandwidth() / 2)
      .attr('y1', y('$' + m.rate.toFixed(2)) + y.bandwidth() / 2)
      .attr('x2', x(th.util + '%') + x.bandwidth() / 2)
      .attr('y2', y('$' + th.rate.toFixed(2)) + y.bandwidth() / 2)
      .attr('stroke', T.ink).attr('stroke-width', 1).attr('stroke-dasharray', '3 2')
      .attr('marker-end', 'url(#s10-arrow)');
    svg.append('defs').append('marker')
      .attr('id', 's10-arrow').attr('viewBox', '0 0 10 10').attr('refX', 8).attr('refY', 5)
      .attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto-start-reverse')
      .append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z').attr('fill', T.ink);
  }

  // legend — small bar
  const lg = svg.append('g').attr('transform', `translate(${M.l},${H - 18})`);
  lg.append('text').attr('font-family', 'Inter, sans-serif').attr('font-size', 10).attr('fill', T.ink60).text('−$50M NPV');
  const stops = 20;
  for (let i = 0; i < stops; i++) {
    const v = -50 + (100 * (i / (stops - 1)));
    lg.append('rect').attr('x', 80 + i * 7).attr('y', -8).attr('width', 7).attr('height', 10).attr('fill', color(v));
  }
  lg.append('text').attr('x', 80 + stops * 7 + 6).attr('y', 0).attr('font-family', 'Inter, sans-serif').attr('font-size', 10).attr('fill', T.ink60).text('+$50M NPV');
}

// =============================================================
// Scene 11 — afternoon fade (reuses intraday data full day)
// =============================================================
function renderScene11(progress = 1) {
  const el = document.getElementById('s11-chart');
  if (!el || !DATA['intraday-bird']) return;
  const allBars = DATA['intraday-bird'].intraday;
  const peakIdx = allBars.findIndex(b => b.t === '09:47');
  const afternoonBars = allBars.slice(peakIdx);
  const revealCount = peakIdx + 1 + Math.ceil((afternoonBars.length - 1) * Math.max(0, Math.min(1, progress)));
  const bars = allBars.slice(0, revealCount);

  const W = 960, H = 420, M = { t: 40, r: 80, b: 60, l: 50 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b;

  const x = d3.scaleBand().domain(allBars.map(b => b.t)).range([0, iw]).padding(0.22);
  const y = d3.scaleLinear().domain([0, 26]).range([ih, 0]).nice();

  const svg = d3.select(el).selectAll('svg').data([0]).join('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  svg.selectAll('*').remove();

  svg.append('text').attr('x', M.l).attr('y', 22)
    .attr('font-family', 'Source Serif 4, Georgia, serif').attr('font-size', 18).attr('font-style', 'italic').attr('fill', T.ink)
    .text('From $24.31 to $14.50 — the afternoon fade');

  const g = svg.append('g').attr('transform', `translate(${M.l},${M.t})`);

  y.ticks(6).forEach(v => {
    g.append('line').attr('x1', 0).attr('x2', iw).attr('y1', y(v)).attr('y2', y(v))
      .attr('stroke', T.ink40).attr('stroke-opacity', 0.2);
    g.append('text').attr('x', -8).attr('y', y(v) + 4).attr('text-anchor', 'end')
      .attr('font-family', 'JetBrains Mono, monospace').attr('font-size', 11).attr('fill', T.ink60)
      .text('$' + v.toFixed(0));
  });
  allBars.forEach((b, i) => {
    if (i % 3 === 0 || b.t === '09:47' || b.t === '16:00' || b.t === '11:30') {
      g.append('text').attr('x', x(b.t) + x.bandwidth() / 2).attr('y', ih + 18).attr('text-anchor', 'middle')
        .attr('font-family', 'JetBrains Mono, monospace').attr('font-size', 11).attr('fill', T.ink60).text(b.t);
    }
  });

  bars.forEach(b => {
    const cx = x(b.t) + x.bandwidth() / 2;
    const up = b.c >= b.o;
    g.append('line').attr('x1', cx).attr('x2', cx).attr('y1', y(b.h)).attr('y2', y(b.l))
      .attr('stroke', T.ink).attr('stroke-width', 1);
    const bodyY = y(Math.max(b.o, b.c));
    const bodyH = Math.max(2, Math.abs(y(b.o) - y(b.c)));
    g.append('rect').attr('x', x(b.t)).attr('y', bodyY).attr('width', x.bandwidth()).attr('height', bodyH)
      .attr('fill', up ? T.bull : T.bear);
  });

  // peak and close annotations
  g.append('circle').attr('cx', x('09:47') + x.bandwidth() / 2).attr('cy', y(24.31)).attr('r', 3).attr('fill', T.bear);
  g.append('text').attr('x', x('09:47') + x.bandwidth() / 2).attr('y', y(24.31) - 8)
    .attr('text-anchor', 'middle').attr('class', 'close-label').attr('font-size', 18).attr('fill', T.bear)
    .text('peak $24.31');
  if (bars[bars.length - 1].t === '16:00') {
    g.append('circle').attr('cx', x('16:00') + x.bandwidth() / 2).attr('cy', y(14.50)).attr('r', 3).attr('fill', T.ink);
    g.append('text').attr('x', x('16:00') + x.bandwidth() / 2 + 10).attr('y', y(14.50) + 6)
      .attr('class', 'close-label').text('close $14.50');
  }

  setTicker(bars[bars.length - 1].c);
}

// =============================================================
// Scene 12 — May 18 branching timeline
// =============================================================
function renderScene12(stepIdx = 0) {
  const el = document.getElementById('s12-stage');
  if (!el || !DATA['may18']) return;
  const d = DATA['may18'];
  const W = 900, H = 460, M = { t: 50, r: 40, b: 70, l: 50 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b;

  const svg = d3.select(el).selectAll('svg').data([0]).join('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  svg.selectAll('*').remove();

  svg.append('text').attr('x', M.l).attr('y', 26)
    .attr('font-family', 'Source Serif 4, Georgia, serif').attr('font-size', 20).attr('font-style', 'italic').attr('fill', '#F2F2F2')
    .text('Thirty-three days until the proxy lands.');

  const g = svg.append('g').attr('transform', `translate(${M.l},${M.t})`);
  const events = d.events;
  const voteIdx = events.length - 1;
  const xScale = d3.scalePoint().domain(events.map((_, i) => i)).range([0, iw * 0.6]).padding(0.25);

  const mainY = ih / 2;
  // main axis
  g.append('line').attr('class', 'tl-axis').attr('x1', 0).attr('y1', mainY).attr('x2', iw * 0.6).attr('y2', mainY)
    .attr('stroke-width', 1);
  events.forEach((e, i) => {
    g.append('circle').attr('class', 'tl-event-dot').attr('cx', xScale(i)).attr('cy', mainY)
      .attr('r', i === voteIdx ? 6 : 4)
      .attr('fill', i === voteIdx ? T.marginal : '#9EC7C6');
    g.append('text').attr('class', 'tl-text')
      .attr('x', xScale(i)).attr('y', mainY + (i % 2 === 0 ? 24 : -14))
      .attr('text-anchor', 'middle').text(e.date.slice(5));
    g.append('text').attr('class', 'tl-event-label')
      .attr('x', xScale(i)).attr('y', mainY + (i % 2 === 0 ? 40 : -30))
      .attr('text-anchor', 'middle')
      .text(e.label.split(' — ')[1] || e.label);
  });

  // vote rule
  g.append('line').attr('class', 'tl-vote-rule')
    .attr('x1', xScale(voteIdx)).attr('y1', mainY - 70)
    .attr('x2', xScale(voteIdx)).attr('y2', mainY + 70).attr('stroke-width', 1);
  g.append('text').attr('x', xScale(voteIdx)).attr('y', mainY - 82).attr('text-anchor', 'middle')
    .attr('font-family', 'Inter, sans-serif').attr('font-size', 11).attr('fill', T.marginal)
    .attr('letter-spacing', '0.16em').text('STOCKHOLDER VOTE');

  // branches — drawn progressively starting step 3 (index bear) and 4 (both)
  const bx1 = xScale(voteIdx);
  const bx2 = iw;
  const bullY = mainY - 80;
  const bearY = mainY + 80;
  const bullPath = `M ${bx1} ${mainY} C ${bx1 + 60} ${mainY} ${bx1 + 60} ${bullY} ${bx2} ${bullY}`;
  const bearPath = `M ${bx1} ${mainY} C ${bx1 + 60} ${mainY} ${bx1 + 60} ${bearY} ${bx2} ${bearY}`;

  if (stepIdx >= 3) {
    g.append('path').attr('class', 'branch-bull').attr('d', bullPath);
    g.append('path').attr('class', 'branch-bear').attr('d', bearPath);

    g.append('text').attr('class', 'branch-label-bull')
      .attr('x', bx2 + 4).attr('y', bullY + 4).attr('text-anchor', 'end')
      .text('$38 – $125');
    g.append('text').attr('class', 'branch-label-bear')
      .attr('x', bx2 + 4).attr('y', bearY + 4).attr('text-anchor', 'end')
      .text('$1.50 / reverse split');
    g.append('text')
      .attr('x', bx2 + 4).attr('y', bullY + 22).attr('text-anchor', 'end')
      .attr('font-family', 'Inter, sans-serif').attr('font-size', 11)
      .attr('fill', 'rgba(255,255,255,0.6)').text('Benign fixed-conversion terms');
    g.append('text')
      .attr('x', bx2 + 4).attr('y', bearY + 22).attr('text-anchor', 'end')
      .attr('font-family', 'Inter, sans-serif').attr('font-size', 11)
      .attr('fill', 'rgba(255,255,255,0.6)').text('Toxic floating + lookback');
  }

  // today dot on far left
  g.append('text').attr('x', xScale(0)).attr('y', mainY + 58).attr('text-anchor', 'middle')
    .attr('font-family', 'Source Serif 4, Georgia, serif').attr('font-style', 'italic').attr('font-size', 18)
    .attr('fill', '#F2F2F2').text('$14.50 today');
}

// =============================================================
// Scene 13 — dilution simulator (SIGNATURE)
// =============================================================
const S13 = {
  priceMin: 1.50,
  priceMax: 14.50,
  existingShares: 8.17e6,
  facility: 50e6,
  discount: 0.80,
  stepPrices: [14.50, 11.60, 5.00, 1.50]
};

let s13Price = 14.50;

function computeDilution(price) {
  const conv = price * S13.discount;
  const newShares = S13.facility / conv;
  const total = S13.existingShares + newShares;
  return {
    conv,
    newShares,
    total,
    existingPct: (S13.existingShares / total) * 100,
    newPct: (newShares / total) * 100,
    dilutionPct: (newShares / S13.existingShares) * 100
  };
}

function renderScene13(price = s13Price) {
  s13Price = Math.max(S13.priceMin, Math.min(S13.priceMax, price));
  const m = computeDilution(s13Price);

  // reactive background
  const stickyWrap = document.querySelector('#scene-13 .sticky-wrap');
  if (stickyWrap) {
    const t = Math.max(0, Math.min(1, (S13.priceMax - s13Price) / (S13.priceMax - S13.priceMin)));
    const bg = d3.interpolateLab(T.paperWarm, T.crimsonWash)(t);
    stickyWrap.style.backgroundColor = bg;
  }

  // slider svg
  const sliderEl = document.getElementById('s13-slider');
  if (sliderEl) {
    const W = 600, H = 84;
    const pad = 30;
    const x = d3.scaleLinear().domain([S13.priceMin, S13.priceMax]).range([pad, W - pad]).clamp(true);
    const svg = d3.select(sliderEl);
    svg.selectAll('*').remove();
    svg.append('line').attr('class', 'slider-track')
      .attr('x1', pad).attr('x2', W - pad).attr('y1', H / 2 + 6).attr('y2', H / 2 + 6);
    S13.stepPrices.forEach(p => {
      svg.append('line').attr('class', 'slider-tick')
        .attr('x1', x(p)).attr('x2', x(p)).attr('y1', H / 2 - 6).attr('y2', H / 2 + 18);
      svg.append('text').attr('class', 'slider-label')
        .attr('x', x(p)).attr('y', H / 2 + 34).attr('text-anchor', 'middle')
        .text('$' + p.toFixed(2));
    });
    const hx = x(s13Price);
    svg.append('circle').attr('class', 'slider-handle')
      .attr('cx', hx).attr('cy', H / 2 + 6).attr('r', 14);
    svg.append('text').attr('class', 'slider-handle-price')
      .attr('x', hx).attr('y', H / 2 - 10)
      .text('$' + s13Price.toFixed(2));
    sliderEl.setAttribute('aria-valuenow', s13Price.toFixed(2));
  }

  // pie svg
  const pieEl = document.getElementById('s13-pie');
  if (pieEl) {
    const W = 420, H = 240;
    const cx = H / 2 + 20, cy = H / 2, R = 100;
    const svg = d3.select(pieEl);
    svg.selectAll('*').remove();
    const arc = d3.arc().innerRadius(0).outerRadius(R).cornerRadius(0);
    const slices = d3.pie().sort(null).value(d => d.v)([
      { k: 'existing', v: m.existingPct },
      { k: 'new', v: m.newPct }
    ]);
    const g = svg.append('g').attr('transform', `translate(${cx},${cy})`);
    slices.forEach((s, i) => {
      g.append('path').attr('d', arc(s))
        .attr('fill', s.data.k === 'existing' ? T.accent : T.bear);
    });
    // center label (smaller middle)
    g.append('circle').attr('r', 42).attr('fill', '#FFF');
    g.append('text').attr('text-anchor', 'middle').attr('y', -2)
      .attr('font-family', 'Source Serif 4, Georgia, serif').attr('font-style', 'italic').attr('font-size', 22)
      .attr('fill', T.ink).text(m.dilutionPct.toFixed(0) + '%');
    g.append('text').attr('text-anchor', 'middle').attr('y', 18)
      .attr('font-family', 'Inter, sans-serif').attr('font-size', 10).attr('fill', T.ink60)
      .attr('letter-spacing', '0.14em').text('DILUTION');

    // legend to the right
    const lg = svg.append('g').attr('transform', `translate(${cx + R + 30},${cy - 40})`);
    lg.append('rect').attr('width', 12).attr('height', 12).attr('fill', T.accent);
    lg.append('text').attr('x', 18).attr('y', 10).attr('font-family', 'Inter, sans-serif').attr('font-size', 12).attr('fill', T.ink)
      .text('Existing holders ' + m.existingPct.toFixed(1) + '%');
    lg.append('rect').attr('y', 24).attr('width', 12).attr('height', 12).attr('fill', T.bear);
    lg.append('text').attr('x', 18).attr('y', 34).attr('font-family', 'Inter, sans-serif').attr('font-size', 12).attr('fill', T.ink)
      .text('Convertible holders ' + m.newPct.toFixed(1) + '%');
  }

  // odometers
  document.getElementById('s13-odo-convprice').textContent = '$' + m.conv.toFixed(2);
  document.getElementById('s13-odo-newshares').textContent =
    m.newShares >= 1e6 ? (m.newShares / 1e6).toFixed(1) + 'M' : (m.newShares / 1e3).toFixed(0) + 'K';
  document.getElementById('s13-odo-existing').textContent = m.existingPct.toFixed(1) + '%';
  document.getElementById('s13-odo-dilution').textContent = m.dilutionPct.toFixed(0) + '%';
}

function wireScene13Drag() {
  const sliderEl = document.getElementById('s13-slider');
  if (!sliderEl) return;
  const W = 600;
  const pad = 30;
  const x = d3.scaleLinear().domain([S13.priceMin, S13.priceMax]).range([pad, W - pad]).clamp(true);
  const sceneEl = document.getElementById('scene-13');

  function xFromEvent(e) {
    const pt = sliderEl.createSVGPoint();
    const src = e.touches ? e.touches[0] : e;
    pt.x = src.clientX; pt.y = src.clientY;
    const ctm = sliderEl.getScreenCTM();
    if (!ctm) return null;
    const inv = pt.matrixTransform(ctm.inverse());
    return inv.x;
  }
  let dragging = false;
  function onStart(e) {
    dragging = true;
    sceneEl.classList.add('drag-ready');
    if (e.preventDefault) e.preventDefault();
    onMove(e);
  }
  function onMove(e) {
    if (!dragging) return;
    const xv = xFromEvent(e);
    if (xv === null) return;
    renderScene13(x.invert(xv));
  }
  function onEnd() { dragging = false; }

  sliderEl.addEventListener('mousedown', onStart);
  sliderEl.addEventListener('touchstart', onStart, { passive: false });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);

  sliderEl.addEventListener('keydown', (e) => {
    const step = e.shiftKey ? 1 : 0.10;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault(); renderScene13(s13Price - step);
      sceneEl.classList.add('drag-ready');
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault(); renderScene13(s13Price + step);
      sceneEl.classList.add('drag-ready');
    } else if (e.key === 'Home') {
      e.preventDefault(); renderScene13(S13.priceMin);
    } else if (e.key === 'End') {
      e.preventDefault(); renderScene13(S13.priceMax);
    }
  });
}

// =============================================================
// Scene 15 — bull countdown
// =============================================================
function renderScene15(day = 1) {
  // linear fade from $420M (day 1) → $90M (day 90)
  const price = Math.max(3, 14 - ((day - 1) / 89) * 11); // approx fade to $3
  const raise = Math.max(90, 420 - ((day - 1) / 89) * 330);
  const el = document.getElementById('s15-raise');
  const dayEl = document.getElementById('s15-day');
  const bar = document.getElementById('s15-bar');
  if (el) el.textContent = '$' + Math.round(raise) + 'M';
  if (dayEl) dayEl.textContent = `Day ${day} of 90 · price at $${price.toFixed(0)}`;
  if (bar) bar.style.width = ((raise / 420) * 100).toFixed(1) + '%';
}
function wireScene15() {
  const slider = document.getElementById('s15-scrubber');
  if (!slider) return;
  slider.addEventListener('input', (e) => renderScene15(Number(e.target.value)));
}

// =============================================================
// Scene 16 — verdict ladder
// =============================================================
function renderScene16(stepIdx = 5) {
  const el = document.getElementById('s16-stage');
  if (!el || !DATA.agents) return;
  const agents = DATA.agents.agents.slice().sort((a, b) => a.target - b.target);
  const current = DATA.agents.currentPrice;
  const W = 960, H = 420, M = { t: 70, r: 40, b: 100, l: 40 };
  const iw = W - M.l - M.r, ih = H - M.t - M.b;

  const x = d3.scaleLog().domain([2, 150]).range([0, iw]);

  const svg = d3.select(el).selectAll('svg').data([0]).join('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');
  svg.selectAll('*').remove();

  svg.append('text').attr('x', M.l).attr('y', 30)
    .attr('font-family', 'Source Serif 4, Georgia, serif').attr('font-style', 'italic').attr('font-size', 26).attr('fill', T.ink)
    .text('Ten analysts · one company · ten prices');
  svg.append('text').attr('x', M.l).attr('y', 52)
    .attr('font-family', 'Inter, sans-serif').attr('font-size', 12).attr('fill', T.ink60)
    .text('12-month price target by agent framework (log scale). The market today is $14.50.');

  const g = svg.append('g').attr('transform', `translate(${M.l},${M.t})`);

  // x axis
  const axis = g.append('g').attr('class', 'x-axis').attr('transform', `translate(0,${ih})`);
  const ticks = [2.5, 5, 10, 14.5, 25, 50, 100, 125];
  axis.append('line').attr('x1', 0).attr('x2', iw).attr('y1', 0).attr('y2', 0);
  ticks.forEach(t => {
    axis.append('line').attr('x1', x(t)).attr('x2', x(t)).attr('y1', 0).attr('y2', 6);
    axis.append('text').attr('x', x(t)).attr('y', 22).attr('text-anchor', 'middle').text('$' + t);
  });

  // current price dashed
  g.append('line').attr('class', 'current-line')
    .attr('x1', x(current)).attr('x2', x(current)).attr('y1', -40).attr('y2', ih + 8);
  g.append('text').attr('class', 'current-label')
    .attr('x', x(current)).attr('y', -46).attr('text-anchor', 'middle')
    .text('market $14.50');

  // Plot dots — force-style lane to avoid overlaps
  const yMid = ih / 2;
  const groups = d3.groups(agents, a => Math.round(x(a.target) / 20));
  agents.forEach(a => {
    const ax = x(a.target);
    // deterministic y jitter from original ordering
    const dy = (a.n % 5) * 12 - 24;
    const visible = (function() {
      if (stepIdx >= 5) return true;
      if (stepIdx >= 2 && a.stance === 'bear') return true;
      if (stepIdx >= 3 && a.stance === 'neutral') return true;
      if (stepIdx >= 4 && a.stance === 'bull') return true;
      return false;
    })();
    const opacity = visible ? 1 : 0;
    g.append('circle').attr('class', 'agent-dot ' + a.stance)
      .attr('cx', ax).attr('cy', yMid + dy).attr('r', 9)
      .attr('opacity', opacity);
    if (visible) {
      const labelX = ax;
      const labelY = yMid + dy + (dy < 0 ? -14 : 20);
      g.append('text').attr('class', 'agent-label')
        .attr('x', labelX).attr('y', labelY).attr('text-anchor', 'middle')
        .text('$' + a.target.toFixed(2));
    }
  });

  // Stance bands annotation
  if (stepIdx >= 5) {
    g.append('text').attr('x', x(3.30)).attr('y', ih + 56).attr('text-anchor', 'middle')
      .attr('font-family', 'Inter, sans-serif').attr('font-size', 11).attr('font-weight', 600).attr('fill', T.bear)
      .attr('letter-spacing', '0.14em').text('5 OF 10 · BEAR CLUSTER');
    g.append('text').attr('x', x(12.78)).attr('y', ih + 56).attr('text-anchor', 'middle')
      .attr('font-family', 'Inter, sans-serif').attr('font-size', 11).attr('font-weight', 600).attr('fill', T.grey)
      .attr('letter-spacing', '0.14em').text('1 · HOLD');
    g.append('text').attr('x', x(65)).attr('y', ih + 56).attr('text-anchor', 'middle')
      .attr('font-family', 'Inter, sans-serif').attr('font-size', 11).attr('font-weight', 600).attr('fill', T.bull)
      .attr('letter-spacing', '0.14em').text('4 · BULL CLUSTER');
  }
}

function renderScene17Docs() {
  const ul = document.getElementById('agentDocs');
  if (!ul || !DATA.agents) return;
  ul.innerHTML = '';
  const files = [
    '00-synthesis.md', '01-company-analyst-bull.md', '02-company-analyst-bear.md',
    '03-special-situations-high-growth.md', '04-special-situations-distressed.md',
    '05-capital-allocation-aggressive.md', '06-capital-allocation-conservative.md',
    '07-acquisition-allbirds-as-acquirer.md', '08-acquisition-allbirds-as-target.md',
    '09-ipo-strategist-bull-rerating.md', '10-ipo-strategist-bear-rerating.md'
  ];
  const agents = DATA.agents.agents;
  files.forEach((f, i) => {
    const li = document.createElement('li');
    const label = i === 0 ? 'Synthesis — 10-agent valuation map' :
                  (agents[i - 1]?.name || f) + ' · target $' + (agents[i - 1]?.target.toFixed(2) ?? '—');
    li.innerHTML = `${label} &nbsp; <a href="https://github.com/lyndonkl/allbirdsanalysis/blob/main/reports/v2/${f}">${f}</a>`;
    ul.appendChild(li);
  });
}

// =========================================================================
// Scrollama orchestration
// =========================================================================
function initScrolling() {
  // One scroller for outer scene transitions (background + ticker updates)
  const outer = scrollama();
  outer.setup({ step: '[data-scene]', offset: 0.5 })
    .onStepEnter(({ element }) => {
      updateBodyBg(element);
      const sid = element.getAttribute('data-scene');
      // set ticker to scene-appropriate price if not progressively driven elsewhere
      if (sid === '1') setTicker(2.49, { dark: true });
      else if (sid === '2') setTicker(2.49, { dark: false });
      else if (sid === '4') setTicker(18.70);
      else if (sid === '5') setTicker(16.20);
      else if (sid === '6') setTicker(15.80);
      else if (sid === '7') setTicker(15.50);
      else if (sid === '9') setTicker(15.20);
      else if (sid === '10') setTicker(15.00);
      else if (sid === '12') setTicker(14.50, { dark: true });
      else if (sid === '13') setTicker(14.50, { dark: false });
      else if (sid === '15') setTicker(14.50);
      else if (sid === '16') setTicker(14.50);
      else if (sid === '17') setTicker(14.50);
    });

  // Scene-specific inner scrollers (steps)
  const inner = scrollama();
  inner.setup({ step: '[data-scene] .step', offset: 0.6, progress: true })
    .onStepEnter(({ element }) => {
      element.classList.add('is-active');
      const sceneEl = element.closest('[data-scene]');
      const sid = sceneEl.getAttribute('data-scene');
      const stepIdx = Number(element.getAttribute('data-step')) - 1;
      handleStep(sid, stepIdx, 0);
    })
    .onStepExit(({ element, direction }) => {
      if (direction === 'down') element.classList.remove('is-active');
    })
    .onStepProgress(({ element, progress }) => {
      const sceneEl = element.closest('[data-scene]');
      const sid = sceneEl.getAttribute('data-scene');
      const stepIdx = Number(element.getAttribute('data-step')) - 1;
      handleStepProgress(sid, stepIdx, progress);
    });

  window.addEventListener('resize', () => { outer.resize(); inner.resize(); });
}

function handleStep(sceneId, stepIdx, progress) {
  switch (sceneId) {
    case '3':
      // ticker picks up intraday price
      const bars = DATA['intraday-bird'].intraday;
      const targets = [2.49, 3.15, 24.31, 24.31];
      setTicker(targets[Math.min(stepIdx, targets.length - 1)]);
      renderScene3(0.25 + 0.25 * stepIdx);
      break;
    case '5':
      renderScene5(stepIdx);
      break;
    case '6':
      renderScene6();
      break;
    case '7':
      lightScene7Panel(stepIdx + 1);
      break;
    case '8':
      renderScene8(stepIdx);
      break;
    case '9':
      renderScene9(stepIdx);
      break;
    case '10':
      renderScene10(stepIdx + 1);
      break;
    case '11':
      renderScene11((stepIdx + 1) / 3);
      setTicker([24.31, 17.00, 14.50][Math.min(stepIdx, 2)]);
      break;
    case '12':
      renderScene12(stepIdx + 1);
      break;
    case '13':
      if (stepIdx < 3) {
        renderScene13(S13.stepPrices[stepIdx]);
      } else {
        document.getElementById('scene-13').classList.add('drag-ready');
      }
      break;
    case '16':
      renderScene16(stepIdx + 1);
      break;
  }
}

function handleStepProgress(sceneId, stepIdx, progress) {
  if (sceneId === '13' && stepIdx < 3) {
    const from = S13.stepPrices[stepIdx];
    const to = S13.stepPrices[stepIdx + 1];
    if (from == null || to == null) return;
    const eased = d3.easeCubicInOut(progress);
    renderScene13(from + (to - from) * eased);
  }
  if (sceneId === '3') {
    renderScene3(0.2 + 0.8 * ((stepIdx + progress) / 3));
  }
  if (sceneId === '11') {
    renderScene11((stepIdx + progress) / 3);
  }
}

// =========================================================================
// Bootstrap
// =========================================================================
async function bootstrap() {
  await loadAllData();

  renderScene1();
  // Pre-render baseline for sticky scenes so they are visible on entry
  renderScene3(0.2);
  renderScene5(0);
  buildScene7();
  lightScene7Panel(0);
  renderScene8(0);
  renderScene9(0);
  renderScene10(0);
  renderScene11(0);
  renderScene12(0);
  renderScene13(14.50);
  renderScene15(1);
  renderScene16(0);
  renderScene17Docs();

  wireScene13Drag();
  wireScene15();

  // Default initial body bg
  const first = document.querySelector('[data-scene]');
  if (first) updateBodyBg(first);

  // Re-render on resize for responsive sizing
  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => {
      renderScene5(0);
    }, 150);
  });

  initScrolling();
}

document.addEventListener('DOMContentLoaded', bootstrap);
