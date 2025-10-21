---
title: "Reddit & Conflict: Israel–Palestine Discourse Analysis"
collection: portfolio
permalink: /portfolio/reddit-conflict/
date: 2025-06-30
excerpt: "Temporal alignment of social media discourse with geopolitical events using cross-correlation analysis, LDA topic modeling, and time-series methods to quantify lagged responses in online public attention."
repo: https://github.com/tercasaskova311/Israel-Palestine-CSS-project
tags: [NLP, Computational Social Science, Topic Modeling, Time Series Analysis, Python]
header:
  teaser: /images/portfolio/reddit-conflict/reddit_top5_LDA.png
classes: wide
---

[View code on GitHub]({{ page.repo }}){: .btn .btn--primary}  
[View visualizations]({{ page.repo }}/tree/main/plots){: .btn .btn--light-outline}

This project investigates the temporal relationship between real-world conflict events and online discourse dynamics using cross-correlation analysis and unsupervised topic modeling. The central research question: **Do social media discussions respond to geopolitical violence in real-time?**

We integrated two data sources—**Reddit comment streams** (unstructured social data) and **ACLED conflict events** (structured geopolitical data)—to quantify how online attention patterns correlate with offline violence in Gaza and the West Bank. The analysis revealed a **15-day lag** in peak discourse volume relative to conflict intensity, with evidence of selective amplification based on event severity.

---

## Problem Formulation & Data Integration Challenges

### Data Sources

**Reddit corpus**: 2.1GB dataset spanning March–June 2025, containing approximately 1.2M comments from conflict-related subreddits. Raw text exhibits high variability: colloquial language, sarcasm, emotionally charged rhetoric, and domain-specific terminology.

**ACLED event database**: Structured records of 5,000+ conflict incidents with temporal, geographic, and categorical metadata (event type, fatalities, civilian targeting). Events include battles, explosions, targeted killings, and violence against civilians.

### Core Challenge: Cross-Domain Alignment

The primary challenge was **aligning asynchronous, semantically distinct data streams** for temporal comparison:

1. **Semantic extraction from noisy text**: Reddit comments required aggressive preprocessing to extract meaningful signal. Standard NLP pipelines underperformed due to domain-specific jargon, neologisms, and syntactic irregularities.

2. **Event granularity mismatch**: ACLED provides incident-level records with fine-grained categorization (20+ event subtypes). Reddit discourse operates at thematic levels that don't map cleanly to ACLED's taxonomy. We needed dimensionality reduction on both sides.

3. **Temporal aggregation**: Reddit exhibits strong day-of-week effects and time-of-day biases. ACLED events cluster around military operations schedules. Naive daily aggregation produced non-stationary time series unsuitable for correlation analysis.

---

## Methodology

### Text Preprocessing Pipeline

We implemented a multi-stage cleaning and normalization pipeline:

**Regex-based cleaning**:
- URL removal via pattern matching
- Punctuation stripping
- Numeric token removal

**spaCy-based linguistic normalization**:
- Lemmatization to preserve semantic fidelity (e.g., "bombing" to "bomb")
- Stopword removal with length filtering (tokens > 2 characters)
- Part-of-speech tagging for linguistic features

**Key decisions**:
- **Lemmatization over stemming**: Preserved semantic fidelity rather than aggressive truncation.
- **Sentence boundary detection**: Retained via spaCy's sentencizer to preserve local context for topic modeling.
- **Vectorization constraints**: CountVectorizer with max_df=0.9, min_df=10 to filter ultra-frequent generic terms and ultra-rare noise tokens.

**Computational optimization**: Processed in 1000-row chunks with batch spaCy inference (batch_size=32) to avoid memory overflow on 2.1GB corpus.

### ACLED Event Categorization

ACLED's fine-grained event taxonomy was collapsed into two high-level categories aligned with discourse relevance:

- **Combat**: Battles + Explosions/Remote violence (military-to-military engagements)
- **Civilian Harm**: Violence against civilians (asymmetric targeting, likely to generate moral outrage)

