---
title: "Podcast Recommendation Platform"
collection: portfolio
permalink: /portfolio/podcast-platform/
date: 2025-09-20
excerpt: "End-to-end big-data pipeline that recommends podcast episodes by combining listening behaviour (Spark ALS) with transcript similarity (sentence embeddings). Kafka · Spark · Delta Lake · Airflow · MongoDB."
repo: https://github.com/tercasaskova311/podcast-recommendation-platform
tags: [Spark, Kafka, Delta Lake, Airflow, MongoDB, Recommender Systems, NLP]
header:
  teaser: /images/dashboard.png
classes: wide
---

**A hybrid recommender that answers two questions at once: *what does this user like*, and *what is this episode actually about?***

[View code on GitHub]({{ page.repo }}){: .btn .btn--primary target="_blank" }
[Architecture docs]({{ page.repo }}/blob/main/docs/architecture.md){: .btn .btn--inverse target="_blank" }

| | |
|---|---|
| **Context** | *Big Data Technologies* course, University of Trento — team project |
| **My role** | Data ingestion, Kafka & Spark pipelines, transcript processing and model training |
| **Stack** | Python · Apache Kafka · Spark (Structured Streaming, ML) · Delta Lake · Airflow · MongoDB · DuckDB · Streamlit · Docker |
| **Techniques** | Speech-to-text · sentence embeddings + KNN · implicit-feedback matrix factorisation (ALS) · hybrid ranking |
| **Outcome** | Fully containerised pipeline, from raw podcast audio to per-user recommendations in a live dashboard, runnable with one `make` command |

---

## Architecture

Two independent pipelines feed one ranking step. The **content pipeline** turns audio into text and finds episodes that talk about similar things. The **behaviour pipeline** turns listening events into a collaborative-filtering model. A final Spark job blends both scores and writes the result to MongoDB for the dashboard.

<style>
  .arch object { width: 100%; height: auto; display: block; }
  .arch .arch-mobile { display: none; max-width: 440px; margin: 0 auto; }
  @media (max-width: 760px) {
    .arch .arch-wide { display: none; }
    .arch .arch-mobile { display: block; }
  }
</style>

<figure class="arch">
  <object class="arch-wide" type="image/svg+xml" data="{{ '/images/podcast-architecture.svg' | relative_url }}" aria-label="Architecture diagram">
    <img src="{{ '/images/podcast-architecture.svg' | relative_url }}" alt="Architecture: content pipeline (PodcastIndex, Kafka, Vosk, Delta Lake, embeddings + KNN, MongoDB) and behaviour pipeline (event simulator, Kafka, Spark Streaming, Delta Lake, ALS, MongoDB) merge into a hybrid ranking served by Streamlit; Airflow orchestrates all jobs.">
  </object>
  <object class="arch-mobile" type="image/svg+xml" data="{{ '/images/podcast-architecture-mobile.svg' | relative_url }}" aria-label="Architecture diagram">
    <img src="{{ '/images/podcast-architecture-mobile.svg' | relative_url }}" alt="Architecture diagram, vertical layout">
  </object>
  <figcaption>Click any box to open the code that implements it. Dashed boxes are storage; Airflow schedules every job.</figcaption>
</figure>

| Layer | What happens | Tools |
|---|---|---|
| **Ingest** | Trending episodes are pulled from the open PodcastIndex API and published to Kafka; audio is converted to 16 kHz mono and transcribed locally. User plays, likes and skips are simulated and streamed through a second topic. | Kafka, Vosk |
| **Store** | Transcripts, embeddings and aggregated user × episode engagement land in Delta Lake as the single source of truth. | Delta Lake |
| **Model** | Transcripts are embedded and compared with KNN (top-k cosine). Engagement scores train an ALS model for collaborative filtering. | SentenceTransformers, Spark ML |
| **Serve** | Both outputs are joined into one score per user–episode pair and stored in MongoDB. The dashboard reads recommendations from Mongo and live analytics straight from Delta via DuckDB. | Spark, MongoDB, DuckDB, Streamlit |

---

## Engineering decisions

**Listening data has no ratings, so I modelled it as implicit feedback.**
A 10-second play and a full listen are both "interactions", but they mean very different things. Each event type gets a weight (full play > like > short play > skip), events are aggregated into daily user × episode scores, and ALS is trained with `implicitPrefs=true`: whether a user interacted is the preference, and how strongly is the confidence (`c = 1 + α·r`). Configuration: rank 32, α = 40, λ = 0.08, non-negative factors.

**Long transcripts don't fit an embedding model, so they are chunked.**
`all-MiniLM-L6-v2` has a short input limit, while a podcast episode is thousands of words. Each transcript is split into token chunks, each chunk is embedded, and the episode vector is a token-weighted average, re-normalised so cosine similarity stays meaningful.

**Heavy work on Spark, light reads on DuckDB.**
Spark is the right engine for streaming aggregation and distributed ALS, but starting it for every dashboard refresh is wasteful. The dashboard queries Delta tables directly with DuckDB, in process and without a cluster, so charts like "events per minute" update in real time.

**Reproducibility built into the storage layer.**
Kafka retains events so pipelines can be replayed from an offset, and Delta Lake's time travel lets a model be retrained on an exact earlier version of the data.

**Two simple ideas behind the ranking.**
The final score is `0.7 · ALS + 0.3 · content similarity`. ALS captures taste; similarity to episodes the user already listened to pulls topically related content up the list. In the dashboard, top-rated episodes use a Bayesian average, so one 5-star vote cannot outrank fifty 4-star votes.

---

## Results

<figure>
  <img src="{{ '/images/dashboard.png' | relative_url }}" alt="Streamlit dashboard with KPI cards, top recommendation per user, live engagement chart and top episodes" style="width:100%; border-radius:8px; box-shadow:0 4px 14px rgba(0,0,0,.12);">
  <figcaption>Streamlit dashboard: KPI cards, the top recommendation for each user, live engagement per minute, and top episodes by weighted engagement.</figcaption>
</figure>

- Four Airflow DAGs (`new_episodes`, `user_events`, `recommendation`, `demo`) run the system end to end.
- Recommendations are written as a complete snapshot to MongoDB on every run, so the dashboard always reads one consistent version.
- The whole stack — Kafka, Spark, Airflow, MongoDB, Streamlit — starts with `make init` in Docker Compose.

---

## Limitations and next steps

Being honest about what a course project does not do is part of the design:

- **Simulated users.** There was no access to real listening data, so events are generated. The next step would be real tracking (e.g. Snowplow) and offline evaluation with precision@k / recall@k.
- **Cold start.** Candidates currently come from ALS, and similarity re-ranks them, so a brand-new episode only appears once it has some interactions. Adding a content-only candidate path for new episodes would fix this.
- **Scaling similarity.** Exact KNN is fine for a course-sized catalogue; a production version would use an approximate index (FAISS/HNSW).
- **Operations.** Model and data-drift monitoring (Evidently, Great Expectations) and an A/B split between hybrid and ALS-only ranking would be the next additions.

[View the repository on GitHub]({{ page.repo }}){: .btn .btn--primary target="_blank" }