---
title: "Podcast Analytics & Recommendation Platform"
collection: portfolio
permalink: /portfolio/podcast-platform/
date: 2025-03-20
excerpt: "Real-time + batch ingestion with Spark + Delta Lake + MongoDB; hybrid recommender from user interactions and metadata."
repo: https://github.com/tercasaskova311/podcast-recommendation-platform
tags: [Big Data, Streaming, Spark, Delta Lake, MongoDB, Recommender Systems]
header:
  teaser: _portfolio/project_architecture.png
classes: wide
---

[View code on GitHub]({{ page.repo }}){: .btn .btn--primary target="_blank" }

## TL;DR
Built an end-to-end pipeline that ingests podcast events (plays, likes, follows) in **real time**, lands them in **Delta Lake** (bronze → silver → gold), and serves **personalized recommendations** backed by **MongoDB** + a small API layer.

## Intuition (1Blue3Brown style)
Imagine each user and each podcast as points in a space shaped by behavior and metadata. **Streaming updates** nudge the user’s point a little with every interaction; **batch jobs** periodically reshape the space (retrain models), keeping the geometry stable but responsive.

## Architecture
- **Ingestion**
  - Event stream (e.g., Kafka) → **Spark Structured Streaming** → Delta **bronze**.
  - Nightly batch imports for catalogs/metadata (RSS, tags).
- **Storage**
  - **Delta Lake** (S3/DBFS): bronze (raw) → silver (cleaned) → gold (features).
  - **MongoDB**: fast serving store for user vectors & top-K recommendations.
- **Processing**
  - **Streaming**: sessionization, dedup, rolling user stats; write to silver.
  - **Batch**: build TF-IDF/BM25 text vectors, audio features if available, and train ALS (implicit) or a two-tower model; write gold.
- **Serving**
  - **Hybrid recommender**: collaborative (ALS) ⊕ content-based (tags/embeddings).
  - REST API (FastAPI): `/recommend?user_id=...` returns top-K.