This reduction was theoretically motivated: prior research in media studies suggests public attention gravitates toward civilian casualties over military operations (Galtung & Ruge's news value theory).

### Temporal Alignment & Smoothing

Both datasets were aggregated to **daily granularity** and smoothed using a **7-day centered rolling window**.

**Rationale**:
- Removes high-frequency noise (weekend effects, single-day spikes)
- Preserves medium-term trends (weekly discourse cycles)
- Centers the window to avoid phase shifts in correlation analysis

### Cross-Correlation Analysis

To detect temporal lag, we computed the cross-correlation function between ACLED event counts and Reddit post volumes. Both series were z-score normalized prior to correlation to ensure scale invariance.

**Implementation approach**:
- Standardized both time series (mean=0, standard deviation=1)
- Computed correlation at all possible time offsets
- Identified lag corresponding to maximum correlation

**Result**: Maximum correlation of **r=0.56 at lag +15 days**, indicating Reddit discourse systematically trails conflict events by approximately two weeks.

---

## Topic Modeling: Latent Dirichlet Allocation

To characterize thematic structure, we applied **LDA** to the Reddit corpus using a bag-of-words representation.

**Model configuration**:
- n_components=5 (determined via coherence score evaluation)
- max_iter=5 (sufficient for convergence on this corpus size)
- Document-term matrix generated via CountVectorizer with preprocessed text

**Extracted topics** (top-10 terms per topic):

| Topic | Dominant Terms | Interpretation |
|-------|---------------|----------------|
| 0 | airstrike, IDF, Gaza, bomb, military | Military Operations |
| 1 | hospital, aid, civilians, killed, UNRWA | Humanitarian Crisis |
| 2 | Netanyahu, Iran, Trump, Biden, blame | Geopolitical Attribution |
| 3 | protest, march, campus, solidarity | Activism & Mobilization |
| 4 | media, bias, coverage, propaganda | Meta-Discourse on Framing |

**Temporal topic dynamics**: We computed daily topic distributions by aggregating per-document topic assignments, then overlaid these on the ACLED fatality timeline to identify event-discourse associations.

### Key Finding: Selective Amplification

Topic intensity correlated with **event severity** (measured by fatalities), not event frequency:

- High-fatality events (>50 deaths) generated **10x more discussion** than low-level violence
- **June 17 airstrike on aid convoy** (85 fatalities) produced massive spike in Topic 1 (Humanitarian Crisis)
- Sustained low-intensity clashes (<10 fatalities/day) generated minimal Reddit activity

This suggests discourse operates via a **threshold activation function**: events must exceed a salience threshold to penetrate public attention.

---

## Technical Implementation & Engineering Decisions

### Why LDA Over Transformer-Based Models?

We evaluated both LDA and BERTopic:

| Method | Pros | Cons | Decision Rationale |
|--------|------|------|-------------------|
| LDA | Fast, interpretable, provides topic distributions | Bag-of-words assumption, no semantic embeddings | Chosen for exploratory analysis; sufficient for thematic clustering |
| BERTopic | Semantic embeddings, better coherence | Computationally expensive, less transparent | Viable for future work with GPU resources |

LDA was sufficient because we needed **coarse thematic categories**, not fine-grained semantic distinctions. BERTopic would add value if distinguishing between subtopics (e.g., "hospital bombing" vs. "hospital blockade").

### Memory & Computational Optimization

**Challenge**: 2.1GB corpus exceeded single-pass memory limits.

**Solution**: Streaming pipeline with chunked processing using pandas chunksize parameter. Each chunk was processed independently and appended to output file incrementally.

**Alternative considered**: Dask for distributed processing. Not adopted due to overhead for single-machine workload and lack of GPU parallelization needs.

### Cross-Correlation vs. Granger Causality

**Granger causality** would provide directional inference (does X cause Y?), but requires:
- Stationarity (violated by trend components in both series)
- Linear VAR assumptions (unlikely given nonlinear discourse dynamics)

**Cross-correlation** is more robust for:
- Exploratory lag detection
- Non-stationary data
- Pattern similarity over causal inference

Future work could apply **Transfer Entropy** for model-free causal detection.

---

## Results & Quantitative Findings

| Metric | Value | Interpretation |
|--------|-------|----------------|
| **Peak Cross-Correlation** | r=0.56 at lag +15 days | Reddit lags conflict events by approximately 2 weeks |
| **Topic 1 (Humanitarian)** | 28% of total discourse | Dominant theme during high-fatality events |
| **Selective Attention Ratio** | 10:1 (high vs. low fatality) | Public attention is event-severity dependent |
| **Corpus Size** | 1.2M comments, 2.1GB | Processed in <2 hours with chunk-based pipeline |

### Validation: Annotated Event Mapping

We manually validated the top 5 deadliest events against discourse spikes:

| Date | Event Description | Fatalities | Reddit Spike (7-day avg) |
|------|------------------|-----------|-------------------------|
| June 17 | Airstrike on aid convoy | 85 | +320% vs. baseline |
| May 18 | Sustained urban combat | 62 | +180% vs. baseline |
| March 18 | Hospital complex strike | 51 | +250% vs. baseline |

All high-fatality events produced discourse spikes within the 15±5 day window, confirming lag consistency.

---

## Limitations & Future Directions

**Sentiment analysis integration**: Current analysis focuses on volume and topics. Incorporating polarity and emotion detection (e.g., via VADER or transformer-based sentiment models) would capture tonal shifts beyond thematic changes.

**Event causality modeling**: Cross-correlation establishes temporal association, not causation. Transfer entropy or dynamic Bayesian networks could provide causal inference.

**Longitudinal extension**: Analysis covers 4 months. Extending to multi-year datasets would test lag stability across different conflict phases (escalation vs. de-escalation).

**Multilingual expansion**: Current corpus is English-only. Incorporating Arabic and Hebrew discourse from regional platforms would provide comparative analysis of information asymmetries.

**Automated event categorization**: Manual ACLED categorization could be replaced with supervised classification using event embeddings (e.g., BERT fine-tuned on ACLED descriptions).

---

## Technical Stack

**Core Libraries**: pandas, NumPy, spaCy, scikit-learn , gensim , scipy 
**NLP Pipeline**: Regex normalization → spaCy lemmatization → CountVectorizer → LDA  
**Statistical Methods**: Cross-correlation, rolling window smoothing, z-score normalization  
**Visualization**: Matplotlib  with dual-axis time-series plots and lag correlation graphs  
**Data Sources**: Reddit, ACLED  
**Compute Environment**: Single-node processing, 16GB RAM, chunked I/O for memory efficiency  

---

## Implications for Computational Social Science

This work demonstrates that **social media discourse operates on delayed, selective attention mechanisms** when responding to geopolitical events. The 15-day lag suggests information diffusion through news cycles, secondary commentary, and thematic framing processes rather than direct real-time observation.

The selective amplification finding aligns with **news value theory**: events must be exceptional (high fatality, civilian targeting) to penetrate the attention economy. Low-intensity violence—despite cumulative humanitarian impact—fails to generate sustained discourse.

From a methodological standpoint, the project highlights the importance of **temporal alignment techniques** in cross-domain analysis. Naive correlation without smoothing and lag detection would have produced spurious null results.

---

📂 [Full implementation and reproducible notebooks]({{ page.repo }})  
📊 [Visualization suite and data artifacts]({{ page.repo }}/tree/main/plots)

**Author**: Tereza Sásková  
**Institution**: University of Trento, Computational Social Science (Spring 2025)