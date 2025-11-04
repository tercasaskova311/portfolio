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

I grew up in a family where weekends meant race vans, muddy bikes, and recovery shakes instead of easy rest days. I raced mountain bikes myself for years — and even though I don’t chase racing anymore, I still chase questions about how training stress and recovery actually fit together.

This small project was born from that curiosity — and from data generously shared by my brother, who’s still racing on the World Cup circuit. He tracks everything: WHOOP recovery, Garmin training stress, hours of sleep, even his deep sleep stages. I wanted to see if those streams of numbers could show a simple truth:

## Does better sleep actually mean better training?
It sounds obvious, but data doesn’t always tell the same story our intuition does.

## The data and the pipeline
I combined two data sources:
WHOOP: Sleep performance (% of need), recovery score, strain, and deep sleep (SWS).
Garmin: Ride data with TSS (Training Stress Score).
ETL: Excel exports → SQL standardization → Python (pandas & matplotlib) for analysis and visualization.

## Key terms
TSS: Training Stress Score — workload from ride duration × intensity.
Sleep Performance: % of actual sleep vs. what WHOOP says you needed.
SWS (Deep Sleep): The truly restorative phase of sleep that drives recovery.

## What I found
The sleep metrics:
Sleep duration ↔ Sleep Performance r ≈ 0.92
Sleep ↔ Deep Sleep (SWS) r ≈ 0.74
Sleep Performance ↔ SWS r ≈ 0.72
But when I compared them to TSS, the connection almost disappeared.
In this sample, training load barely budged with changes in sleep metrics.
In other words: more sleep didn’t mean a harder training day — at least not on a day-to-day level.

## The scatter that tells the story
Imagine a scatterplot of Sleep (x) vs TSS (y).
If sleep directly drove training load, you’d see an upward stripe.
But the points just float — no clear slope, no neat relationship.
Meanwhile, the sleep metrics themselves line up beautifully with each other, which suggests the sensors are reliable, even if the connection to performance is fuzzy.
Takeaway: Sleep tells you about readiness, but TSS is steered by the plan — the training block, race calendar, terrain, and goals — not just last night’s rest.

