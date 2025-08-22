---
layout: single
title: "Training vs. Sleep in Professional Cycling"
date: 2024-08-01
permalink: /posts/2025/08/training-vs-sleep/
tags: [cycling, sleep, WHOOP, Garmin, pandas, matplotlib, SQL, data-cleaning, sports-science]
excerpt: "Do better nights lead to better rides? Exploratory analysis combining WHOOP sleep metrics with Garmin training load for a World Cup MTB rider."
header:
  teaser: _posts/Scatterplot.png  
---

**Repo:** [tercasaskova311/training-vs-sleep](https://github.com/tercasaskova311/training-vs-sleep)

I linked **WHOOP** sleep metrics with **Garmin** training data for a World Cup MTB rider to study how sleep relates to training stress and session types. The pipeline: Excel → SQL standardization → Python analysis/plots.

---

## Why this matters 
Imagine each day as a point in a plane: **x = sleep quality**, **y = training load**. If sleep *truly* supports training, points drift upward after good sleep and sag after poor sleep; if not, the cloud looks random. The goal is to see whether the “field” has a consistent direction (signal) or just noise.

---

## Data sources
- **WHOOP**: sleep performance (% of need met), recovery, strain, SWS (deep sleep).
- **Garmin**: ride metrics and **TSS** (Training Stress Score).

**Key definitions**
- **TSS**: stress from duration × intensity (via NP, IF).
- **Sleep performance**: % of sleep obtained vs. need.
- **SWS / Deep sleep**: restorative stage helpful for physical recovery.

---

## Cleaning & standardization

### 1) Excel → CSV
### 2) SQL standardization

---


### Real-life takeaways
Plan high-intensity days after good sleep windows.
Use SWS trends to schedule recovery vs. overload microcycles.
Watch for sleep debt: rolling 7-day sleep_perf < 85% often aligns with lower power targets.

The correlation matrix and heatmap revealed key relationships among the sleep and training metrics:

Strong Positive Correlations:
Sleep and Sleep Performance % (0.918): Longer sleep duration is associated with better sleep performance.
Sleep and Deep (SWS) duration (0.741): Longer sleep duration tends to include more deep sleep.
Moderate Positive Correlations:
Sleep Performance % and Deep (SWS) duration (0.721): Higher sleep performance is linked with more deep sleep.
Weak or No Correlations:
TSS and other metrics: Training Stress Score (TSS) has very weak correlations with sleep duration, sleep performance, and deep sleep duration, indicating that TSS does not significantly impact these sleep metrics.

## Conclusion

The data analysis shows that:

Longer sleep duration positively impacts sleep performance and deep sleep duration.
Training Stress Score (TSS) does not significantly correlate with sleep metrics.