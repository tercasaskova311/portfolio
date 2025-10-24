---
title: "Podcast Recommendation Platform"
collection: portfolio
permalink: /portfolio/podcast-platform/
date: 2025-09-20
excerpt: "Building a hybrid recommender that combines user behavior with content understanding—because sometimes the best next listen isn't just what similar users liked."
repo: https://github.com/tercasaskova311/podcast-recommendation-platform
tags: [Spark, Delta Lake, MongoDB, Recommender Systems, Airflow, NLP, Kafka]
header:
  teaser: _portfolio/project_architecture.png
classes: wide
---

[View code on GitHub]({{ page.repo }}){: .btn .btn--primary target="_blank" }

## The Core Question

How do you recommend podcast episodes in almost real time based both on personal preferences and topic similarities? Pure collaborative filtering gives "more of the same," while content-based approaches ignore what users actually engage with. 

This project is an end-to-end pipeline that treats recommendations as a data engineering problem first, and a modeling problem second. The goal was to combine user interaction patterns with semantic episode similarity—then serve it all through a clean, monitored system. This project was part of Big Data Technologies course at University of Trento and is a result of team effort, my part was mainly ingestion part as later on Kafka and Spark process, as well as text processing and training of data. 

---

## System architecture

A three-layer architecture that handles everything from raw audio ingestion to real-time serving:

**Ingestion**  
Pull trending episodes from PodcastIndex (the free alternative when you can't get Spotify API access), stream them through Kafka, and run Vosk speech-to-text to get transcripts. User events are simulated but follow realistic patterns—plays, likes, skips, completion rates—all flowing through Kafka into Delta Lake. We had opt for simulation, as we lacked real life user event data. 

**Processing**  
Two parallel tracks:
- Transcripts get embedded with SentenceTransformers, then compute KNN similarities across the catalog. This gives me "episodes like this one" based purely on content. (For better scalability we would opt for ANN now.)
- User events aggregate into daily engagement scores (weighted by action type), then feed into Spark's ALS model for collaborative filtering. This gives me "episodes users like you enjoyed."

**Serving**  
The final recommendations are a weighted blend: `0.7 × ALS_score + 0.3 × content_similarity`. Everything lands in MongoDB for sub-100ms lookups, and built a Streamlit dashboard that runs DuckDB queries directly against Delta for live analytics—no need to spin up Spark just to check last hour's engagement.

![Architecture](images/Architecture.png)

---

## Interesting Problems We Ran Into

### Making ALS Work with Implicit Feedback

Collaborative filtering is straightforward when you have explicit ratings, but podcast listening is messy. Someone might play an episode for 10 seconds, or listen to 90% but never "like" it. 

We ended up treating this as an implicit feedback problem where the rating is binary (did they interact? yes/no) but the confidence varies. A full listen with a like gets high confidence; a skip after 5% gets almost none. ALS handles this natively through its confidence weighting, but tuning those weights—and the regularization—took some iteration. I settled on alpha=40 and regParam=0.08 after watching how recommendations distributed across the catalog.

### The Cold-Start Problem, Practically

New episodes have zero interaction history. The usual answer is "use content-based until you have data," but that means maintaining two separate recommendation paths. Instead, I compute embeddings immediately on ingestion and store them alongside historical similarities in Mongo. The hybrid scoring naturally handles it: new episodes get full weight from content similarity and zero from ALS, then gradually shift as engagement builds up. It just works.

### Multi-Language Variants Without Duplication

PodcastIndex includes the same episode in multiple languages—same show, same content, different audio. If I naively recommended based on embeddings, users would see English, Italian, and French versions of the same episode in their top 10.

The solution was surprisingly simple: PodcastIndex already provides episode and show IDs. I created a `canonical_episode_id` that groups language variants, then at serving time I filter to one variant per canonical ID based on user locale. No fancy NLP needed—just clean use of available metadata.

### Building for A/B Testing from Day One

We wanted to know if the hybrid approach actually beats ALS alone, so I designed the serving layer with sticky bucketing: `hash(user_id + experiment_id) % 100` splits users deterministically. Users 0-49 get hybrid recommendations, 50-99 get ALS-only. 

The key insight was making this deterministic and sticky—same user always sees the same variant across sessions. This way you can measure metrics like catalog diversity, engagement rates, and session length per bucket without worrying about assignment drift.

---

## Tech Choices That Mattered

**Kafka** for event transport because I wanted the option to replay and reprocess. In a real production system, being able to go back and say "let's recompute all of last week's aggregations" is worth the operational overhead.

**Delta Lake** as the storage layer because schema evolution and time-travel made iteration way faster. I changed the event schema twice during development and just bumped the table version instead of rewriting everything.

**Spark for both streaming and batch** because I didn't want to maintain two separate processing frameworks. Same codebase handles micro-batch aggregations (user events) and distributed ML training (ALS).

**Vosk instead of cloud STT** because this was a portfolio project and I wanted to show I could build the full stack without relying on external APIs. It's slower than Whisper, but it's local, free, and good enough for conversational audio.

**DuckDB for dashboard analytics** because spinning up a Spark cluster just to query "what happened in the last 10 minutes" felt ridiculous. DuckDB reads directly from Delta with zero infrastructure and sub-second query times.

---

## What We'd Do Differently

If We were productionizing this, I'd replace the simulated events with actual user tracking (probably Segment or Snowplow). The streaming pipeline is already built to handle real data—it's just a matter of swapping Kafka producers.

We'd also add proper model monitoring. Right now I have recommendation diversity metrics in the dashboard, but no automated alerts if ALS starts overfitting or if content similarity scores drift. That's solvable with something like Evidently or custom Great Expectations checks.

Finally, We'd split the monolithic Airflow DAG into smaller, more composable pieces. Right now the full pipeline runs as one DAG, which made development easier but isn't great for selective reruns or partial deployments.

---

## Results

![Dashboard](images/dashboard.png)

---

## Skills Showcased

I treat this project as a demonstration of data engineering fundamentals—building pipelines that are testable, observable, and maintainable. The ML is relatively simple (ALS isn't cutting-edge), but making it work at scale with proper orchestration, monitoring, and serving is where the real work lives.

**Core competencies:**  
Distributed computing (Spark), streaming architectures (Kafka), storage design (Delta Lake), workflow orchestration (Airflow), low-latency serving (MongoDB), and lightweight analytics (DuckDB).

If you're curious about implementation details, the full code is on GitHub. The README walks through the architecture, and the `docs/` folder has deeper dives into the pipelines and modeling decisions.

---

📂 [View the repository]({{ page.repo }})  
📊 [Architecture documentation]({{ page.repo }}/blob/main/docs/architecture.md)