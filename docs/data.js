/* Inlined data payload for file:// execution + GitHub Pages.
   Keeping JSON files in /data/ as the canonical source; this file mirrors them. */
window.__BIRD_DATA__ = {
  "agents": {
    "currentPrice": 14.50,
    "agents": [
      { "n": 1,  "name": "Company Analyst — Bull",        "role": "Steelman pivot",          "target": 38.38, "rec": "Speculative Buy",             "stance": "bull"    },
      { "n": 2,  "name": "Company Analyst — Bear",        "role": "Red-team pivot",          "target": 3.30,  "rec": "Strong Sell",                 "stance": "bear"    },
      { "n": 3,  "name": "Special Situations — Growth",   "role": "Optimistic DCF",          "target": 12.78, "rec": "Hold",                        "stance": "neutral" },
      { "n": 4,  "name": "Special Situations — Distress", "role": "Black-Scholes option",    "target": 3.30,  "rec": "Strong Sell",                 "stance": "bear"    },
      { "n": 5,  "name": "Capital Allocation — Aggressive","role": "All-in on AI",           "target": 8.30,  "rec": "Conditional Invest",          "stance": "bear"    },
      { "n": 6,  "name": "Capital Allocation — Conservative","role": "Return capital",       "target": 4.77,  "rec": "Reject pivot, pay dividend",  "stance": "bear"    },
      { "n": 7,  "name": "Acquisition — As Acquirer",     "role": "Buy AI target w/ stock",  "target": 19.12, "rec": "Deploy $70-90M",              "stance": "bull"    },
      { "n": 8,  "name": "Acquisition — As Target",       "role": "Sell into spike",         "target": 8.30,  "rec": "Sell",                        "stance": "bear"    },
      { "n": 9,  "name": "IPO Strategist — Bull rerating","role": "CoreWeave parallel",      "target": 50.00, "rec": "Buy, raise equity now",       "stance": "bull"    },
      { "n": 10, "name": "IPO Strategist — Bull 24mo",    "role": "Compounded rerating",     "target": 125.00,"rec": "Buy",                         "stance": "bull"    }
    ]
  },
  "chardan-deals": {
    "deals": [
      { "ticker": "NKLA", "company": "Nikola",     "year": 2020, "theme": "EV / hydrogen SPAC",      "outcome": "Fraud conviction (Milton), 4yr sentence, Chapter 11", "destructionPct": -100, "series": [100, 130, 180, 85, 60, 40, 28, 18, 12, 7, 3, 0] },
      { "ticker": "BTOG", "company": "Bit Origin", "year": 2025, "theme": "$500M Dogecoin treasury", "outcome": "1-for-60 reverse split, -98% in 6 months",            "destructionPct": -98,  "series": [100, 160, 220, 170, 120, 80, 40, 15, 6, 4, 3, 2] },
      { "ticker": "CLAS", "company": "Classover",  "year": 2025, "theme": "$500M into Solana",       "outcome": "Capital lockup, liquidity collapse",                  "destructionPct": -82,  "series": [100, 190, 240, 175, 110, 75, 55, 40, 30, 24, 20, 18] },
      { "ticker": "EYEN", "company": "Eyenovia",   "year": 2025, "theme": "$50M PIPE → HYPE tokens", "outcome": "Token illiquidity, legacy pharma stalled",            "destructionPct": -76,  "series": [100, 150, 195, 160, 110, 70, 55, 42, 35, 30, 26, 24] },
      { "ticker": "VVPR", "company": "VivoPower",  "year": 2025, "theme": "$121M for XRP",           "outcome": "Stock halved inside 90 days",                         "destructionPct": -65,  "series": [100, 185, 210, 150, 95, 70, 55, 48, 44, 40, 37, 35] },
      { "ticker": "LGHL", "company": "Lion Group", "year": 2025, "theme": "$600M Hyperliquid allocation", "outcome": "Trading halted, going-concern",                   "destructionPct": -71,  "series": [100, 175, 230, 165, 105, 72, 55, 45, 38, 34, 31, 29] }
    ]
  },
  "gpu-prices": {
    "series": [
      {"month":"2023-01","h100":8.00},{"month":"2023-04","h100":7.40},{"month":"2023-07","h100":6.90},{"month":"2023-10","h100":5.80},
      {"month":"2024-01","h100":4.50},{"month":"2024-04","h100":3.60},{"month":"2024-07","h100":2.80},{"month":"2024-10","h100":2.20},
      {"month":"2025-01","h100":1.90},{"month":"2025-04","h100":1.70},{"month":"2025-07","h100":1.60},{"month":"2025-10","h100":1.55},
      {"month":"2026-01","h100":1.50},{"month":"2026-04","h100":1.50}
    ],
    "bands": [
      {"label":"STRONG INVEST","min":5.0,"max":8.0,"color":"#3A8E5C"},
      {"label":"INVEST","min":4.0,"max":5.0,"color":"#6BAE7E"},
      {"label":"MARGINAL","min":3.5,"max":4.0,"color":"#D9A441"},
      {"label":"REJECT","min":0.0,"max":3.5,"color":"#B23A48"}
    ],
    "marketNow": 1.50, "thesisRequired": 3.50
  },
  "npv-grid": {
    "rates": [2.00, 2.50, 3.00, 3.50, 4.00, 4.50, 5.00],
    "utils": [70, 75, 80, 85, 90, 92],
    "grid": [
      [-52, -48, -43, -39, -35, -33],
      [-37, -31, -25, -21, -18, -16],
      [-24, -18, -12,  -9,  -8,  -6],
      [-10,  -5,   0,   3,   6,   9],
      [  2,   8,  13,  18,  22,  26],
      [ 14,  22,  30,  35,  40,  44],
      [ 28,  36,  44,  48,  52,  56]
    ],
    "thesisRate": 3.50,
    "marketMarker": {"rate": 3.00, "util": 85},
    "thesisMarker": {"rate": 4.00, "util": 90}
  },
  "intraday-bird": {
    "priorClose": 2.49,
    "trailing12": [
      {"d":"2025-04","p":3.10},{"d":"2025-05","p":3.02},{"d":"2025-06","p":2.95},{"d":"2025-07","p":2.88},
      {"d":"2025-08","p":2.82},{"d":"2025-09","p":2.78},{"d":"2025-10","p":2.70},{"d":"2025-11","p":2.63},
      {"d":"2025-12","p":2.58},{"d":"2026-01","p":2.54},{"d":"2026-02","p":2.51},{"d":"2026-03","p":2.49}
    ],
    "intraday": [
      {"t":"09:30","o":2.49,"h":3.20,"l":2.48,"c":3.15,"v":12},
      {"t":"09:35","o":3.15,"h":5.40,"l":3.10,"c":5.10,"v":35},
      {"t":"09:40","o":5.10,"h":9.20,"l":5.05,"c":8.80,"v":58},
      {"t":"09:45","o":8.80,"h":15.10,"l":8.70,"c":14.40,"v":72},
      {"t":"09:47","o":14.40,"h":24.31,"l":14.30,"c":22.80,"v":88},
      {"t":"10:00","o":22.80,"h":23.90,"l":21.20,"c":22.10,"v":42},
      {"t":"10:30","o":22.10,"h":23.10,"l":20.80,"c":21.60,"v":30},
      {"t":"11:00","o":21.60,"h":22.30,"l":20.10,"c":20.40,"v":22},
      {"t":"11:30","o":20.40,"h":20.80,"l":19.20,"c":19.60,"v":18},
      {"t":"12:00","o":19.60,"h":19.80,"l":18.10,"c":18.30,"v":15},
      {"t":"13:00","o":18.30,"h":18.70,"l":16.40,"c":16.80,"v":14},
      {"t":"14:00","o":16.80,"h":17.20,"l":15.40,"c":15.70,"v":12},
      {"t":"15:00","o":15.70,"h":15.90,"l":14.20,"c":14.80,"v":11},
      {"t":"15:30","o":14.80,"h":15.00,"l":14.30,"c":14.60,"v":10},
      {"t":"16:00","o":14.60,"h":14.70,"l":14.40,"c":14.50,"v":8}
    ],
    "peak": {"t":"09:47","p":24.31,"pct":582},
    "close": {"t":"16:00","p":14.50},
    "shortInterestPct": 18.3,
    "volumeTurnover": 35
  },
  "capital-ladder": {
    "anchor": {"name":"NewBird AI","capital":128,"unit":"M"},
    "rungs": [
      {"name":"NewBird AI","value":128,"unit":"M","ratio":1,"note":"$50M convertible + $39M asset sale + $39M cash"},
      {"name":"Lambda Labs","value":2300,"unit":"M","ratio":18,"note":"$2.3B raised (private, Nvidia-backed)"},
      {"name":"Applied Digital","value":7000,"unit":"M","ratio":55,"note":"$7B+ total capital in AI data centers"},
      {"name":"CoreWeave 2025 capex","value":14900,"unit":"M","ratio":116,"note":"CoreWeave fiscal 2025 capex $14.9B"},
      {"name":"Hyperscalers 2025","value":600000,"unit":"M","ratio":4688,"note":"AWS+Azure+GCP+Meta AI infra capex 2025"}
    ],
    "minViable": 500, "maxViable": 1000
  },
  "lbcc-overlay": {
    "lbcc": {
      "name": "Long Blockchain Corp (LBCC)",
      "series": [
        {"d":-30,"p":100},{"d":-20,"p":98},{"d":-10,"p":102},{"d":-1,"p":100},
        {"d":0,"p":380},
        {"d":10,"p":310},{"d":20,"p":265},{"d":30,"p":230},
        {"d":45,"p":200},{"d":60,"p":170},{"d":90,"p":140},
        {"d":120,"p":105},{"d":150,"p":75},{"d":180,"p":55},
        {"d":210,"p":40},{"d":240,"p":28},{"d":270,"p":18},
        {"d":300,"p":10},{"d":330,"p":5},{"d":365,"p":2}
      ],
      "milestones": [
        {"d":0,"label":"Dec 2017 — Name change to Long Blockchain"},
        {"d":90,"label":"Short sellers pile in; Nasdaq warning"},
        {"d":180,"label":"Reverse split attempted"},
        {"d":365,"label":"Nasdaq delisted; SEC investigation opens"}
      ]
    },
    "bird": {
      "name": "NewBird AI (BIRD)",
      "series": [
        {"d":-30,"p":105},{"d":-20,"p":101},{"d":-10,"p":98},{"d":-1,"p":100},
        {"d":0,"p":582}
      ],
      "currentDay": 0, "peakPct": 582
    }
  },
  "may18": {
    "start": "2026-04-15",
    "vote": "2026-05-18",
    "events": [
      {"date":"2026-04-15","label":"Day 1 — Pivot announced, $24.31 intraday, $14.50 close"},
      {"date":"2026-04-22","label":"Apr 22 — Market digests; short interest rebuilds"},
      {"date":"2026-04-30","label":"Apr 30 — Q1 preview window"},
      {"date":"2026-05-05","label":"May 5 — Definitive proxy filing expected"},
      {"date":"2026-05-12","label":"May 12 — Proxy review period"},
      {"date":"2026-05-18","label":"May 18 — Stockholder vote"}
    ],
    "branches": {
      "bull": {"label":"Benign fixed-conversion terms","range":"$38 – $125","color":"#3A8E5C"},
      "bear": {"label":"Toxic floating + lookback","range":"$1.50 or reverse split","color":"#B23A48"}
    }
  }
};
