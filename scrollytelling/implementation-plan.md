# The Last Trade of Allbirds
## Scrollytelling Implementation Plan

A production-ready specification for a scroll-driven, interactive data journalism piece on the April 15, 2026 Allbirds → NewBird AI pivot. Intended to be handed to an engineering agent for build-out.

---

## 0. Executive Summary

**What we are building:** A ~12-minute scroll-driven investigation of a single trading day. Reader opens at 9:29 AM with a $2.50 shoe stock. Reader closes with the $14.50 verdict ladder on May 18, 2026. In between, 16 scenes walk a single argument: the company that used to make wool sneakers either becomes the next CoreWeave or the next Long Blockchain, and the answer hinges on a piece of paper that has not been filed yet.

**Why scrollytelling:** The argument is contingent. A static chart collapses the contingency; a guided narrative preserves it. The reader needs to feel the capital adequacy gap (Scene 9 scale zoom), drive the dilution math themselves (Scene 13 slider), and sit with the ten-verdict ladder at the end (Scene 16).

**Tech stack:** Svelte + D3 (tree-shaken) + scrollama.js, static build, hosted on Vercel or GitHub Pages. Target: ≤80KB gzipped JS, ≤1.5s FCP on 4G, Lighthouse ≥90 performance / 100 accessibility.

**Visual system:** Shared with the companion Substack piece — warm paper background `#FBFAF7`, deep teal brand accent `#0E7C7B`, bear crimson `#B23A48`, bull green `#3A8E5C`, amber decision nodes `#D9A441`. Editorial serif display, monospace for numbers with tabular lining figures.

**Signature moves:** Three scenes get disproportionate craft budget — Scene 9's scale zoom (the capital gap), Scene 13's dilution tower (the share-count horror), Scene 16's verdict ladder (the closing screenshot). Two scenes get interactive handoff — the user drags, not just scrolls.

**Expected production time:** 4-6 engineering weeks for a two-person team (Svelte+D3 engineer + designer), given this spec.

---

## 1. Design Philosophy

Ten ground rules. Every scene must satisfy all ten or it doesn't ship.

1. **Every animation earns its computational cost.** A scene without a revelation does not get motion. Decorative parallax is banned.
2. **The scroll is the narrator's voice.** One scroll-tick = one breath. Scenes end on beats where a human reader would pause.
3. **One idea per scene.** No scene teaches two things. Related ideas become two scenes with a shared sticky frame.
4. **Cognitive-load ceiling: 7±2 distinct elements** (Miller, 1956). Distinct = independently varying. A 10-agent dispersion counts as one element (the dispersion), not ten.
5. **Respect `prefers-reduced-motion`.** Every scrubbed animation has a discrete-state fallback where the end-state is shown immediately with a single fade.
6. **Mobile-first.** If the scene works only on desktop, it doesn't ship. Desktop gets enhancements (two-column layouts, hover affordances, keyboard nav) not fundamentals.
7. **Numbers are characters.** $14.50, 582%, $3.50/hour, May 18 — each gets its own beat. Large numerical reveals are display type (≥80px on desktop, ≥48px on mobile), not body text.
8. **Cognitive encoding hierarchy** (Cleveland & McGill): position > length > angle > area > color. If we can encode in position, we don't use color. Color is reserved for grouping and valence.
9. **Honesty over drama.** No truncated axes for effect. The 582% spike is dramatic enough on a zero-baseline. If a visual needs distortion to land, the visual is wrong.
10. **The reader can always escape forward.** Progress chrome, chapter anchors, "skip scene" on mobile, no scroll-jacking. We guide; we do not imprison.

