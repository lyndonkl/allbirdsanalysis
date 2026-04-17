# The Document Is the Company

*On a wool sneaker startup, a $50M convertible, and one piece of paper almost nobody has read yet.*

> **AI-generated analysis.** Every layer of this piece was produced by a team of [Claude Code subagents](https://docs.claude.com/en/docs/claude-code/sub-agents). The valuation work came from five specialist agent types — [company analyst](https://github.com/lyndonkl/claude/blob/main/agents/company-analyst.md), [special-situations analyst](https://github.com/lyndonkl/claude/blob/main/agents/special-situations-analyst.md), [capital-allocation strategist](https://github.com/lyndonkl/claude/blob/main/agents/capital-allocation-strategist.md), [acquisition analyst](https://github.com/lyndonkl/claude/blob/main/agents/acquisition-analyst.md), and [IPO strategist](https://github.com/lyndonkl/claude/blob/main/agents/ipo-strategist.md) — each run as bull/bear pairs to force dialectical tension. The prose, structure, and editorial shaping were done by a [writing-assistant agent](https://github.com/lyndonkl/claude/blob/main/agents/writing-assistant.md); the charts and visual logic were designed by a [cognitive-design-architect agent](https://github.com/lyndonkl/claude/blob/main/agents/cognitive-design-architect.md). [All ten individual analyst reports and the synthesis document are public on GitHub.](https://github.com/lyndonkl/allbirdsanalysis/tree/main/reports/v2)
>
> I am an AI engineer, not a financial professional. I reviewed this work to the best of my ability, but the intended use is as a *starting point for your own analysis* — not a conclusion to act on. Validate the numbers yourself before forming a view. Not investment advice.

> 📊 **Prefer the visual version?** The same argument as a scroll-driven walkthrough — sixteen scenes, ten charts, an interactive dilution slider, and a five-act spine — is at **[lyndonkl.github.io/allbirdsanalysis](https://lyndonkl.github.io/allbirdsanalysis)**. Same thesis, different medium.

---

On April 15, 2026, a Tuesday, the equity of a small footwear company called Allbirds appreciated by 582%.

Allbirds, you may dimly recall, is the company that sold $95 sneakers made of merino wool to a generation of San Francisco engineers who wanted to look like they had not thought about their shoes. It went public in 2021 at a $4.1B valuation, lost approximately 99% of that valuation over the next four years, performed a 1-for-20 reverse split, and entered 2026 with a market capitalization of $21M, roughly the price of a nice house in Atherton. On April 15 it announced three things at once: it was selling its shoe business to American Exchange Group for $39M, it was raising $50M via a convertible note placed by Chardan Capital Markets, and it was rebranding to "NewBird AI" and becoming an AI compute infrastructure company.

The stock closed at $16.99, up fourteen and a half dollars on the day — a 582% single-day gain it could not maintain, having peaked intraday at $24.31 eighteen minutes after the bell. Roughly 286 million shares traded. On the 8.17 million shares outstanding that is thirty-five times turnover; on the roughly 5.6 million shares in the actual public float, it is closer to fifty. Either number is the kind of statistic you usually only see in the historical case studies of companies that no longer exist.

> **[CHART 1 — "From $2.49 to $16.99 in one trading session"]**
> *Intraday line chart. Y-axis: price ($), 0 to 25, linear. X-axis: 9:30 AM – 4:00 PM ET. Single accent line in brand teal (`#0E7C7B`). Dashed reference line at previous close $2.49. Annotated callouts at intraday peak $24.31 (9:47 AM) and close $16.99. Volume sub-strip beneath: "286M shares vs 8.17M shares outstanding (~5.6M float) = 35×–50× turnover." 700×394px (16:9). Built in Observable Plot, exported as SVG. Time-to-insight: 3 seconds — the slope alone tells the story.*

I want to make a single argument in this piece, and the argument is this: the relevant document about NewBird AI was filed the same day the stock spiked, and almost nobody has read it. Everything you have seen about this stock — the AI pivot, the GPU thesis, the comparisons to CoreWeave, the chartists' Fibonacci levels — is theater. The actual company is a [preliminary proxy filing (PREM14A) that landed on EDGAR on April 15 itself](https://www.sec.gov/Archives/edgar/data/1653909/000119312526155866/d39753dprem14a.htm). Somewhere in an exhibit is the conversion formula. The conversion formula is the entire investment.

The filing discloses what the press release did not. There is a fixed-price conversion path. There is also, alongside it, an alternate floating conversion: at the holder's option, the notes convert at the lower of (a) the fixed Conversion Price and (b) either **93% of the lowest volume-weighted average price of the common stock over the ten trading days preceding conversion**, or — if an event of default is then running — **85% of the lowest VWAP over the preceding fifteen trading days**, with a **25% premium** layered on top of the principal being converted. The notes also carry a **5% original issue discount**, which means that on the day of issuance the company books $47.5M of cash against $50M of face. The math is old enough to have a name. It is a death spiral in polite language.

If the fixed path prevails, NewBird AI is a real corporate entity with a real (if speculative) chance of being a real business. If the floating alternate activates — and under the 10-day-lowest-VWAP construction, the holder essentially always gets to pick the floating path when it is more favorable than the fixed price — existing shareholders are the funding source for a financing whose terms compound against them every time the stock ticks down.

Both mechanics were disclosed on April 15, in the PREM14A, in concrete percentage terms. Which one runs the outcome at maturity is still a function of where the stock trades between now and the second anniversary of issuance. This is not a retail trade today; it is a reading assignment.

Let me explain why that matters more than anything else about the company.

## The base rate

You have probably already pattern-matched this. In December 2017, a small Long Island beverage company called Long Island Iced Tea Corp. announced it was rebranding to [Long Blockchain Corp.](https://en.wikipedia.org/wiki/Long_Blockchain_Corp.) and pivoting to, as the name implies, blockchain. The stock spiked as much as 388% intraday and closed up more than 180% in a single session. The company, in the [SEC's own eventual wording, "never became operational"](https://www.sec.gov/files/litigation/admin/2021/34-91174.pdf) as a blockchain business. There was, in the sequence: an SEC insider-trading complaint against associated buyers; a Nasdaq delisting notice in February 2018; trading suspension on April 12, 2018; a Form 25 filed June 6, 2018; and a final SEC revocation order in 2021. The company is now studied as a textbook event, the way medical students study interesting cadavers.

In the world we are presently in, a small cancer diagnostics company called Predictive Oncology started its pivot in late September 2025 with the [announcement of a $344 million private placement](https://investors.predictive-oncology.com/news-releases/news-release-details/predictive-oncology-inc-announces-private-placements-344-million) to build an Aethir (ATH) digital-asset treasury — "the world's first Strategic Compute Reserve." It formally [rebranded to Axe Compute (ticker AGPU) on December 11, 2025](https://www.globenewswire.com/news-release/2025/12/12/3204603/37244/en/Predictive-Oncology-Becomes-Axe-Compute-Expanding-Into-High-Performance-AI-Infrastructure.html), and reported $0 of compute revenue in fiscal 2025. The stock did the thing.

Throughout 2025, Chardan Capital Markets — yes, the same Chardan that placed Allbirds' convertible — was the placement agent or financial advisor for a sequence of similarly shaped deals, though not identically structured: [Bit Origin, $500M split across $400M of equity and $100M of convertible debt](https://www.globenewswire.com/news-release/2025/07/17/3117305/0/en/Bit-Origin-Secures-500-Million-Equity-and-Debt-Facilities-to-Launch-Dogecoin-Treasury.html) for a Dogecoin treasury, followed by a 1-for-60 reverse split in January 2026 (a 98% destruction of shareholder value in six months); [Classover, up to $500M of senior secured convertible notes](https://www.sec.gov/Archives/edgar/data/2022308/000147793225004289/class_ex991.htm) "to support a SOL treasury reserve"; [Eyenovia (now Hyperion DeFi), a $50M PIPE of convertible preferred plus warrants](https://www.globenewswire.com/news-release/2025/06/17/3101041/0/en/Eyenovia-Announces-50-Million-Investment-to-Launch-a-Hyperliquid-HYPE-token-Cryptocurrency-Treasury-Reserve-Strategy.html) — not plain convertibles — for HYPE tokens; [VivoPower, $121M of straight equity at $6.05/share](https://www.globenewswire.com/news-release/2025/05/28/3089823/0/en/VivoPower-Announces-XRP-Focused-Digital-Asset-Treasury-Strategy-and-US-121-Million-Private-Placement-Priced-at-US-6-05-Per-Share-Above-Last-Market-Closing-Price-Under-NASDAQ-Rules.html) for an XRP treasury; [Lion Group, a $600M facility from ATW Partners](https://www.prnewswire.com/news-releases/lghl-secures-600-million-facility-to-launch-hyperliquid-hype-treasury-302485190.html) for a HYPE, SOL, and SUI treasury. There is a shape to this practice, even if the instruments vary. The shape is: take a distressed micro-cap with a tradeable ticker, attach it to a thematic asset, finance the attachment with whatever structured paper the accredited-investor desk will buy, and let entropy do its work.

> **[CHART 2 — "Chardan's last deals: 1 fraud conviction, 1 reverse split, 4 still in progress"]**
> *Horizontal small-multiples timeline. Five rows for past Chardan-placed pivots (Nikola, Bit Origin, Long Blockchain, plus 2025 cohort) + a sixth row for NewBird AI showing only the spike marker and a dashed line forward with "?" at the outcome point. Each row: spike-day filled circle, outcome-day X marker, connecting line in bear-red (`#B23A48`). NewBird row gets yellow highlight wash (`#FFF4D6`) — the "you are here" emphasis. Vertical aspect 3:4, 700×933px. Built in D3 (or hand-laid in Figma). Time-to-insight: 10 seconds — this is the deep-cut chart for the invested reader.*

I am not saying NewBird AI will end the way these stories ended. I am saying that the prior probability, conditioned on (i) distressed micro-cap selling its core business, (ii) overnight pivot to a hot sector, (iii) zero revenue in the new sector, (iv) Chardan as placement agent, and (v) a convertible larger than 25% of the pre-deal market cap — that prior probability is not 50/50. It is somewhere considerably south of 50/50. The single observable that updates that prior is the conversion formula.

## What the spike actually purchased

Before the proxy, what does the 582% spike actually buy NewBird AI?

About $89M, give or take. Roughly $39M from the footwear sale to American Exchange (some of which is earmarked for a special dividend, an interesting choice for a company that just told the market it needs capital), plus $50M from the convertible if and when shareholders approve it. Call it $89M of nominal capital, of which the realistically deployable share for actually building an AI compute business — net of fees, the special dividend, public-company overhead, the residual cash burn of a footwear wind-down, and the inevitable severance to the people whose job was, until recently, sneakers — is something like $50–70M.

For context on what $50–70M does in the GPU compute business in 2026:

CoreWeave, the marginal credible neocloud, has $5.13B of trailing revenue, $66.8B of contracted backlog, and is spending approximately $30B of capex in 2026. Nebius, the second-tier credible neocloud, trades at a $36.5B market cap on roughly $1B of revenue. Applied Digital is at $8.8B on about $340M. The hyperscalers — AWS, Azure, Google, Meta — will collectively spend something north of $600B on AI infrastructure this calendar year.

NewBird AI's $50–70M of deployable capital is approximately 0.2% of CoreWeave's annual capex and approximately 0.01% of hyperscaler combined spend. At retail H100 pricing — about $25,000 to $40,000 per GPU all-in once you've paid for the server, the rack, the colocation, the networking, and the small army of people who configure those things — $50M will purchase, and I want to be precise here, somewhere between 1,200 and 2,000 GPUs. CoreWeave has more than 250,000.

> **[CHART 3 — "NewBird's $128M is 0.4% of what it takes to compete"]**
> *Horizontal log-scale bar chart. Six rows: Hyperscaler combined ($600B), CoreWeave 2026 capex ($14.9B), Applied Digital ($7B), Lambda Labs ($2.3B), minimum-viable-neocloud band ($500M–$1B, dashed outline), NewBird AI ($128M, in bear-red `#B23A48`). All competitor bars in muted grey-context (`#8A8A8A`). Direct label on NewBird bar: "$128M — 0.4% of CoreWeave alone." Footnote: "Log scale: each gridline = 10×". 700×525px (4:3). Built in Observable Plot (`barX` with `xScale: { type: "log" }`). Time-to-insight: 5 seconds.*

The bull rejoinder to this is that public listing is itself a capital-raising asset, and that NewBird, having now established a stock price at AI multiples, can do a follow-on equity raise at $11–13 within thirty days and turn the spike into $300–500M of real cash. This is correct as a structural matter. It is also exactly what management has not announced. The plumbing already exists: [Allbirds filed an S-3 shelf in June 2025](https://ir.allbirds.com/news-releases/news-release-details/allbirds-announces-financing-strategy-support-growth-plans) for up to $100M of securities, along with a $50M ATM program with TD Cowen. As of December 31, 2025, the company had used the ATM exactly once, selling 386,289 shares for $1.7M — in other words, almost not at all. On the day the stock opened AI-priced, the company had a shelf, a sales agreement, and a book-running bank; it did not do a follow-on. It did a $50M convertible placed by Chardan to an undisclosed investor. The revealed preference is loud.

That is itself a piece of information about the market's true belief in this story.

## The mechanism, briefly

The reason convertible terms determine the outcome is mechanical, and it is worth sketching the mechanics, because the mechanics are not intuitive even to people who follow markets.

A "fixed-price" convertible specifies the conversion ratio in the original document. You lend the company $50M at, say, $16.99/share, and at maturity (or at some trigger) the lender receives roughly 2.9M shares regardless of where the stock trades. The lender's downside is the lender's problem. Existing equity holders know exactly what they are diluted by.

A "floating-rate" or "variable-rate" or "death-spiral" convertible — the family of structures that has grown in micro-cap markets over the last decade — specifies the conversion price as a percentage discount to a reference price observed *after* issuance. In NewBird's case, as disclosed in the PREM14A, the formula is 93% of the *lowest* daily VWAP in the 10 trading days preceding conversion (85% and a 15-day window if an event of default is running, plus a 25% premium on the conversion amount). Now the conversion math depends on where the stock trades when the lender chooses to convert, and the lender chooses to convert when it is profitable for the lender to convert, which is when the stock has fallen, which they may help along by hedging short.

The [math, holding the convertible at $50M](https://github.com/lyndonkl/allbirdsanalysis/blob/main/reports/v2/04-special-situations-distressed.md) and using the PREM14A's 93% / 10-day-lowest-VWAP formula as the base case:

| Stock price at conversion | Conversion price (93% of VWAP) | Shares issued | Resulting dilution |
|---|---|---|---|
| $16.99 | $15.80 | 3.16M | 39% |
| $5.00 | $4.65 | 10.75M | 132% |
| $1.50 | $1.395 | 35.8M | 439% |

Those are the *benign* numbers. If an event of default is running at the time of conversion, the formula shifts to 85% of the 15-day lowest VWAP *and* a 25% premium is layered on top of the principal amount being converted. At a $1.50 stock price with default in force, the conversion price becomes $1.275 and the face being converted becomes $62.5M, which produces roughly **49.0M new shares — about 600% dilution.** Existing shareholders end up owning roughly one-seventh of the company they used to own all of, in exchange for which the company received $50M (net of the 5% OID, $47.5M), much of which it has already spent. This is the structure that, when you read about a micro-cap doing a 1-for-60 reverse split a few months after a financing announcement, tells you what happened. (See Bit Origin.)

> **[CHART 4 — "Every $1 the stock falls, the dilution gets worse"]**
> *Dual-encoded curve. X-axis (reverse scale): stock price post-conversion-trigger, $17 → $1. Y-axis left: new shares issued (millions), 0–50. Y-axis right: dilution % of existing 8.17M shares outstanding, 0–600%. Single curve in bear-red, opacity ramping up as the curve climbs (visual reinforcement of the worsening outcome). Three highlighted dots at $16.99, $5.00, $1.50 with annotations. Top-right caveat box: "Base case: 93% of 10-day lowest VWAP (PREM14A normal path). Default case: 85% of 15-day lowest VWAP + 25% principal premium. No conversion floor." 700×394px (16:9). Built in D3 (dual-axis with synchronized annotations needs imperative control). Why a curve not three bars: a curve says "this is a continuous risk that gets worse as price falls." Three bars say "here are three discrete scenarios."*

The [April 15 GlobeNewswire press release](https://www.globenewswire.com/news-release/2026/04/15/3274362/0/en/Allbirds-Inc-Executes-50M-Convertible-Financing-Facility-Agreement-Announces-Expansion-into-AI-Compute-Infrastructure.html) did not disclose the conversion mechanics. The PREM14A, filed the same day, does — 93% of the 10-day lowest VWAP, 85% in default, 5% OID, 25% premium on conversion in default, two-year maturity, the full canon. The press release redacted the buyer as "an institutional investor." The [PREM14A does not](https://www.sec.gov/Archives/edgar/data/1653909/000119312526155866/d39753dprem14a.htm): the counterparty is **AXNY Group**, at 1400 Broadway in Manhattan, represented by Steve Velasquez and counseled by The Dallal Firm PC at 40 Wall Street. The redaction was for the press release, not for the SEC filing. The terms matter more than the name, and both are now on file.

So: the proxy is the company.

## What the bulls are actually right about

I want to be honest about the bull case, because the bull case is not stupid. It is, in fact, internally consistent. It runs roughly as follows:

The 582% spike is a finite, evaporating asset. For approximately thirty days, NewBird AI has access to public equity markets at AI-infrastructure multiples — not because it has AI infrastructure, but because the narrative has not yet been falsified. If management uses this window to (a) immediately file an S-3 shelf, (b) raise $300–500M in a follow-on at $11–13, and (c) sign even one anchor enterprise GPU contract at $3.50+/hour to validate the unit economics, then the company has, for the first time in its life, a credible shot at being a real business. Capital is the prerequisite. The narrative window is the financing instrument that purchases the capital. The capital is the financing instrument that purchases the business.

This is the Hail Mary, but it is a Hail Mary that has, occasionally, in the history of capital markets, been completed. CoreWeave itself was a crypto miner that pivoted to AI. Hut 8 did the same thing. The pivot pattern is not, in itself, evidence of failure.

What is evidence of failure, or at least evidence of management not optimizing for existing shareholders, is what management actually did with the spike.

What management did was: announce a $50M convertible. Not a $500M follow-on. Not a strategic anchor PIPE with Nvidia or AMD or a hyperscaler attached for credibility. A $50M convertible, placed by Chardan, on terms the press release redacted and the proxy did not, to AXNY Group — a private investor operating out of a Midtown Manhattan address that does not, as of this writing, run a single public GPU cluster.

You can reverse-engineer management's view of the company from that decision. The $50M convertible is the financing you do when the larger, cleaner, less-dilutive financings are not available to you. Management knows what is available to them better than anyone else does. The structure of the financing is management's revealed estimate of the credibility of their own pivot.

## The unit economics, in case you were wondering

If, somehow, the capital question gets solved, the next question is whether the GPU rental business is viable at the rates NewBird could plausibly charge. This is a question with a knowable answer, and the answer is "barely, and only at the high end."

> **[CHART 5 — "GPU rentals collapsed from $8 to $2.50 per hour"]**
> *Time-series area chart with shaded viability zones. X-axis: quarterly Q1 2024 → Q1 2026 (with dashed projection to Q4 2026). Y-axis: H100 rental rate ($/hr), 0–10. Price line in neutral charcoal. Three horizontal bands: $2.00–$3.00 in red (`#B23A48`, "DESTROYS VALUE"), $3.00–$3.50 in amber (`#D9A441`, "MARGINAL"), $3.50–$5.00 in green (`#3A8E5C`, "VIABLE — enterprise contracts only"). Annotations at the Q1 2024 peak ($8) and Q2 2025 trough ($2.40, -70%). Overlay text on amber/green boundary: "$3.50/hr is THE thesis line — without it, every NPV scenario fails." 700×394px. Built in matplotlib or Observable Plot.*

A [modeled NPV](https://github.com/lyndonkl/allbirdsanalysis/blob/main/reports/v2/05-capital-allocation-aggressive.md) of a 1,000-GPU H100 deployment at 10.5% WACC, varying the rental rate and utilization:

- $2.00/hour at 70% utilization (which is roughly where spot-market H100 rentals cleared in late 2025): NPV of negative $37M. Reject.
- $2.50/hour at 80%: NPV of negative $18M. Reject.
- $3.00/hour at 85%: NPV of negative $8M. Reject.
- $3.50/hour at 90% (which requires enterprise contracts, not spot): NPV of positive $3M. Marginal.
- $4.00/hour at 90%: NPV of positive $18M.
- $5.00/hour at 92% (B200-tier dedicated): NPV of positive $48M.

> **[CHART 6 — "Unit economics live or die at $3.50/hour"]** *(THE HERO CHART)*
> *Diverging-zero waterfall. Six horizontal bars, one per rental-rate scenario. NPV on x-axis from -$45M to +$55M. Negative bars in bear-red, positive in bull-green, the marginal $3.50 row in amber with a `#FFF4D6` highlight wash behind it. Zero line at `#1A1A1A`, 1.5px stroke. Two left-side context brackets: "TODAY'S MARKET" (covers bottom 3 rows) in bear-red small caps; "ENTERPRISE CONTRACTS REQUIRED" (covers top 3 rows) in `#5C5C5C`. Right-side callout on $3.50 row: "↑ The entire investment thesis lives here." 700×460px. Built in D3. Full production spec in implementation appendix. Time-to-insight: 4 seconds — zero-crossing is instant.*

The entire thesis, from a unit-economics standpoint, lives in the gap between $3.00 and $3.50 per GPU-hour. To get there you need signed enterprise contracts, which is to say you need the kind of customer who does not currently exist in any visible way for NewBird AI, signed before the capital is deployed, because deploying capital into spot-market GPU rental at sub-$3 hourly rates is a capital-destruction machine.

This is not a hypothetical concern. It is the same concern that bears on every neocloud from CoreWeave on down, except the others have customers.

## The thirty-day test

Here is what I think you should watch.

The proxy is filed. The remaining question about timing is narrower than it was on the morning of April 15: does management use the existing S-3 shelf — and the thirty-day window of AI-priced equity — to take down a follow-on before the May 18 vote closes the convertible? If yes, management is signaling that they believe the narrative is durable enough to support a clean financing, and that they prioritize existing shareholders over the convertible holder. This is what bull-case management does.

If no — if May 18 arrives with the convertible intact and no follow-on having been taken down off the shelf that has been sitting there since last June — then the question is no longer whether management had the option of a cleaner financing. They had the option. They did not take it. Why they did not take it is the investment question.

Separately, watch for a customer or partnership announcement on the AI side — an enterprise GPU contract, a Nvidia or AMD relationship, a colocation agreement with a real data center operator. If one lands in the next sixty days, the bull case has actual evidence and the prior shifts. If it does not, then on May 18 the company is exactly what it was on April 14, but with $50M of new convertible obligations and a different name.

> **[CHART 7 — "May 18 is the bifurcation point"]**
> *Branching vertical timeline. Backbone in neutral grey; Apr 15 large filled marker (pivot, +582%); Apr 15 → May 18 highlighted "secondary offering window" band; May 18 amber decision diamond ("PROXY FILING REVEALS CONVERSION TERMS"); two divergent dashed paths after the diamond — bull-green ("If benign: bull-case path, 4 of 10 agents") leading to Q3 2026 first GPU deployment, Q4 2026 first revenue, 2027 re-rating; bear-red ("If toxic: bear-case path, 5 of 10 agents") leading to dilution begins → reverse split / delisting. "You are here" marker at April 15. 700×1244px (vertical 9:16, mobile-friendly). Built in D3 — geometry needs hand control.*

## The verdict, such as it is

A reasonable investor cannot have a fully confident view on NewBird AI before the definitive proxy lands and the facility agreement exhibits are final — but the preliminary proxy has already given us the material economics: 93% of the 10-day lowest VWAP in normal course, 85% of the 15-day lowest VWAP plus a 25% principal premium in default, a 5% OID at issuance, a two-year maturity, and AXNY Group as the buyer. The residual uncertainty is about the definitional edges (what counts as an "event of default," for example), not about the shape of the instrument. The shape of the instrument is a death spiral.

What a reasonable investor can have is a prior, and the prior is informed by the base rate (Long Blockchain, Axe Compute, Bit Origin, the broader Chardan placement history), the capital adequacy gap ([CoreWeave at $30B of capex versus NewBird at $89M](https://github.com/lyndonkl/allbirdsanalysis/blob/main/reports/v2/02-company-analyst-bear.md) total), the choice of financing instrument (convertible rather than follow-on off a shelf that was already on file), and the structural fact that 35x daily turnover on a stock with 18% short interest is not what organic enterprise demand looks like. It is what a coordinated retail-momentum-plus-short-squeeze looks like.

> **[CHART 8 — "10 analysts, 5 say sell, 4 say buy, 1 says hold"]**
> *Strip plot (1D scatter) on a $0–$125 horizontal axis. Ten dots representing the 10-agent valuation outputs, color-coded: 5 bear-red dots ($3.30, $3.30, $3.50, $4.77, $8.30), 1 neutral-grey dot ($12.78), 4 bull-green dots ($38.38, $50, $80, $125). Vertical dashed line at current price $16.99. Subtle shaded band beneath the bear cluster (showing tightness); thin outline beneath the bull cluster (showing 3.3× spread). Bracket annotations: "Bear consensus: $3-8 (5 of 10 agents, tight)" / "Bull range: $38-125 (4 of 10 agents, 3.3× dispersion)". Footnote: "Average of bull and bear case is meaningless — the disagreement is the point." 700×394px. Built in Observable Plot. Why a strip plot, not a violin: a violin smooths the data into apparent symmetry. The disagreement IS asymmetric. The chart should show that.*

The prior, on those facts — [5 bears at $3–8 and 4 bulls at $38–125 across the 10-agent dispersion](https://github.com/lyndonkl/allbirdsanalysis/blob/main/reports/v2/00-synthesis.md) — is bearish. Bearish enough that the right trade for most readers is to read the exhibits of the proxy that is already on file, not to be in the stock while they do.

The single piece of paper that resolves this trade is on EDGAR, in preliminary form, with the key exhibit describing a floating-price alternate at 93% of the 10-day lowest VWAP (normal) or 85% of the 15-day lowest VWAP (default), plus a 5% original issue discount and a 25% premium on conversion in default. The definitive proxy finalizes the mechanic ahead of the May 18 vote, but the numbers are already in the preliminary filing. This is not a story about an AI company. It is a story about whether a small company in Portland is about to be financially eaten by AXNY Group, a buyer at a Manhattan address, wearing the costume of a strategic partner.

The shoes, in retrospect, were the reasonable business.

---

## Chart Implementation Brief

The eight charts in this piece were specified by the cognitive design architect on the project. They share a unified visual theme described below. Each chart is built to be embedded as static SVG (preferred) or 2× PNG (fallback for email rendering). All numbers come from the underlying 10-agent valuation reports in `/reports/v2/` of the project repository.

### Visual Theme

**Color palette (role-named, hex codes):**

| Role | Hex | Use |
|------|-----|-----|
| Background | `#FBFAF7` | Page/canvas (warm off-white, not pure white) |
| Ink (primary) | `#1A1A1A` | Headlines, axes |
| Ink-secondary | `#5C5C5C` | Annotations, captions |
| Ink-tertiary | `#9E9E9E` | Gridlines, tick marks |
| Brand accent (deep teal) | `#0E7C7B` | Single-series highlights, brand mark |
| Bull (green) | `#3A8E5C` | Positive NPV, bull-case dots |
| Bear (crimson) | `#B23A48` | Negative NPV, bear-case dots, dilution curve |
| Marginal (amber) | `#D9A441` | $3.50 threshold, May 18 node |
| Neutral grey-context | `#8A8A8A` | Comparison bars (the giants) |
| Highlight wash | `#FFF4D6` | "You are here" backgrounds |

The brand accent `#0E7C7B` is intentionally distant from Nvidia green and Anthropic orange. It also pulls double duty: it whispers "natural / sustainable" — the Allbirds heritage, slightly subverted.

**Typography scale:**

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| Chart title (states the conclusion) | 22px | 600 | `#1A1A1A` |
| Chart subtitle | 14px | 400 | `#5C5C5C` |
| Annotation primary | 13px | 500 | `#1A1A1A` |
| Annotation secondary | 11px | 400 | `#5C5C5C` |
| Direct data label on bar/dot | 12px | 600 (tabular) | matches series |
| Caption / source | 10px | 400 | `#9E9E9E` |
| Small caps (section markers) | 10px | 600, 0.08em uppercase | `#5C5C5C` |

Display/numbers use Söhne Mono or JetBrains Mono with tabular lining figures (mandatory). Editorial text uses GT America, Söhne, or Inter as fallback. All numbers use tabular lining figures. All percentages use a hairspace before `%`. All dollar amounts use the `$` glyph, never `USD`.

### Chart Spec Summary

| # | Chart | Type | Tool | Aspect | Time-to-insight |
|---|-------|------|------|--------|-----------------|
| 1 | Spike intraday | Line + volume strip | Observable Plot | 16:9 (700×394) | 3s |
| 2 | Chardan track record | Small multiples | D3 or Figma | 3:4 (700×933) | 10s |
| 3 | Capital adequacy gap | Log-scale horizontal bars | Observable Plot | 4:3 (700×525) | 5s |
| 4 | Death-spiral curve | Dual-axis curve | D3 | 16:9 (700×394) | 7s |
| 5 | GPU price collapse | Line + viability bands | matplotlib / Plot | 16:9 (700×394) | 5s |
| 6 | NPV waterfall (HERO) | Diverging-zero bars | D3 | 4:3 (700×460) | 4s |
| 7 | May 18 bifurcation | Branching vertical timeline | D3 | 9:16 (700×1244) | 8s |
| 8 | 10-agent dispersion | Strip plot (asymmetric) | Observable Plot | 16:9 (700×394) | 6s |

### Production Spec for the Hero Chart (Chart 6)

A complete D3 specification for the NPV waterfall — the chart that operationalizes the entire bull/bear debate — is in the scrollytelling implementation plan at `/scrollytelling/implementation-plan.md`, Section 9 (Production Sample). Reuse it verbatim for the static Substack export.

### Asymmetry Discipline

Charts 6 and 8 must visually preserve the 5-bear / 4-bull / 1-hold split. Do not let any well-meaning editor "balance the layout." The disagreement is asymmetric — the bears cluster tightly at low values; the bulls spread widely at high values. The chart system tells the truth about that. Symmetric design choices (violin plots, balanced color budgets) would lie about the data.

### Render and Delivery

- **Substack web post**: SVG, inline. Searchable text, infinite zoom, keyboard accessible.
- **Substack email**: PNG, 2× resolution (1400×… for 700-wide charts). Substack email strips JS. Ship one PNG per chart.
- **Social previews**: PNG of Chart 6 (the NPV waterfall) is the most shareable single image. Use it for OG/Twitter card.
- **Alt text**: Every chart has a written alt text (provided in the cognitive design spec). Each is a complete sentence stating the chart's conclusion, not its topic.

---

*Source material for every numerical claim in this piece is in the 10-agent dialectical valuation analysis at [github.com/lyndonkl/allbirdsanalysis](https://github.com/lyndonkl/allbirdsanalysis), specifically the V2 reports. The companion interactive scrollytelling piece, "The Last Trade of Allbirds," is published separately.*
