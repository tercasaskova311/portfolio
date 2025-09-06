---
layout: single
title: "Training vs. Sleep in Professional Cycling"
date: 2024-08-01
tags: [cycling, sleep, WHOOP, Garmin, pandas, matplotlib, SQL, data-cleaning, sports-science]
header:
  teaser: /assets/images/Scatterplot.png
classes: wide
toc: true
toc_sticky: true
---

**Repo:** [tercasaskova311/training-vs-sleep](https://github.com/tercasaskova311/training-vs-sleep){: .btn .btn--primary target="_blank" }

I used to race professionally, which meant living at the edge of what my body could recover from. That’s why this question keeps interesting me :

> **How tightly does sleep relate to next-day training load for a World Cup MTB rider?**

If sleep *truly* supports training, the training upward after good sleep and sags after poor sleep. 

---

## Data & pipeline (what I joined)
- **WHOOP:** sleep performance (% of need), recovery, strain, SWS (deep sleep).
- **Garmin:** ride metrics and **TSS** (Training Stress Score).
- **ETL:** Excel → SQL standardization → Python (pandas/matplotlib) for analysis and plots.

**Key terms**
- **TSS:** combined stress from duration × intensity (via NP, IF).  
- **Sleep Performance:** % of sleep obtained vs. estimated need.  
- **SWS (Deep):** restorative stage tied to physical recovery.

---
- **Sleep quantity & quality**  
  Sleep duration ↔︎ Sleep Performance **r ≈ 0.92**; Sleep ↔︎ Deep (SWS) **r ≈ 0.74**; Sleep Performance ↔︎ SWS **r ≈ 0.72**.
- **TSS shows weak links to sleep metrics.**  
  In this sample, **TSS** has **very weak** correlations with sleep duration, Sleep Performance, and SWS.
- **Practical read:** Sleep metrics track each other well (good), but **don’t expect a simple “slept more → trained harder” relation** day-to-day.

---

## What the scatter actually says
Picture a scatter of **Sleep (x)** vs **TSS (y)**. If points form a clean rising stripe, sleep is a strong next-day driver. In my data, the stripe just isn’t there—**TSS looks almost orthogonal to sleep**.  
However, **sleep metrics agree with each other**: more total sleep → higher Sleep Performance → more SWS. That’s consistent with physiology and makes the signals trustworthy.

> **Takeaway:** Sleep is coherent; TSS is influenced by **plan, terrain, goals, and race calendar**, not just last night’s hours.

---

## Real-life coaching cues (actionable)
- **Green-light intensity after a *sleep window*, not a single night.**  
  Use a **3–7 day average** of Sleep Performance or SWS as your “go/no-go” for VO₂/neuromuscular days.
- **Let sleep *gate* progression, not *dictate* daily TSS.**  
  Keep the plan; adjust set count or recovery between sets if the rolling sleep window is low.
- **Watch sleep debt.**  
  If 7-day Sleep Performance < **~85%**, expect stubborn legs and flatter power targets—even if yesterday’s sleep looked fine.

---

## Methods (how I tested the hunch)
- **Correlations:** Pairwise Pearson among Sleep, Sleep Performance, SWS, TSS.  
- **Visuals:** Scatterplots with LOWESS lines; correlation heatmap.  
- **Sanity checks:** outliers, missing days, and device export quirks (WHOOP vs Garmin timestamps).

> Why this sequence? First see the geometry (scatter), then the **summary statistic** (r). The geometry guards against being fooled by a single number.

---

## What this **doesn’t** claim
- **No causality.** Training plans, blocks, and races set TSS targets; athletes don’t pick intervals *because* they slept 7h vs 8h.  
- **Single-athlete scope.** Effects are often **athlete-specific**; don’t generalize across the peloton without replication.  
- **Acute vs chronic.** One-night sleep blips ≠ chronic sleep patterns. The body responds to **patterns**.

---

## Conclusion
**Sleep metrics cohere; TSS doesn’t cleanly track them day-to-day.** For athletes and coaches, that’s good news: you can trust your sleep dashboard for **readiness trends**, but keep prescribing training from the **plan**, only trimming or swapping sessions when **rolling sleep** flags accumulating debt.

*Next step I’m exploring:* does **rolling SWS** predict **session quality** (e.g., % of target power achieved) better than it predicts TSS? That’s closer to what athletes actually care about.