**Scientific grounding:** Mayer's signaling principle (highlight what matters), segmenting principle (one idea per scene), coherence principle (remove the extraneous). Ware's "eyes over memory" (show state; don't require recall across scenes). Tufte's data-ink maximization.

**Tonal register:** Bloomberg Graphics editorial voice (authoritative, numerate, dry) + The Pudding's craft (one pinned graphic per chapter, craft-level transitions) + NYT restraint (never use three moves when two suffice).

---

## 2. The Story

### Chosen narrative architecture

**Timeline Zoom as spine, Detective as inner mechanism, Scale Ladder as mid-piece detonation, Parallel Tracks as closing scene.**

The piece is structured as a single trading day — April 15, 2026, opening bell to after-hours — but each "minute" of that day opens a forensic investigation into a specific question. The scale ratios (Scene 9) appear at the emotional climax. Bull and bear voices converge into a final two-column verdict at the end.

### Commander's intent (12 words)

**Watch one company become a different company in a single trading day.**

The reader should leave understanding that this story is not about Allbirds, and not about AI — it is about the *machinery* by which a public market lets a company change identities overnight, and what that machinery costs.

### Emotional arc

| Scene | Reader Feeling |
|-------|---------------|
| 1 | Mild boredom, settling in |
| 2 | Curiosity — "what is this?" |
| 3 | Awe — visceral surprise |
| 4 | Engagement — the reader becomes a participant |
| 5 | Sympathy for what was lost |
| 6 | Suspicion — first whiff of something off |
| 7 | Recognition — "oh." |
| 8 | Disquiet — the empty boxes |
| 9 | **Vertigo** — the piece's emotional peak |
| 10 | Cold fascination — math as weapon |
| 11 | Hangover — the high recedes |
| 12 | Anticipation — the unresolved question |
| 13 | **Mathematical horror** — the dilution tower |
| 14 | Dread, but earned dread — pattern certainty |
| 15 | Conflicted respect — the steelman lands |
| 16 | Resolved uncertainty — sit with the ten prices |

Two peaks (Scene 9 vertigo, Scene 13 horror) separated by an analytical valley. Closing emotion is *uncertainty held with both hands* — the only honest closing this story permits.

### Opening and closing beats

**First paragraph (Scene 1):**

> The last morning Allbirds was a shoe company, the stock opened at two dollars and forty-nine cents. Eight million shares. Twenty-million-dollar market cap. The auditors had filed a going-concern note three weeks earlier — accountant's English for "we don't think this company can pay its bills." Nobody on a trading desk in Manhattan was watching. They had no reason to. Eighteen minutes after the bell, every one of them was.

**Closing paragraph (Scene 16):**

> Ten analysts looked at NewBird AI on April fifteenth. Same Bloomberg terminal, same filings, same eighteen-minute spike. They produced ten different prices, from two-fifty to one hundred twenty-five. They cannot all be right. They are also not, in any easy way, all wrong. The market today says fourteen dollars and fifty cents, which means the market today says: roughly one chance in six. Whether that is optimism or innumeracy, you find out on May eighteenth — when the proxy lands, when the conversion terms become public, and when the company that used to make wool sneakers either becomes the next CoreWeave or the next Long Blockchain. Pick a number. The market is taking bets.

---

## 3. Scene-by-Scene Implementation Plan

Each scene includes: narrative beat, key data, copy sample, visualization type, scroll mechanic, animation sequence, text overlay, transition, cognitive-load budget, accessibility fallback.

A persistent **BIRD ticker readout** lives in the top-right corner of the viewport across all 16 scenes. Starts at $2.49 (Scene 1), hits $24.31 (Scene 3 peak), closes at $14.50 (Scene 11), holds at $14.50 from Scene 12 onward. The ticker is the piece's heartbeat.

---

### SCENE 1 — "9:29 AM"
**Working title:** *The last shoe stock*

**Beat:** Establish the pre-spike normal — a $2.50 shoe company nobody is thinking about.

**Key data:** Stock $2.49. Market cap $20.6M. 8.17M shares outstanding. FY2025 revenue $152.5M (down 19.7%). Going-concern warning in the 10-K.

**Copy sample:**
> The last morning Allbirds was a shoe company, the stock opened at two dollars and forty-nine cents. Eight million shares. Twenty-million-dollar market cap. The auditors had filed a going-concern note three weeks earlier — accountant's English for "we don't think this company can pay its bills." Nobody on a trading desk in Manhattan was watching. They had no reason to.

**Visualization:** Calm, ambient line chart of BIRD over the prior 12 months — flat, slowly drifting down. A small ticker readout pinned top-right corner: **$2.49**.

**Scroll mechanic:** Reveal-on-scroll. Chart fades in first; going-concern paragraph appears as the line touches its 52-week low.

**Animation sequence:**
- 0%: Black viewport. White text fade-in: "April 15, 2026. 9:30 AM ET."
- 25%: Candle body draws bottom-up (400ms, `easeOutCubic`), stops at close price.
- 50%: Upper shadow extends to $24.31 (600ms). Number `$24.31` fades in at shadow tip.
- 75%: Volume bar appears beneath the candle, widening to represent 35× turnover. Number `288,000,000 shares` types in.
- 100%: Caption hardens: "Allbirds, a sneaker company, had entered the AI trade."

**Background:** Near-black `#0B0B0E` — theatrical cold open.

**Text overlay:** Bottom-center, large serif. No side panel. Minimalist.

**Transition out:** Hard cut. Candle drops off. Background fades from `#0B0B0E` to paper `#F8F4EC`.

**Cognitive-load budget:** 4 elements (candle body, upper shadow, volume bar, caption).

**Accessibility fallback:** Reduced-motion shows the final composed state with a single 200ms fade. Screen reader alt: "On April 15, 2026, Allbirds stock opened at $2.50, spiked intraday to $24.31, and closed at $14.50, on trading volume 35 times its float."

---

### SCENE 2 — "9:30 AM — The Bell"
**Working title:** *Then the press release hit*

**Beat:** Open. Ordinary morning. A press release crosses the wire.

**Key data:** GlobeNewswire timestamp. Headline: *"Allbirds, Inc. Executes $50M Convertible Financing Facility Agreement, Announces Expansion into AI Compute Infrastructure."*

**Copy sample:**
> The press release came across GlobeNewswire at 9:30 AM Eastern. Sixty-three words in the headline. Two of them — "AI Compute" — were the only words that mattered. By the time the algorithms had parsed it, the stock was up forty percent. By the time a human read it, it was up two hundred.

**Visualization:** Split-screen metamorphosis. Left: shoe silhouette (Allbirds wool runner) in line art. Right: GPU die illustration (NVIDIA H100 die shot, stylized). Between: ticker `BIRD` stays constant while the nameplate transitions `Allbirds, Inc.` → `NewBird AI`. Side metrics: `FY2025 Revenue: $152.5M → $0`; `Business: Wool footwear → GPU compute`; `Market cap: $21M → $148M`.

**Scroll mechanic:** Sticky canvas; 2 text steps. CSS transform interpolation on scroll progress.

**Animation sequence:**
- 0%: Shoe at 100% opacity, GPU at 0%. Nameplate: `Allbirds, Inc.`
- 25%: Shoe begins dematerializing into particles (Voronoi shards, drift upward and fade).
- 50%: Nameplate crossfades. `BIRD` ticker remains (emphasis: the SHELL survives).
- 75%: GPU materializes from descending particles (same Voronoi shards regroup).
- 100%: Side metrics hard-fade in below (revenue, market cap, business).

**Background:** Paper `#F8F4EC`.

**Text overlay:** Side-pinned text column (desktop) / below the composition (mobile).

**Transition out:** Scale-through — GPU scales up, becomes the viewport, wipes into Scene 3's candle.

**Cognitive-load budget:** 5 elements.

**Accessibility:** Two static images side-by-side with animated arrow between. Alt describes the identity transition.

---

### SCENE 3 — "9:47 AM — +582%"
**Working title:** *Eighteen minutes*

**Beat:** Show the magnitude of the move. Make it visceral.

**Key data:** Intraday high $24.31. +582% from prior close. 288M shares traded vs. 8.17M float = 35× turnover. Pre-existing short interest 18.3%.

**Copy sample:**
> In eighteen minutes, BIRD did what most stocks never do in a decade. It went up 582 percent. Two hundred eighty-eight million shares changed hands against a float of eight million — every share in existence trading thirty-five times before lunch. The shorts (one in every five shares had been borrowed and sold) were being liquidated in real time.

**Visualization:** Animated candlestick chart for the morning, with volume bars below. Short-interest layer toggles on as a horizontal band.

**Scroll mechanic:** Horizontal scroll for the candlestick — the reader physically pushes time forward. Sticky canvas.

**Animation sequence:**
- 0%: Opening chart at $2.50, flat volume.
- 25%: Pre-market ticks visible; volume starts rising.
- 50%: Opening bell. First candle draws up to $3.20.
- 75%: Massive green candle to $15, then $20, then $24.31.
- 100%: Chart pauses at $24.31. Single line of text: *"This is the part where you have to ask what just happened."*

**Background:** Paper `#F8F4EC`.

**Text overlay:** Caption appears above chart as line extends.

**Transition out:** The chart pauses at peak. Scene 4 takes over with a full-bleed title card.

**Cognitive-load budget:** 5 elements (candlesticks, volume bars, short-interest band, price label, ticker).

**Accessibility:** Static chart with all annotations, plus reduced-motion end-state. Alt: "Intraday candlestick chart showing BIRD rising from $2.49 to an intraday peak of $24.31 in the first eighteen minutes of trading, on volume 35 times its float."

---

### SCENE 4 — "The Question"
**Working title:** *What did Allbirds just become?*

**Beat:** Stop the action. Frame the investigation. Set the reader up as the detective.

**Key data:** Three questions. (1) What did they sell? (2) Who paid for the pivot? (3) What is left of the company?

**Copy sample:**
> Stocks don't go up six hundred percent because people decided they liked shoes more. Something had been sold, something had been bought, and something had been promised. To understand what happened in those eighteen minutes you need to know three things: what Allbirds gave away, who handed them the money, and what kind of company they pretended to become. The press release answered none of those questions. The 10-K answered only one of them.

**Visualization:** Three large numbered questions appearing in sequence, each an anchor link to a later scene.

**Scroll mechanic:** Stepper / scroll-snap. Each question lands in the center, holds for a beat, then snaps to the next.

**Animation sequence:**
- 0-33%: Question 1 grows from small to full-size, holds, then shrinks as scroll continues.
- 33-66%: Question 2 same treatment.
- 66-100%: Question 3 same.

**Background:** Warmer cream `#F3EBDA` with subtle grain — archival/forensic.

**Text overlay:** Questions ARE the scene.

**Transition out:** "Question one. What did they sell?" fades → Scene 5.

**Cognitive-load budget:** 1 element at a time (each question isolated).

**Accessibility:** All three questions static, with skip-link to each downstream scene.

---

### SCENE 5 — "What They Sold"
**Working title:** *The last shoe goes for thirty-nine million*

**Beat:** The IPO-to-asset-sale collapse. Show how far things had fallen.

**Key data:** 2021 IPO at $4.1B valuation, $303M raised. March 30, 2026 sale to American Exchange Group for $39M. 99% destruction.

**Copy sample:**
> In November 2021 Allbirds went public at $15 a share. Wall Street valued it at four point one billion dollars. Fifty-two months later, on March thirtieth of this year, the company sold its entire shoe business — every store, every SKU, every spool of merino — to American Exchange Group for thirty-nine million dollars. That is one penny on the dollar. Whatever Allbirds was about to become, the shoe company was already gone.

**Visualization:** Shrinking-rectangle visual. $4.1B box collapses to a $39M box. Years tick by along the side.

**Scroll mechanic:** Reveal-on-scroll, with the box visibly shrinking as the years tick.

**Animation sequence:**
- 0%: Full $4.1B box dominates viewport. Label "Nov 2021 IPO".
- 25%: "2022" tick. Box shrinks to ~$2B.
- 50%: "2024" tick. Box at ~$200M.
- 75%: "Mar 2026" tick. Box at $39M.
- 100%: "99.05%" destruction number appears above. Beside the $39M box, a new larger box outline appears: "$50M convertible." Scene ends.

**Background:** Warmer cream `#F3EBDA`.

**Text overlay:** Year ticks as left-side timeline labels.

**Transition out:** $50M box carries forward into Scene 6.

**Cognitive-load budget:** 3 elements (box, timeline, destruction percentage).

**Accessibility:** Static before/after comparison with valuation table. Alt: "Allbirds' valuation fell from $4.1 billion at its 2021 IPO to $39 million at its 2026 asset sale — a 99% destruction of enterprise value over fifty-two months."

---

### SCENE 6 — "Who Paid"
**Working title:** *The undisclosed institutional investor*

**Beat:** The financing. Then the placement agent. Then the placement agent's history.

**Key data:** $50M convertible. "Undisclosed institutional investor." Placement agent: Chardan Capital Markets.

**Copy sample:**
> The press release used a phrase that lawyers love and reporters hate: "undisclosed institutional investor." Fifty million dollars from somebody whose name was withheld. The placement agent — the firm that made the introduction and structured the deal — was named, and the name was Chardan Capital Markets. The name didn't ring a bell for most readers. It rang several for anyone who follows the underside of the IPO market.

**Visualization:** A document mockup with a redacted name; then Chardan's logo appearing.

**Scroll mechanic:** Pin the document; Chardan's logo slides in from the side; Scene 7 is triggered as logo lands.

**Animation sequence:**
- 0%: Press release text visible. A black redaction bar hides the investor name.
- 33%: Reader scrolls. A magnifying-glass icon animates toward the redaction bar.
- 66%: Bar does NOT reveal a name. Instead, a label points at "Placement agent: Chardan Capital Markets."
- 100%: Chardan logo materializes. Caption: "Here's what Chardan has been doing lately."

**Background:** Warmer cream `#F3EBDA`.

**Text overlay:** Document is the scene; text sits in margin.

**Transition out:** Chardan logo scales up, becomes Scene 7's header.

**Cognitive-load budget:** 3 elements (document, redaction bar, Chardan name).

**Accessibility:** Static document image with text. Alt: "A press release excerpt showing that a $50 million convertible was placed by Chardan Capital Markets on behalf of an undisclosed institutional investor."

---

### SCENE 7 — "The Chardan File"
**Working title:** *The same playbook, six times*

**Beat:** Ghost witnesses, compressed. Pattern recognition.

**Key data:**
- Nikola SPAC → Trevor Milton fraud, 4-year sentence, Chapter 11
- Bit Origin $500M Dogecoin treasury → 1-for-60 reverse split in 6 months (98% destruction)
- Classover $500M into Solana
- Eyenovia $50M into HYPE tokens
- VivoPower $121M for XRP
- Lion Group $600M for Hyperliquid
- Chardan's 2018 SEC consent order: $1M penalty for failing to file SARs on 12.5B shares of penny-stock liquidations

**Copy sample:**
> In the eighteen months before NewBird, Chardan placed financings for six other distressed micro-caps that pivoted overnight into hot themes. Bit Origin raised five hundred million for a Dogecoin treasury in July 2025; six months later it executed a one-for-sixty reverse split that wiped out ninety-eight percent of common holders. Classover did Solana. Eyenovia did HYPE tokens. VivoPower did XRP. Lion Group did Hyperliquid. Nikola — going back further — went bankrupt and its founder went to prison.

**Visualization:** A 2×3 grid of mini-candlestick sparklines. Each panel shows one Chardan-placed deal's 12-month post-announcement price. Panels reveal sequentially. A 7th outline panel at grid bottom-right labeled "NewBird AI?" with only a question mark.

**Scroll mechanic:** Sticky grid; 6 steps activate one panel each. Step 7 introduces the empty NewBird panel.

**Animation sequence:**
- Panels start gray. On each step: one panel animates its sparkline in (1200ms, `easeCubicOut`), end-point dot pulses crimson, caption types in below ("Nikola → bankruptcy", "BTOG → -98% in 6 months", etc.).
- 100%: All 6 panels saturated. The 7th empty panel draws at grid bottom-right with "NewBird AI?" and a question mark.

**Background:** Warmer cream `#F3EBDA` with subtle grain.

**Text overlay:** Prose paragraph above grid; each panel carries its own caption.

**Transition out:** The 7th empty panel expands to fill the viewport → becomes Scene 8's LBCC overlay.

**Cognitive-load budget:** 7 elements at peak (6 panels + 1 question-mark panel). At Miller's ceiling — intentional.

**Accessibility:** Static list/table with deal name, date, outcome. Each row linked to source.

---

### SCENE 8 — "The Long Blockchain Ten"
**Working title:** *Ten of ten*

**Beat:** Surface the historical precedent. The 10-of-10 pattern match.

**Key data:** Long Blockchain (formerly Long Island Iced Tea) — December 2017 rebrand, +380% spike, NASDAQ delisted April 2018, SEC insider trading charges 2021. Axe Compute (Predictive Oncology rebrand, December 2025) — $0 compute revenue in fiscal 2025. The 10-criterion checklist.

**Copy sample:**
> A bear case is a story about pattern, not prophecy. There is a checklist that distinguishes a real corporate transformation from a financial-engineering exit. Distressed micro-cap. Sold core business. Overnight rebrand to a hot sector. Massive single-day spike. Zero capability in the new business. Stockholder dilution vehicle. NewBird AI checks all six. Long Blockchain Corp checked all six in December 2017 and was delisted four months later. Axe Compute checked all six in December 2025 and reported zero compute revenue in its first fiscal year. The bull case requires NewBird to be the first.

**Visualization:** Two overlaid normalized price lines (both indexed to 100 at announcement date). LBCC in graphite grey (faded); BIRD in teal `#0E7C7B`. X-axis shows days from announcement, -30 to +365.

**Scroll mechanic:** Sticky chart; 5 text steps annotate key moments on the LBCC line.

**Animation sequence:**
- 0%: Only the -30 to 0 window drawn, both lines tracking together.
- 20%: Announcement day — vertical dashed line. LBCC spikes +380%. BIRD spikes +582%. Both spike lines draw simultaneously.
- 40%: LBCC line extends to day +90. Annotation: "Short-seller attention. Name change challenged."
- 60%: LBCC extends to day +180. Annotation: "Reverse split attempted."
- 80%: LBCC extends to day +365. Annotation: "Nasdaq delisted. SEC investigation."
- 100%: BIRD line ends at day 0 with a pulsing dot. Caption: "BIRD is on day 1 of this chart."

**Background:** Warmer cream `#F3EBDA`.

**Text overlay:** Left-side stepper cards (desktop). Mobile: text sits above chart; each step pins its annotation to the line.

**Transition out:** The BIRD dot detaches from the line, becomes a single point of light, then the viewport zooms out into Scene 9's scale ladder.

**Cognitive-load budget:** 5 elements (2 lines, announcement marker, 1 active annotation, BIRD dot).

**Accessibility:** Two stacked line charts, LBCC on top with all annotations, BIRD on bottom. Alt: "Long Blockchain's post-announcement trajectory went from +380% peak to delisted at zero within 15 months. BIRD sits at day one of the equivalent chart."

---

### SCENE 9 — "Look Down" ⭐ *(SIGNATURE SCALE ZOOM)*
**Working title:** *Climb the ladder*

**Beat:** The vertigo scene. NewBird's $128M placed next to the actual capital intensity of the business it claims to enter.

**Key data:**
- NewBird total capital: $128M
- Lambda Labs raised: $2.3B (18×)
- Applied Digital invested: $7B (55×)
- CoreWeave 2025 capex: $14.9B (116×)
- CoreWeave 2026 capex plan: $30B
- Hyperscaler combined capex (AWS/Azure/GCP/Meta): $600B+ (4,688×)
- Minimum viable neocloud: $500M-$1B

**Copy sample:**
> Start at the bottom. NewBird AI has roughly one hundred twenty-eight million dollars. Lambda Labs has raised two point three billion. Applied Digital has spent seven billion. CoreWeave — the company NewBird's investors are implicitly comparing it to — will spend thirty billion this year alone. The four hyperscalers combined will spend over six hundred billion. NewBird's entire capital base, set against the table stakes of the business it has announced, is point zero zero four percent. That is not a competitive disadvantage. That is a category error.

**Visualization:** **SCALE ZOOM.** Reader scrolls and the camera pulls back. NewBird's $128M box stays the same size on the page; everything else gets larger. By end of scroll, the $128M box is one pixel inside a $600B field.

**Scroll mechanic:** Pin-and-zoom. The vertical scroll IS the zoom-out animation. Five scroll stops, one per comparable. Implemented as SVG viewBox interpolation (or canvas for performance — see Failure Mode 1 below).

**Animation sequence:**
- 0%: Single small teal circle centered, labeled `NewBird AI: $128M`. Camera at zoom=1.
- 20%: Camera pulls back 18×; Lambda circle appears as a larger ring enclosing NewBird. Caption: "Lambda Labs has raised 18× more."
- 40%: Camera 55×; Applied Digital ring. Caption: "Applied Digital has 55× more."
- 60%: Camera 116×; CoreWeave ring. NewBird is now a pixel.
- 80%: Camera 4,688×; Hyperscaler ring fills viewport. NewBird is not visible at any resolution.
- 100%: Text rises: "To matter at this table, NewBird needs between $500M and $1B. It has $128M." A small "you are here" arrow points to where NewBird was.

**Background:** Transitions from cream `#F3EBDA` (start) to clean white `#FFFFFF` (end) — the analytical shift.

**Text overlay:** Text appears and disappears synchronized with each zoom stop (only one visible at a time). Bottom-third of viewport.

**Transition out:** Zoom abruptly reverses — we fall back to NewBird at 1×, land on it, then the dot splits into the unit-economics grid of Scene 10.

**Cognitive-load budget:** 6 elements at peak (5 concentric rings + caption). Mitigated: rings are nested → Gestalt grouping reads as one scale object.

**Accessibility:** Horizontal bar chart, log scale, with a "You are here" marker. Static, one image.

**Why this gets extra investment:** This is the piece's defining single image. Must work as a screenshot people share on Twitter. **Engineering time: +1 day above baseline.**

---

### SCENE 10 — "The Knife-Edge"
**Working title:** *One dollar an hour*

**Beat:** Show the bull case isn't crazy — it's contingent. The whole pivot lives or dies on a single contracting variable.

**Key data:** NPV table from Capital Allocation Aggressive. At $2.50/hr / 80% utilization: -$18M NPV. At $3.00/hr / 85%: -$8M. At $3.50/hr / 90%: +$3M (marginal). At $4.00/hr / 90%: +$18M. At $5.00/hr / 92%: +$48M. H100 spot rates already hit $1.50/hr in 2024.

**Copy sample:**
> The bull case for NewBird AI is real, and it fits on one line. If they sign enterprise contracts at three dollars and fifty cents per GPU-hour, the math turns positive. If they sign them at four dollars, the company is genuinely valuable. If they sign them at five — the rate Blackwell B200s currently command — the company is worth what the market is paying. Below three-fifty, every model returns the same answer: negative net present value. The entire pivot lives on one dollar an hour, on contracts that have not been signed, with customers who have not been named.

**Visualization:** Heatmap grid. Rows: rental rate ($2.00 → $5.00). Columns: utilization (70% → 92%). Cells: NPV color-coded (bear-crimson for negative, bull-green for positive, darker = more extreme). A diagonal "break-even frontier" draws as the zero-NPV isoline. A ghostly marker lands at ($3.00, 85%) — market reality today — firmly in the red zone.

**Scroll mechanic:** Sticky heatmap; 4 text steps draw successive reveals.

**Animation sequence:**
- 0%: Empty grid with axes. Cells gray.
- 25%: Cells fill left-to-right with color (stagger 40ms). Reader sees the sea-of-red.
- 50%: The $3.50 row glows: stroke thickens, label grows. "Below $3.50/hour, every scenario is negative NPV."
- 75%: Break-even frontier draws (zero-NPV isoline).
- 100%: Market-reality marker lands at ($3.00, 85%). An arrow draws up-and-right to ($4.00, 90%). Caption: "Market rates are here. Thesis requires the company to be here."

**Background:** Clean white `#FFFFFF`.

**Text overlay:** Stepper cards on left (desktop) / inline (mobile).

**Transition out:** Heatmap dims. A horizontal timeline bar draws across the bottom, carrying us into Scene 11.

**Cognitive-load budget:** 5 elements (grid, break-even frontier, market marker, thesis marker, caption).

**Accessibility:** Static heatmap (all cells visible) with high-contrast palette and numerical NPV in each cell. Alt: reads the critical $3.50 row.

---

### SCENE 11 — "Noon"
**Working title:** *The fade*

**Beat:** Stock peaks intraday and starts coming back. Mood shifts from euphoric to nervous.

**Key data:** Intraday peak $24.31. Close $14.50. Roughly 40% retrace from intraday high in the back half of the session.

**Copy sample:**
> The peak came around eleven-thirty. Twenty-four dollars and thirty-one cents. From there, every minute was a small surrender. By two o'clock the stock had given back a third of the morning's gain. By the close it was at fourteen-fifty — still up almost five hundred percent on the day, still a triumph, but already the chart was telling you who was buying in the morning and who was selling in the afternoon.

**Visualization:** Same animated chart from Scene 3, played forward. A second-derivative annotation appears at the peak.

**Scroll mechanic:** Resume horizontal-scroll on the same chart. Visual continuity matters.

**Animation sequence:**
- 0%: Chart at $24.31 peak (from Scene 3's end state).
- 25%: Downtrend candlesticks draw in.
- 50%: Stock at $18, volume declining.
- 75%: Stock at $15.
- 100%: Close $14.50. Caption: "After the close, the filings start."

**Background:** Transitions to clean white `#FFFFFF`.

**Text overlay:** Single paragraph below chart.

**Transition out:** Chart fades. May 18 calendar rises.

**Cognitive-load budget:** 4 elements (chart, peak annotation, close annotation, volume).

**Accessibility:** Static full-day chart with both peak and close labeled. Alt: "BIRD closed April 15 at $14.50, off 40% from its intraday peak of $24.31."

---

### SCENE 12 — "The May 18 Calendar"
**Working title:** *What you'll learn at the stockholder vote*

**Beat:** Surface the unanswered question the proxy will answer. Build anticipation.

**Key data:** May 18, 2026 stockholder vote. Required because the convertible dilutes past Nasdaq's 19.99% cap. Conversion terms not yet public. Two scenarios — fixed (benign) vs. floating with discount and lookback (toxic).

**Copy sample:**
> The press release didn't include the conversion terms. By securities law it didn't have to — yet. Sometime between now and May eighteenth, the company will file a definitive proxy. Buried in that proxy will be one number, or two, that decides whether the convertible is the patient growth capital management is selling, or the death-spiral instrument that bear-case investors are betting on. Until then, the dilution risk on this stock is mathematically unbounded. Not large — unbounded.

**Visualization:** A horizontal timeline running from April 15 (today) to May 18 (vote). A count-up date ticker animates as reader scrolls. Branching paths appear after May 18 showing two futures.

**Scroll mechanic:** Sticky canvas. Timeline is horizontal; vertical scroll moves the cursor horizontally. After reaching May 18, scrolling continues and the path splits.

**Animation sequence:**
- 0%: Cursor at April 15. Date reads "April 15, 2026 — Day 1."
- 30%: Cursor advances. Daily-date ticker tumbles forward. Events pop: "Apr 22: Market digests," "Apr 30: Q1 preview," "May 5: Proxy filing," "May 12: Proxy review period."
- 60%: Cursor hits May 18. Vertical rule. Title card: "STOCKHOLDER VOTE."
- 75%: Path forks. Two thin lines diverge — upward in bull-green, downward in bear-crimson.
- 100%: Both paths fully drawn with endpoint labels: "Benign terms: $38-$125 (bull)" / "Toxic terms: $1.50 or reverse split (bear)."

**Background:** Deep slate `#1A1F2A` with single accent light — suspenseful.

**Text overlay:** Single paragraph floats below timeline, stays as cursor moves.

**Transition out:** Both paths fade. We're left with a single quiet dot: today's price, $14.50.

**Cognitive-load budget:** 6 elements (timeline axis, cursor, vote marker, 2 paths, caption).

**Accessibility:** Static two-branch diagram with text labels. No scrubbing.

---

### SCENE 13 — "The Death-Spiral Math" ⭐ *(SIGNATURE INTERACTIVE)*
**Working title:** *From eight million to forty-two million shares*

**Beat:** Make dilution physical. Show what a toxic convertible does, mechanically, if the stock retraces. **This is the only scene where the reader drags with their hands.**

**Key data:** At $14.50 conversion price (20% discount): 4.3M new shares, 53% dilution. At $5.00: 12.5M new shares, 153% dilution. At $1.50: **41.7M new shares, 510% dilution.**

**Copy sample:**
> If the convertible is structured the way Chardan's recent deals have been structured, it converts at a discount to wherever the stock is when the holder pulls the trigger. The math is unforgiving. At fourteen-fifty, fifty million dollars of paper turns into four point three million new shares — half again the float. At five dollars it turns into twelve and a half million. At a buck-fifty — the level Bit Origin reached before its reverse split — it turns into forty-one point seven million shares. The eight million holders of record this morning would, on paper, own less than a sixth of their own company by Christmas.

**Visualization:** A stock-price slider running from $14.50 down to $1.50. As reader drags, (a) conversion shares recompute, (b) a pie chart morphs showing existing-shareholder % ownership shrinking, (c) a bar shows dilution %. Three animated odometer counters in a side panel: Stock price, New shares issued, Existing shareholder %.

**Scroll mechanic:** Initially scroll-driven — slider auto-animates from $14.50 to $5.00 to $1.50 as user scrolls through 3 steps. After step 3, the slider becomes grabbable (tap/drag). Scene does not advance until user interacts or waits 8 seconds.

**Animation sequence:**
- 0%: Slider at $14.50. Pie: 65% existing / 35% new. Dilution: 53%.
- 25%: Auto-drag to $11.60. Pie tilts to 62/38.
- 50%: Auto-drag to $5.00. Pie flips to 39/61. Dilution reads 153%.
- 75%: Auto-drag to $1.50. Pie collapses to 16/84. Dilution reads 510%. Background color shifts cooler → warmer (paper → soft crimson wash).
- 100%: Control handed to user. Invitation: "Drag to explore."

**Background:** Paper `#F8F4EC` → crimson wash `#F3E0DD` (reactive to slider position).

**Text overlay:** Right-side panel (desktop) with three odometer counters. Counters tick digit-by-digit (not jump).

**Transition out:** User release triggers a soft crossfade to Scene 14.

**Cognitive-load budget:** 5 elements (slider, pie, dilution bar, 3 counters grouped as 1 cluster).

**Accessibility:** Static table of three scenarios (current / moderate stress / severe stress) with the three outputs per row. Slider becomes a radio group. ARIA `role="slider"` with keyboard navigation (arrow keys adjust by $0.10).

**Why this gets extra investment:** Interactivity is how a static viz becomes a social object. Reader tweets "Did you try the slider?" **Engineering time: +1 day above baseline.** Extras: (a) smooth odometer counters that tick digit-by-digit, (b) haptic feedback on mobile (subtle tap on each $1 crossed), (c) background color shifts as dilution worsens.

**Full production spec for this scene is in Section 9.**

---

### SCENE 14 — *(reserved for content expansion — optional ghost-witnesses deep-dive if testing shows readers need more evidence for Chardan pattern; otherwise cut)*

---

### SCENE 15 — "The Bull's Best Argument"
**Working title:** *Stock as currency, currency on a clock*

**Beat:** Steelman the bull. Honor the strongest case for owning this. The structural fairness scene.

**Key data:** 30-90 day window. Secondary offering at $11.50 raises $300-500M. Strategic anchor PIPE (Nvidia/AMD/hyperscaler) changes the math. CoreWeave's first revenue was $0 too — in 2017 it was crypto miners.

**Copy sample:**
> The bull case is not crazy. It is a race. NewBird's stock is now its most valuable asset, more valuable than its cash. If management can execute a secondary offering at twelve dollars in the next thirty days — raising three hundred to five hundred million — the capital deficit closes far enough that an actual GPU business becomes possible. CoreWeave was a Bitcoin-mining shop that nobody had heard of in 2017; today it is worth sixty-two billion dollars. The window is small, the dilution is real, and the runway is short, but a competent CEO with a hot ticker has, historically, been able to pull this off.

**Visualization:** A countdown timer (90 days) with a "secondary offering window" bar shrinking as the days tick down. Side panel shows funds-raised at each price point.

**Scroll mechanic:** Time-based scrub. The reader can drag the day-counter and watch raise-amount fall.

**Animation sequence:**
- 0%: Day 1. Raise potential at $14 = $420M.
- 25%: Day 30. Raise potential at $10 = $300M.
- 50%: Day 60. Raise potential at $6 = $180M.
- 75%: Day 90. Raise potential at $3 = $90M.
- 100%: User can drag the scrubber back and forth.

**Background:** Paper `#F8F4EC`.

**Text overlay:** Side panel with the raise-amount calculator.

**Transition out:** Fade into Scene 16's final verdict.

**Cognitive-load budget:** 4 elements (timer, raise bar, day labels, caption).

**Accessibility:** Static table with 4 time snapshots. Drag becomes radio group.

---

### SCENE 16 — "The Verdict" ⭐ *(SIGNATURE CLOSING IMAGE)*
**Working title:** *Ten analysts, one company, ten prices*

**Beat:** The Parallel Tracks payoff. The 50× value spread becomes the closing image.

**Key data:** The 10-agent verdict table. $2.50, $3.30, $3.30, $4.77, $8.30, $12.78, $19.12, $38.38, $50, $125. Five bearish, one neutral, four bullish. (Current market price $14.50.)

**Copy sample:**
> Ten analysts looked at NewBird AI on April fifteenth. Same Bloomberg terminal, same SEC filings, same eighteen-minute spike. They produced ten different prices. The lowest said two-fifty; the highest said one hundred twenty-five. They cannot all be right. They are also not, in any easy way, all wrong. Each price corresponds to a different bet about which of three questions resolves yes: Can NewBird sign a $3.50/hour contract? Are the convertible terms benign? Will management raise equity before the spike fades? Yes to all three, you get one-twenty-five. No to all three, you get two-fifty. The market today says fourteen-fifty, which means the market today says: roughly one chance in six. The next four months will tell you whether that's optimism or innumeracy.

**Visualization:** A horizontal price ladder running the full width of the screen with the ten agents' verdicts plotted as dots/icons. Each verdict's reasoning surfaces on hover.

**Scroll mechanic:** Final scene is unpinned, scroll-free. The reader sits with the ladder.

**Animation sequence:**
- 0%: Empty axis with current-price marker at $14.50 (vertical dashed line).
- 25%: Bears drop in — 5 crimson circles cluster in $2.50-$8.30. Stagger 100ms each.
- 50%: Neutral drops in — graphite circle at $12.78.
- 75%: Bulls drop in — teal circles at $38, $50, $80, $125, with stretched impact.
- 100%: All labels settle. Dashed line at $14.50 highlighted. Caption: "The market price sits above all bears, below the neutral, and far below any bull. The bear cluster holds 5 of 10 votes."

**Background:** Off-white `#FAF7F0` — editorial closing.

**Text overlay:** Caption paragraph below chart. Agent labels attach to dots with short leader lines.

**Transition out:** None — this is the closing image. A single line below: *"The vote is May 18."*

**Cognitive-load budget:** 7 elements (bear cluster as 1, neutral, bull cluster as 1, current-price marker, x-axis, caption, scene title). Exactly at Miller's ceiling.

**Accessibility:** Ranked table: Agent | Verdict | Target. Screen reader reads in order. Alt: "Ten analysts span targets from $2.50 to $125. Five are bearish, one neutral, four bullish. The current market price sits in the gap between the bears and the lone Hold valuation."

**Why this gets extra investment:** Must hold up as a static end-state for readers who don't scroll all the way. **Engineering time: +0.5 day above baseline.**

---

### SCENE 17 — "Methodology & Sources"
**Beat:** Credibility footer.

**Visualization:** Collapsible accordion of sources, 10-agent report links, methodology notes.

**Scroll mechanic:** Normal page scroll. No sticky.

**Content:** Table of agent reports with inline links to `/reports/v2/` files in the GitHub repo. Source URLs for all news claims. Data timestamps.

**Background:** Off-white `#FAF7F0`.

**Accessibility:** Fully keyboard-navigable. Native HTML `<details>` elements.

---

## 4. Visual Design System

### Shared foundation (with Substack piece)

**Color palette:**

| Role | Hex | Use |
|------|-----|-----|
| Background (paper) | `#FBFAF7` / `#F8F4EC` / `#F3EBDA` | Scenes progress warmer toward mid-piece |
| Background (slate) | `#1A1F2A` | Scene 12 only — suspense |
| Background (black) | `#0B0B0E` | Scene 1 cold open only |
| Background (closing) | `#FAF7F0` | Scene 16 only |
| Ink | `#1A1A1A` | Primary text, axes |
| Ink-secondary | `#5C5C5C` | Annotations |
| Ink-tertiary | `#9E9E9E` | Gridlines |
| Brand accent (teal) | `#0E7C7B` | BIRD series, price ticker |
| Bull | `#3A8E5C` | Positive NPV, bull dots, benign path |
| Bear | `#B23A48` | Negative NPV, bear dots, toxic path |
| Marginal (amber) | `#D9A441` | $3.50 threshold, May 18 node |
| Neutral grey-context | `#8A8A8A` | Competitor bars |
| Highlight wash | `#FFF4D6` | "You are here" emphasis |
| Soft crimson wash | `#F3E0DD` | Scene 13 reactive background |

**Background progression across the piece:**
- Scenes 1: `#0B0B0E` (theatrical cold open)
- Scenes 2-3: `#F8F4EC` (investigative)
- Scenes 4-8: `#F3EBDA` with subtle grain (archival/forensic)
- Scenes 9-11: `#FFFFFF` (analytic)
- Scene 12: `#1A1F2A` (suspense)
- Scenes 13-15: `#F8F4EC` (synthesis)
- Scene 16: `#FAF7F0` (editorial close)

Transitions between background colors happen during scene transitions using 800ms crossfades on the body element.

### Typography scale (scrollytelling-specific additions)

Editorial serif for display + prose, monospace for numbers.

| Role | Family | Size (desktop / mobile) | Usage |
|------|--------|------------------------|-------|
| Display hero number | Serif, semibold italic | 120px / 64px | "$14.50", "582%", "May 18" |
| Scene title | Serif, regular | 48px / 32px | Scene 1, "The Capital Gap" |
| Stepper headline | Sans or serif | 24px / 20px | In stepper cards |
| Body prose | Serif | 20px / 18px, 1.6 line-height | Narrative paragraphs |
| Axis / tick labels | Mono | 11px (never shrinks) | Chart chrome |
| Annotation | Sans medium | 14px / 13px | Leader-line callouts |
| Ticker / code | Mono | inherits | `BIRD`, odometer digits |

Display type is **italic serif** for numeric reveals (numbers-as-characters per design rule #7). Mono reserved for machine output (tickers, raw data).

**Font families:** GT Super or Source Serif for editorial display; GT America, Söhne, or Inter for sans; JetBrains Mono or IBM Plex Mono for monospace. All require `font-feature-settings: "tnum"` for tabular lining figures.

### Motion design vocabulary

**Duration scale (use these, don't improvise):**
- Flash/ping: 200ms
- Micro (opacity, color): 300ms
- Standard (draws, slides, fades): 600ms
- Grand reveal (hero numbers, scale-zoom stops): 1200ms
- Narrative pause between beats: 800ms

**Easing primitives (D3):**
- `d3.easeCubicOut` — default for entrances (fast start, gentle land)
- `d3.easeCubicInOut` — for scrubbed scroll-bound tweens
- `d3.easeExpOut` — for hero drops (agent dots falling in Scene 16)
- No `easeElastic`, no bounces, no overshoots. This piece is not whimsical.

**Stagger conventions:**
- Small multiples: 100ms stagger between panels
- List items: 60ms stagger
- Stats cluster: 150ms stagger

**Parallax policy:** Used ONCE only — Scene 1's candle. No parallax elsewhere.

### Sound

**No.** Autoplay audio is universally disliked. Financial readers default to muted. Content restraint is part of credibility.

### Navigation chrome

- **Progress bar:** Thin 2px bar at top of viewport showing overall scroll progress. Segmented into 16 tick marks for scene boundaries. Completed segments fill with accent color.
- **Chapter markers:** Clickable dots on the progress bar; on hover/focus show scene titles.
- **Skip intro button:** Appears after 3 seconds if user hasn't scrolled — "Start reading →" — jumps to Scene 2. Removes itself once user scrolls.
- **Mobile-only "Jump to verdict" link:** For readers who need the bottom line. Honest, not sneaky.
- **No floating share buttons.** Share at the end.
- **No back-to-top.** Natural scroll-up serves.
- **Keyboard navigation:** Arrow keys advance scene; `Esc` dismisses any open drawer.

### Persistent BIRD ticker

Top-right corner of viewport across all 16 scenes. Monospace, 14px. Starts at `$2.49`. Updates to `$24.31` at Scene 3 peak, `$14.50` by Scene 11 close, holds at `$14.50` from Scene 12 onward. The ticker is the piece's heartbeat — even when prose has zoomed out to historical analysis, the price stays on screen, anchoring the reader to the trading day.

---

## 5. Tech Stack

### Primary stack

**Svelte + D3 (tree-shaken) + scrollama.js**, static build, hosted on Vercel or GitHub Pages.

**Rationale:**
- **Svelte** over React — smaller bundle (~10KB vs ~45KB), built-in scoped CSS, native transitions with `in:`/`out:` directives, faster initial load (critical on mobile 3G). One-off piece; no React ecosystem needed.
- **D3** for bespoke viz — scale-zoom, decision tree, dragged simulator, two-line overlay. No charting library handles all of these. Tree-shake imports: `d3-scale`, `d3-shape`, `d3-selection`, `d3-transition`, `d3-drag`, `d3-interpolate`, `d3-ease`. Keep bundle under 30KB.
- **scrollama.js** over GSAP ScrollTrigger — uses native `IntersectionObserver`, battle-tested at The Pudding, <5KB, maps 1:1 to our sticky-graphic + stepper-cards pattern. GSAP would be overkill for step-based state changes.
- **CSS `position: sticky`** for all sticky-graphic patterns — offloads sticky logic from JS to the browser's compositor (battery/jank friendly on mobile).

### Rejected alternatives

- **Observable Runtime / Notebook**: host chrome cluttered, loses reactivity on export.
- **React + Framer Motion**: bundle cost unjustified.
- **Shorthand / Ceros**: vendor lock-in; constrains the custom scale-zoom.
- **Pure CSS scroll animations** (`animation-timeline: scroll()`): mobile Safari support too fresh as of April 2026.
- **Three.js / WebGL**: no 3D content; would violate honesty rule.
- **ECharts / Visx / Plot**: opinionated defaults would require override wars. Raw D3 cleaner for bespoke.

### Complementary static layer

**Observable Plot** (9KB gzipped) for any simple footer figures — shares D3 scales, one-liner syntax.

### Hosting & publishing

- **Build:** SvelteKit with `adapter-static` → static HTML/CSS/JS
- **Host:** Vercel (free tier, edge network, preview deploys, better social unfurls) or GitHub Pages
- **Substack integration:** The Substack piece embeds screenshots/static versions with a prominent "Read the interactive" button linking to the scrollytelling URL
- **Analytics:** Plausible (privacy-respecting, lightweight). Track scroll depth per scene, time-per-scene, reduced-motion %, mobile share, exit scene.

### Performance budget

| Metric | Budget |
|--------|--------|
| Total JS (gzipped) | ≤ 80 KB |
| Total CSS | ≤ 15 KB |
| Images (SVG/WebP only) | No raster > 150 KB |
| First Contentful Paint | ≤ 1.5s on 4G |
| Lighthouse performance | ≥ 90 |
| Lighthouse accessibility | 100 |

---

## 6. The Three Extra-Investment Moments

These three scenes get disproportionate craft budget — the final 20% that lifts the piece from "good" to "shared-on-Twitter."

### Investment moment 1 — Scene 9: The Scale Zoom

**Why:** 235× capital gap is the single most persuasive bear fact. If the reader takes one screenshot, it should be this. Direct inheritance of "Scroll to a Billion" / "1 Pixel Wealth" devices, applied to a specific financial argument.

**Extras:**
- Exact zoom ratios (not log-stretched) for honesty
- Circles nest concentrically so NewBird remains locatable
- At max zoom, a small "you are here" arrow persists pointing to the invisible dot

**Engineering time:** +1 day above baseline.

### Investment moment 2 — Scene 8: The LBCC Historical Overlay

**Why:** "BIRD is on day 1 of this chart" is the line that gets screenshotted. The visual carries the rhetorical freight: two lines, one finished and disastrous, one just beginning.

**Extras:**
- The BIRD "day 1" dot pulses indefinitely — a subtle heartbeat
- The dashed "future" region beyond BIRD's current point is shaded slightly ominous
- Keyboard users can tab through LBCC milestones

**Engineering time:** +0.5 day above baseline.

### Investment moment 3 — Scene 13: The Dilution Simulator

**Why:** Interactivity turns a static viz into a social object. Reader tweets "Did you try the slider?" Passive reading becomes active exploration, creating shareable personal-finding moments.

**Extras:**
- Smooth odometer counters that tick digit-by-digit (not jump)
- Haptic feedback on mobile (subtle tap on each $1 crossed)
- Background color shifts as dilution worsens, unconsciously priming the reader

**Engineering time:** +1 day above baseline.

### Moments of Deliberate Restraint (no animation)

- **Scene 16 closing paragraph:** No celebratory burst, no animation. The sentence lands on paper and holds.
- **Transition from Scene 7 (Chardan) to Scene 8 (LBCC):** Hard cut. The connection is so obvious that easing it would patronize.
- **All axis labels and tick marks:** They appear. They don't dance.

---

## 7. Failure Modes and Countermeasures

### Failure mode 1 — Mobile scroll jank (60% of traffic)

**Symptoms:** Sticky elements jitter, canvas redraws drop frames, tap interactions missed, fonts flash unstyled, 8s to interactive.

**Causes:** Excessive DOM nodes per scene; animated SVG with >500 elements; layout thrashing from reading `getBoundingClientRect` inside scroll handlers; heavy rasters; `100vh` bugs on iOS Safari URL bar.

**Countermeasures:**
1. **Budget: ≤ 300 DOM elements per scene.** Recycle nodes across scenes. Use canvas (not SVG) for Scene 9's scale zoom (thousands of nested rings would kill SVG).
2. **No `vh` units.** Use `dvh` (dynamic viewport height) or JS-measured pixel heights.
3. **`will-change: transform` ONLY on actively animating elements**, removed after animation completes.
4. **Pre-calculate all scale domains on mount**, not in scroll handlers. Scroll handlers only tween between pre-computed states.
5. **`IntersectionObserver` for sticky; no scroll-listener polling.**
6. **Test on a mid-range 2022 Android** (Pixel 6a, Samsung A-series), not only on reviewer's M2 MacBook.
7. **`content-visibility: auto` on off-screen scenes** to skip rendering cost.

### Failure mode 2 — Cognitive overload density (readers bounce at Scene 13 or 10)

**Symptoms:** Analytics show median time-on-page drops at a specific scene; scroll-depth tails off; bounce-rate spikes.

**Causes:** Scenes 10 (NPV heatmap) and 13 (dilution math) are highest-density. General retail readers may lack prerequisites for convertible dilution or NPV sensitivity.

**Countermeasures:**
1. **Scene 13:** Initial auto-drag is the teaching mode — reader watches before being asked to drive. If retention poor, add optional "Why does dilution compound?" hover-tip expanding a 2-sentence primer.
2. **Scene 10:** Annotate EVERY cell with its NPV number, not only colors. Colors without numbers feel vague. Add a one-line "How to read" note: "Rows: what NewBird can charge. Columns: how much of its fleet is rented at any time. Green = profitable, red = losing money."
3. **Maintain a "Plain English" toggle** in the site chrome that rewrites all captions at 8th-grade reading level while preserving visualizations. Ship with v1.
4. **Exit-scene tracking + user testing with 5 non-finance readers BEFORE publishing.** If any cannot summarize Scene 10 in their own words, the scene is broken.

### Failure mode 3 — Editorial manipulation feel (credibility collapse)

**Symptoms:** Readers comment on Twitter that the piece is a hit-piece; finance Twitter accuses author of shorting the stock; dramatization (candle fire, crimson washes, "death-spiral" labels) is received as persuasion rather than analysis.

**Causes:** Animation carries rhetorical weight. A line that falls into red shade is a more forceful argument than a neutral line. We risk using motion to persuade rather than explain.

**Countermeasures:**
1. **No truncated axes anywhere. Ever.** Scene 5's GPU chart starts at $0. The decline is dramatic without help.
2. **Both sides get equal visual budget.** Scene 16's dispersion shows 5 bears AND 4 bulls with same dot size, drop animation, label treatment. Scene 12's decision tree leads to BOTH outcomes with equivalent weight.
3. **The bull case owns Scene 12's upward branch and Scene 15 entirely.** Drawn in full bull-green with same prominence as bear branches.
4. **Author's position is stated once, in a closing attribution line.** Not hidden, not relentlessly steered towards. Before that, the piece is an investigation; after, it is the conclusion, signed. Editorial ethics.
5. **Every numerical claim links to a source in a footnote tooltip** (hover/tap on the number). Source provenance is one click away.
6. **An explicit "Counter-view" callout** in Scene 17 footer links to bull-case agent reports with equal prominence.
7. **Language audit before launch:** Replace every persuasive adjective in captions with a numerical claim. "Devastating dilution" → "153% dilution at $5". Numbers persuade honestly; adjectives persuade dishonestly.

---

## 8. Substack Chart Implementation (Companion Piece)

The Substack article at `/article/substack-newbird.md` references 8 static charts. These reuse the visual system above and should be rendered as SVG for web, 2× PNG for email.

| # | Chart | Type | Tool | Aspect | Scrollytelling scene source |
|---|-------|------|------|--------|----------------------------|
| 1 | Spike intraday | Line + volume strip | Observable Plot | 700×394 (16:9) | Scene 3 (static export) |
| 2 | Chardan track record | Small multiples | D3 or Figma | 700×933 (3:4) | Scene 7 (flattened) |
| 3 | Capital adequacy gap | Log-scale horizontal bars | Observable Plot | 700×525 (4:3) | Scene 9 (static flattening of scale-zoom) |
| 4 | Death-spiral curve | Dual-axis curve | D3 | 700×394 (16:9) | Scene 13 (static; interactive lives in scrollytelling) |
| 5 | GPU price collapse | Line + viability bands | matplotlib or Plot | 700×394 (16:9) | Scene 10 companion |
| 6 | NPV waterfall (HERO) | Diverging-zero bars | D3 | 700×460 | Scene 10 companion |
| 7 | May 18 bifurcation | Branching timeline | D3 | 700×1244 (9:16) | Scene 12 |
| 8 | 10-agent dispersion | Strip plot | Observable Plot | 700×394 (16:9) | Scene 16 (static export) |

**Render constraints:**
- Substack renders at ~700px desktop, ~360px mobile. Export at 2× for retina.
- Substack email strips JS. Ship PNG for email, SVG for web.
- Social previews: use Chart 6 (NPV waterfall) as OG/Twitter card — most shareable single image.
- Alt text required on every chart. Full alt text in the Substack piece.

---

## 9. Production Sample: Scene 13 (Dilution Simulator)

*Full production-level spec. An engineer should build this from the spec alone, no further questions.*

### 9.1 Component tree

```
<Scene13DilutionSimulator>                     (Svelte component)
  ├─ <StickyCanvas>                            (position: sticky; height: 100dvh)
  │   ├─ <StockPriceSlider>                    (SVG, horizontal axis $1.50–$14.50)
  │   ├─ <DilutionBar>                         (SVG horizontal bar, 0–600%)
  │   ├─ <OwnershipPie>                        (SVG, two-sector pie)
  │   └─ <CounterCluster>                      (HTML, three animated odometers)
  └─ <StepperColumn>                           (left-pinned desktop, inline mobile)
      ├─ <Step data-step="1">Intro</Step>
      ├─ <Step data-step="2">Moderate stress</Step>
      ├─ <Step data-step="3">Severe stress</Step>
      └─ <Step data-step="4">Hand-off to user</Step>
```

### 9.2 State (Svelte stores)

```js
// src/stores/scene13.js
import { writable, derived } from 'svelte/store';

export const stockPrice = writable(14.50);
export const userIsDriving = writable(false);
export const reducedMotion = writable(
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
);

export const derivedMath = derived(stockPrice, ($price) => {
  const discount = 0.80;                       // 20% conversion discount
  const conversionPrice = $price * discount;
  const newShares = 50_000_000 / conversionPrice;
  const existingShares = 8_170_000;
  const totalShares = existingShares + newShares;
  return {
    conversionPrice,
    newShares,
    dilutionPct: (newShares / existingShares) * 100,
    existingOwnershipPct: (existingShares / totalShares) * 100,
    newOwnershipPct: (newShares / totalShares) * 100,
  };
});
```

### 9.3 Scroll integration (scrollama)

```js
// src/lib/scene13-scroll.js
import scrollama from 'scrollama';
import { get } from 'svelte/store';
import { stockPrice, userIsDriving, reducedMotion } from '../stores/scene13';
import { interpolateNumber } from 'd3-interpolate';
import { easeCubicInOut } from 'd3-ease';

const STEP_PRICES = [14.50, 11.60, 5.00, 1.50];

export function initScene13() {
  const scroller = scrollama();
  scroller
    .setup({
      step: '#scene13 [data-step]',
      offset: 0.6,
      progress: true,
    })
    .onStepProgress(({ element, progress }) => {
      const idx = +element.dataset.step - 1;
      if (idx === 3) {
        userIsDriving.set(true);
        return;                                // Don't auto-drive user's step
      }
      const from = STEP_PRICES[idx];
      const to = STEP_PRICES[idx + 1] ?? STEP_PRICES[idx];
      const eased = easeCubicInOut(progress);
      stockPrice.set(interpolateNumber(from, to)(eased));
    });

  // Reduced-motion: snap to final state
  if (get(reducedMotion)) {
    stockPrice.set(STEP_PRICES[STEP_PRICES.length - 1]);
    userIsDriving.set(true);
  }

  return scroller;
}
```

### 9.4 Slider (D3 drag + Svelte reactive)

```svelte
<!-- src/components/StockPriceSlider.svelte -->
<script>
  import { stockPrice, userIsDriving } from '../stores/scene13';
  import { scaleLinear } from 'd3-scale';
  import { drag } from 'd3-drag';
  import { select } from 'd3-selection';
  import { onMount } from 'svelte';

  export let width = 600;
  export let height = 80;

  const xScale = scaleLinear()
    .domain([1.50, 14.50])
    .range([20, width - 20])
    .clamp(true);

  $: handleX = xScale($stockPrice);
  let handleEl;

  onMount(() => {
    select(handleEl).call(
      drag()
        .on('start', () => { userIsDriving.set(true); })
        .on('drag', (event) => {
          const price = xScale.invert(event.x);
          stockPrice.set(Math.max(1.50, Math.min(14.50, price)));
        })
    );
  });
</script>

<svg {width} {height} role="slider"
     aria-valuemin="1.50" aria-valuemax="14.50"
     aria-valuenow={$stockPrice.toFixed(2)}
     aria-label="BIRD stock price scenario">
  <line x1="20" y1={height/2} x2={width-20} y2={height/2}
        stroke="var(--color-ink-40)" stroke-width="2" />
  <line x1={xScale(11.60)} y1={height/2 - 8}
        x2={xScale(11.60)} y2={height/2 + 8}
        stroke="var(--color-ink-60)" stroke-dasharray="2 2" />
  <circle bind:this={handleEl}
          cx={handleX} cy={height/2} r="14"
          fill="var(--color-accent)"
          stroke="var(--color-ink-100)" stroke-width="2"
          style="cursor: grab" />
  <text x={handleX} y={height/2 - 22} text-anchor="middle"
        class="price-label">
    ${$stockPrice.toFixed(2)}
  </text>
</svg>

<style>
  .price-label {
    font-family: var(--font-serif);
    font-size: 18px;
    font-style: italic;
    fill: var(--color-ink-100);
  }
</style>
```

### 9.5 Odometer (digit-by-digit tick)

```svelte
<!-- src/components/Odometer.svelte -->
<script>
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';

  export let value = 0;
  export let format = (v) => v.toLocaleString('en-US', { maximumFractionDigits: 0 });
  export let duration = 400;

  const displayed = tweened(value, { duration, easing: cubicOut });
  $: displayed.set(value);
</script>

<span class="odometer" aria-live="polite">{format($displayed)}</span>

<style>
  .odometer {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
  }
</style>
```

### 9.6 Reactive background

```svelte
<script>
  import { interpolateLab } from 'd3-interpolate';
  import { stockPrice } from '../stores/scene13';

  const paperColor = '#F8F4EC';
  const alarmColor = '#F3E0DD';
  $: bgColor = interpolateLab(paperColor, alarmColor)(
    Math.max(0, Math.min(1, (14.50 - $stockPrice) / 13))
  );
</script>

<section id="scene13" style="background-color: {bgColor}; transition: background-color 400ms linear">
  <!-- scene content -->
</section>
```

### 9.7 Reduced-motion fallback

```svelte
{#if $reducedMotion}
  <table class="fallback-table">
    <thead>
      <tr><th>Scenario</th><th>Stock</th><th>New shares</th><th>Existing stake</th><th>Dilution</th></tr>
    </thead>
    <tbody>
      <tr><td>Current</td><td>$14.50</td><td>4.3M</td><td>65.5%</td><td>53%</td></tr>
      <tr><td>Moderate</td><td>$5.00</td><td>12.5M</td><td>39.5%</td><td>153%</td></tr>
      <tr><td>Severe</td><td>$1.50</td><td>41.7M</td><td>16.4%</td><td>510%</td></tr>
    </tbody>
  </table>
{:else}
  <!-- Animated version above -->
{/if}
```

### 9.8 Accessibility contract

- Slider: ARIA `role="slider"`, `aria-valuemin/max/now`; arrow keys adjust by $0.10; `Home`/`End` jump to min/max.
- Counters: `aria-live="polite"` — screen readers announce changes without interrupting.
- Scene has visually hidden `<h2>` heading for landmark navigation.
- Color is never the sole channel — dilution % text accompanies every color shift.

### 9.9 Performance envelope

| Metric | Budget |
|--------|--------|
| DOM nodes | ≤ 80 |
| Initial JS for scene | ≤ 15 KB |
| Frame rate during drag | 60 fps (single requestAnimationFrame) |
| Interaction latency (drag to update) | ≤ 50 ms |
| Memory at rest | ≤ 5 MB |

### 9.10 Analytics events

```js
track('scene13_enter');
track('scene13_auto_complete');
track('scene13_user_drag_start');
track('scene13_user_drag_end', { finalPrice, finalDilution });
track('scene13_exit', { timeSpentMs });
```

### 9.11 Files to create

```
/src/routes/+page.svelte                          (scene orchestrator)
/src/components/Scene13DilutionSimulator.svelte
/src/components/StockPriceSlider.svelte
/src/components/OwnershipPie.svelte
/src/components/DilutionBar.svelte
/src/components/Odometer.svelte
/src/stores/scene13.js
/src/lib/scene13-scroll.js
/src/styles/scene13.css
```

### 9.12 D3 spec for Hero Chart 6 (NPV Waterfall — also needed for Substack static export)

```js
// Data
const data = [
  { rate: 2.00, util: 70, npv: -37, label: "$2.00/hr (spot market)",       verdict: "REJECT" },
  { rate: 2.50, util: 80, npv: -18, label: "$2.50/hr",                     verdict: "REJECT" },
  { rate: 3.00, util: 85, npv: -8,  label: "$3.00/hr",                     verdict: "REJECT" },
  { rate: 3.50, util: 90, npv: +3,  label: "$3.50/hr (enterprise)",        verdict: "MARGINAL" },
  { rate: 4.00, util: 90, npv: +18, label: "$4.00/hr (premium dedicated)", verdict: "INVEST" },
  { rate: 5.00, util: 92, npv: +48, label: "$5.00/hr (B200 tier)",         verdict: "STRONG INVEST" }
];

// Canvas
const width = 700, height = 460;
const margin = { top: 80, right: 140, bottom: 60, left: 220 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Scales
const xScale = d3.scaleLinear().domain([-45, 55]).range([0, innerWidth]).nice();
const yScale = d3.scaleBand().domain(data.map(d => d.label)).range([0, innerHeight]).padding(0.25);
const color = d => d.verdict === "REJECT" ? "#B23A48" :
                   d.verdict === "MARGINAL" ? "#D9A441" : "#3A8E5C";

// Zero line at xScale(0), stroke #1A1A1A, width 1.5, extends full height
// Bars: rect at min(xScale(0), xScale(d.npv)), width |xScale(d.npv) - xScale(0)|
// Value labels inline, tabular font
// Row labels in left margin (rate primary, util% secondary)
// Highlight band #FFF4D6 behind $3.50 row
// Two brackets: "TODAY'S MARKET" (bear-red small caps, covers rows 1-3)
//               "ENTERPRISE CONTRACTS REQUIRED" (ink-secondary, covers rows 4-6)
// Right-side callout: "↑ The entire investment thesis lives here"
// Title: "Unit economics live or die at $3.50/hour"
// Subtitle: "Project NPV at six rental-rate scenarios, 5-year DCF at 10.5% WACC"
```

---

## 10. File Structure

```
/scrollytelling/
├── implementation-plan.md           (this document)
├── /src/
│   ├── /routes/
│   │   └── +page.svelte             (scene orchestrator)
│   ├── /components/
│   │   ├── Scene01_LastShoe.svelte
│   │   ├── Scene02_Announcement.svelte
│   │   ├── Scene03_Spike.svelte
│   │   ├── Scene04_ThreeQuestions.svelte
│   │   ├── Scene05_AssetSale.svelte
│   │   ├── Scene06_Redacted.svelte
│   │   ├── Scene07_ChardanFile.svelte
│   │   ├── Scene08_LBCCOverlay.svelte
│   │   ├── Scene09_ScaleZoom.svelte              ⭐
│   │   ├── Scene10_NPVHeatmap.svelte
│   │   ├── Scene11_AfternoonFade.svelte
│   │   ├── Scene12_May18Calendar.svelte
│   │   ├── Scene13_DilutionSimulator.svelte      ⭐
│   │   ├── Scene15_SteelmanBull.svelte
│   │   ├── Scene16_VerdictLadder.svelte          ⭐
│   │   ├── Scene17_Footer.svelte
│   │   ├── BirdTicker.svelte                     (persistent)
│   │   ├── ProgressBar.svelte
│   │   ├── Odometer.svelte
│   │   └── StockPriceSlider.svelte
│   ├── /stores/
│   │   └── [scene-specific stores]
│   ├── /lib/
│   │   ├── scrollama-setup.js
│   │   └── [scene-specific scroll handlers]
│   ├── /styles/
│   │   ├── tokens.css                (colors, type, spacing vars)
│   │   └── [scene-specific styles]
│   └── /data/
│       ├── agents.json               (10-agent verdicts)
│       ├── chardan-deals.json
│       ├── gpu-prices.json
│       ├── npv-grid.json
│       └── intraday-bird.json
├── /static/
│   ├── /fonts/
│   └── /images/                     (stills for social OG cards)
├── svelte.config.js
├── package.json
└── README.md
```

---

## 11. Build Plan (4-6 weeks)

| Week | Milestone |
|------|-----------|
| 1 | Scaffolding (Svelte + scrollama + D3). Design tokens. Persistent ticker. Scenes 1-2-3 (cold open + spike). |
| 2 | Scenes 4-8 (detective mechanism, Chardan file, LBCC overlay). |
| 3 | ⭐ **Scene 9 scale zoom** (+1 day craft budget). Scene 10 heatmap. Scene 11. |
| 4 | Scene 12 timeline. ⭐ **Scene 13 dilution simulator** (+1 day craft budget). Scene 15. |
| 5 | ⭐ **Scene 16 verdict ladder** (+0.5 day). Scene 17 footer. Static Substack chart exports. |
| 6 | Testing: reduced-motion, mobile (Pixel 6a), keyboard nav, Lighthouse, user testing with 5 non-finance readers. Polish. Ship. |

---

## 12. Source Material

All numerical claims sourced from the 10-agent dialectical valuation analysis:

- `/reports/v2/00-synthesis.md` (master synthesis; 10-agent valuation map)
- `/reports/v2/01-company-analyst-bull.md` ($38.38 target)
- `/reports/v2/02-company-analyst-bear.md` ($3.30, LBCC parallel, dilution table)
- `/reports/v2/03-special-situations-high-growth.md` ($12.78 Hold)
- `/reports/v2/04-special-situations-distressed.md` ($3.30, Black-Scholes)
- `/reports/v2/05-capital-allocation-aggressive.md` (NPV sensitivity, WACC)
- `/reports/v2/06-capital-allocation-conservative.md` (GPU price collapse, $4.77 dividend)
- `/reports/v2/07-acquisition-allbirds-as-acquirer.md` (target bid math)
- `/reports/v2/08-acquisition-allbirds-as-target.md` ($8.30 sell-into-spike)
- `/reports/v2/09-ipo-strategist-bull-rerating.md` ($50 / $125)
- `/reports/v2/10-ipo-strategist-bear-rerating.md` ($2.50-$4.50, Chardan precedents)

External sources: GlobeNewswire (Apr 15, 2026 press release), TradingView (10-K), Bloomberg, CNBC, TechCrunch, StockTitan, Wikipedia (Long Blockchain Corp), NASDAQ (Axe Compute), SEC.gov (Chardan 2018 consent order).

Genre reference study:
- The Pudding (scrollama pioneer, responsive-scrollytelling patterns)
- NYT Snow Fall (parallax storytelling)
- Bloomberg Graphics / The Big Take (financial editorial + interactive)
- Observable (D3 craft reference)
- "Scroll to a Billion" / "1 Pixel Wealth" (scale-zoom devices)

---

*This plan is complete. An engineer with Svelte + D3 experience can build the full piece from this document. Open questions — custom font licensing (Söhne / GT Super vs. free alternatives Inter / Source Serif) — are the only external decisions needed before starting.*
