---
title: "Reddit & Conflict: Israel–Palestine Discourse Analysis"
collection: portfolio
permalink: /portfolio/reddit-conflict/
date: 2025-06-30
excerpt: "Reddit comments joined with ACLED events to analyze public discourse around major geopolitical incidents."
repo: https://github.com/tercasaskova311/Israel-Palestine-CSS-project
tags: [NLP, Social Science, Python, Topic Modeling, Sentiment Analysis]
header:
  teaser: /images/portfolio/reddit-conflict/reddit_top5_LDA.png
---

**Category:** Computational Social Science  

This project analyzes how Reddit discourse responds to **real-world conflict events** in Gaza and the West Bank. By joining **Reddit discussions (online data)** with **ACLED conflict events (offline data)**, the study explores how public attention and narratives evolve during major geopolitical incidents.

[View code on GitHub]({{ page.repo }}){: .btn .btn--primary target="_blank" }

---

## Research Question
> To what extent does Reddit discourse — measured by volume, topics, and sentiment — align with verified real-world conflict events in Palestine?

---

## Data & Preprocessing

- **Reddit**: Comment dataset (Kaggle dump).  
- **ACLED**: Event-level dataset of verified conflict incidents.  

**Challenges solved:**
- **Noisy Reddit text**: normalized with regex cleaning, tokenization, and lemmatization (`spaCy`).  
- **Event heterogeneity**: ACLED data filtered to Gaza/West Bank and recoded into higher-level categories:  
  - `"Combat"` → Battles, Explosions/Remote violence  
  - `"Civilian Harm"` → Violence against civilians  
- **Temporal alignment**: datasets aggregated daily; smoothed with a **7-day rolling average** to reduce noise.  

---

## Methods

- **Time-series analysis**: Cross-correlation of Reddit vs. ACLED timelines → identified lag between online and offline activity.  
- **Topic modeling**: Latent Dirichlet Allocation (LDA) on Reddit comments to detect thematic clusters.  
- **Sentiment analysis**: polarity scoring to track shifts in tone across spikes.  
- **Event coding**: manual mapping of major spikes (airstrikes, protests, aid convoy attacks) to discourse changes.  

---

## Key Findings

- **Volume Lag**: Reddit comment activity trails conflict events by ~15 days  
  - Peak cross-correlation: `r = 0.56` at **lag +15**.  

- **Thematic Shifts**: Topics intensified after large-scale events:  
  - Military conflict (airstrikes, clashes).  
  - Humanitarian crises (e.g., June 17 aid convoy strike).  
  - Geopolitical blame (Iran, Trump, Netanyahu).  

- **Selective Engagement**: Public attention surges after **major fatality events**, but ignores lower-intensity conflicts.  

---

## Architecture / Workflow

- **Data Sources**: Reddit (Kaggle) + ACLED (CSV).  
- **Pipeline**: Python (pandas, spaCy, gensim, matplotlib).  
- **Steps**:  
  1. Ingest + preprocess text/events.  
  2. Align timelines (daily granularity).  
  3. Run rolling averages + cross-correlation.  
  4. Train LDA model → visualize top topics.  
  5. Sentiment analysis & spike annotation.  

---

## Skills Demonstrated

- **NLP for noisy social data**: regex, tokenization, lemmatization.  
- **Text Mining**: LDA topic modeling, sentiment analysis.  
- **Time-Series Analysis**: cross-correlation, lag detection.  
- **Data Integration**: aligning online discourse (Reddit) with offline events (ACLED).  
- **Visualization**: matplotlib plots of discourse vs. conflict spikes.  
- **Computational Social Science methods**: linking digital traces to geopolitical realities.  

---

📂 **Repo**: [Israel–Palestine Conflict & Reddit Discourse (CSS Project)]({{ page.repo }})
