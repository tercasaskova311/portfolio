---
title: "Podcast Recommendation Platform"
collection: portfolio
permalink: /portfolio/podcast-platform/
date: 2025-09-20
excerpt: "Building a hybrid recommendation system that combines user events (behavior, actions) with podcast transcript similarities."
repo: https://github.com/tercasaskova311/podcast-recommendation-platform
tags: [Spark, Delta Lake, MongoDB, Recommender Systems, Airflow, NLP, Kafka]
header:
  teaser: /images/dashboard.png
classes: wide
---

[View code on GitHub]({{ page.repo }}){: .btn .btn--primary target="_blank" }

---

## 🎧 Recommendation System for Podcasts

How do you recommend podcast episodes based both on personal preferences **and** topic similarities?  

This project is an end-to-end data pipeline with a simple dashboard output. The goal was to combine **user behavior patterns** with **semantic episode similarity**, then serve recommendations through a reliable and modular architecture.  

This work was completed as part of the *Big Data Technologies* course at the **University of Trento**, as a team effort. My main focus was on **data ingestion**, **Kafka and Spark pipelines**, and **text processing + training** components.

---

## 🏗️ System Architecture

A three-layer architecture that handles everything from raw audio ingestion to real-time serving:

**Ingestion**  
Pull trending episodes from *PodcastIndex* (the open alternative to Spotify’s API), stream them through **Kafka**, and use **Vosk** for speech-to-text transcription.  
User events (plays, likes, skips, completions) are simulated following realistic behavior patterns, all flowing through Kafka into **Delta Lake**.  
We opted for simulation due to lack of real user data.

**Processing**  
Two parallel pipelines:
- **Content-based:** Transcripts embedded using SentenceTransformers, with KNN similarities across the catalog. (In production, this would be replaced with ANN for scalability.)
- **Collaborative:** User events aggregated into daily engagement scores, feeding a **Spark ALS model** for collaborative filtering.

**Serving**  
Final recommendations combine both scores:  
> `0.7 × ALS_score + 0.3 × content_similarity`

Results are stored in **MongoDB** for sub-100 ms lookups, and visualized in a **Streamlit dashboard**.

<img src="{{ 'images/sequence-diagram.png' | relative_url }}" alt="Project Architecture Diagram" style="width:240px; float:right; margin:0 0 1rem 1.5rem; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.15);" />


---

## ⚙️ Interesting Problems

### 1. Making ALS Work with Implicit Feedback

Collaborative filtering is simple when you have explicit ratings—but podcast listening is messy. Someone might play an episode for 10 seconds, or listen 90% and never “like” it.  

We treated this as an **implicit feedback problem** where the *rating* is binary (interacted = yes/no) but the *confidence* varies.  
A full listen + like gets high confidence; a skip after 5% gets almost none.  
After tuning, I found **alpha = 40** and **regParam = 0.08** produced balanced recommendations across the catalog.

---

### 2. The Cold-Start Problem, Practically

New episodes start with zero engagement data.  
Instead of maintaining two paths (content vs. collaborative), I compute embeddings immediately on ingestion and store them in MongoDB.  
The **hybrid scoring** handles this naturally: new episodes rely fully on content similarity until ALS data accumulates.

---

### 3. Multi-Language Variants Without Duplication

PodcastIndex lists the same show in multiple languages. Without filtering, users saw multiple translations of the same episode.  

The fix: define a `canonical_episode_id` grouping all variants, and at serving time filter by user locale.  
No NLP magic — just smart metadata use.

---

### 4. Built-in A/B Testing

We designed serving for early A/B tests.  
A deterministic hash — `hash(user_id + experiment_id) % 100` — splits users into:
- **0–49:** hybrid recommendations  
- **50–99:** ALS-only  

This keeps user variants *sticky* across sessions, ensuring consistent engagement metrics.

---

## Tech Choices 

- **Kafka** – for replayable event transport and reproducibility.  
- **Delta Lake** – for schema evolution and time-travel.  
- **Spark** – unified framework for streaming + batch + ML.  
- **Vosk** – local STT, showing end-to-end capability without external APIs.  
- **DuckDB** – lightweight analytics directly from Delta with sub-second queries.

---

## What We'd Do Differently

If productionized:
- Replace simulated events with real user tracking (Segment/Snowplow).  
- Add **model monitoring** (drift, overfitting alerts via Evidently or Great Expectations).  
- Refactor the monolithic **Airflow DAG** into smaller modular DAGs for selective runs.

---

## 📊 Results

<img src="{{ 'images/dashboard.png' | relative_url }}" alt="Streamlit Dashboard Screenshot" style="width:240px; float:right; margin:0 0 1rem 1.5rem; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.15);" />

---

📂 [View the repository on GitHub]({{ page.repo }}){: .btn .btn--primary target="_blank" }  
📘 [Read architecture documentation]({{ page.repo }}/blob/main/docs/architecture.md){: .btn .btn--secondary target="_blank" }
