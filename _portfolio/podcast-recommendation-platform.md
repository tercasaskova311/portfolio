---
title: "Podcast Analytics & Recommendation Platform"
collection: portfolio
permalink: /portfolio/podcast-platform/
date: 2025-09-01
excerpt: "Real-time + batch ingestion with Spark + Delta Lake + MongoDB; hybrid recommender from user interactions and transcript similarity."
repo: https://github.com/tercasaskova311/podcast-recommendation-platform
tags: [Big Data, Streaming, Spark, Delta Lake, MongoDB, Recommender Systems, Airflow, NLP]
header:
  teaser: _portfolio/project_architecture.png
classes: wide
---

[View code on GitHub]({{ page.repo }}){: .btn .btn--primary target="_blank" }

Built an end-to-end platform for **real-time ingestion**, **batch processing**, and **hybrid recommendations** for podcasts. Designed to scale across audio transcripts and simulated user events, it combines **streaming pipelines, NLP, and ML models** into one ecosystem.

---

## Key Challenges & Solutions

### 1. Large Transcript Processing
- **Problem:** 1-hour audio episodes → transcripts too long for embedding and similarity search.  
- **Solution:** Designed a **chunking pipeline** (500-token windows with overlap) to preserve context.  
- **Tech:** Vosk for voice-to-text, Spark for distributed embedding + KNN search.  

### 2. Voice-to-Text Bottlenecks
- **Problem:** voice-to-text on long-form audio was compute-heavy, GPU-bound, and slow.  
- **Solution:** Batch segmentation + **VOSK** for parallelized transcription (12× faster).  
- **Tech:** Delta Lake for storing transcripts incrementally.  

### 3. Scaling Embedding Computation
- **Problem:** Spark shuffles grew too large when computing high-dimensional embeddings.  
- **Solution:** Optimized **parallel processing** with repartitioning, caching, and memory tuning.  
- **Tech:** Spark ML, distributed pipelines.  

### 4. Orchestration & Reliability
- **Problem:** Ad-hoc scripts were brittle across ingestion, training, and serving.  
- **Solution:** Migrated to **Airflow DAGs** with clear dependencies, retries, and monitoring.  
- **Tech:** Airflow + Dockerized tasks for reproducibility.  

### 5. Data Access & Metadata Quality
- **Problem:** Spotify/Apple APIs unavailable; PodcastIndex data was noisy and incomplete.  
- **Solution:** Built **custom Kafka producers** with batching + retry logic; normalized metadata in Delta silver.  

---

## Architecture (High-Level)

- **Ingestion**
  - Event streams (Kafka) → Spark Structured Streaming → Delta.  
  - Batch catalog imports (PodcastIndex API).  

- **Storage**
  - Delta Lake  
  - MongoDB for fast top-K recommendation serving.  

- **Processing**
  - Streaming: sessionization, deduplication, rolling stats.  
  - Batch: transcript embeddings, TF-IDF/BM25, ALS collaborative filtering.  
  - Hybrid recommender: `score = 0.7 * ALS + 0.3 * similarity`.  

- **Serving**
  - MongoDB stores recommendations.  
  - REST API (FastAPI) for `/recommend?user_id=...`.  
  - Streamlit dashboard for monitoring + live analytics (DuckDB on Delta).  

---

## Skills Demonstrated
- **Data Engineering**: Kafka, Delta Lake, Spark Structured Streaming.  
- **Machine Learning**: ALS collaborative filtering, NLP embeddings, hybrid recommender design.  
- **System Design**: Real-time + batch integration, serving layer (MongoDB + FastAPI).  
- **Optimization**: Transcript chunking, parallel embedding, Spark shuffle tuning, GPU-efficient ASR.  
- **Visualization**: Streamlit dashboards + DuckDB for lightweight analytics.  

---

📂 **Repo**: [Podcast Recommendation Platform]({{ page.repo }})  
