---
layout: single
title: "Avalanche Safety on Social Media: What Reddit Really Talk About"
date: 2025-08-21
permalink: /posts/2025/08/mountain-safety-social-media/
tags: [avalanche, safety, social-media, Reddit, YouTube, NLP, sentiment, topic-modeling, detoxify]
excerpt: "Do people learn safety—or just react—when watching avalanche content online? An exploration across Reddit and YouTube using sentiment, topics, and toxicity."
header:
  teaser: /images/portfolio/mountain-safety/teaser.png  # add an image at this path
classes: wide
---

**Repo / Notebook:**  
[tercasaskova311/mountain_safety — CSS_assigment-1.ipynb](https://github.com/tercasaskova311/mountain_safety/blob/main/CSS_assigment-1.ipynb){: .btn .btn--primary target="_blank" }

## TL;DR
I analyzed avalanche-safety conversations on **Reddit** and **YouTube**. The emotional tone on YouTube is largely positive/cheerful, and topics often skew to reactions (“wow”, “wtf”, “bro”) rather than explicit safety training. Reddit is more neutral, with some negative posts; gear (e.g., helmets) pops up, but structured safety talk is sparse. Together, the platforms act more like **reaction theaters** than **safety classrooms**.

---

## Research question
**What avalanche-safety topics and sentiments dominate online discussions on Reddit and YouTube?**  
Target users include outdoor enthusiasts, educators, rescue teams, and policy makers who want to shape safer communication. 

---

## Data
- **Reddit** — Avalanche awareness subreddit discussions; 155 posts/comments with IDs, text, scores, flairs, etc. :contentReference[oaicite:1]{index=1}  
- **YouTube** — 100 “avalanche safety” videos with metadata and engagement (views, likes, comments); comment text included for analysis. :contentReference[oaicite:2]{index=2}

**Collection tools**  
- **Communalytic** for Reddit threads and sentiment. :contentReference[oaicite:3]{index=3}  
- **YouTube Data API v3** for video/engagement data; Python for comment retrieval. :contentReference[oaicite:4]{index=4}

---

## Methods (quick sketch)
- **Sentiment analysis** to estimate the emotional valence of posts/comments (Communalytic; plus toxicity with **Detoxify**). :contentReference[oaicite:5]{index=5}  
- **Topic modeling** via **LDA** to uncover frequent themes in YouTube comments. :contentReference[oaicite:6]{index=6}  

> Intuition (1Blue3Brown vibe): Map each comment to a point in a semantic space. Topic modeling finds **dense ridges** (themes). Sentiment/toxicity estimate the **vector field**—which way the conversation leans emotionally.

---

## Key results
### Sentiment
- **YouTube**: broadly **positive** (≈81% positive, ≈7% negative), suggesting enthusiastic or entertainment-oriented reactions to avalanche content. :contentReference[oaicite:7]{index=7}  
- **Reddit**: **neutral-leaning** (≈72% neutral, ≈12% negative, ≈16% positive), aligning with more matter-of-fact thread discussions. :contentReference[oaicite:8]{index=8}

### Topics (YouTube comments)
- Dominant terms reflect **reaction language** (“wtf”, “bro”, “lol”, “amazing”, “wow”), not procedural safety. :contentReference[oaicite:9]{index=9}  
- Some mentions of **helmets/safety gear**; scattered references to incidents (“RIP”). :contentReference[oaicite:10]{index=10}  
- **Conclusion:** high emotional engagement; limited explicit avalanche-training discourse. :contentReference[oaicite:11]{index=11}

---

## Ethical & data caveats
- **Platform bias**: Reddit/YouTube audiences aren’t the general public; engagement ≠ belief. :contentReference[oaicite:12]{index=12}  
- **Data availability limits**: few focused subreddits; video context/comments can be partial or skewed toward sensational content. :contentReference[oaicite:13]{index=13}  
- **Topic ambiguity**: LDA can surface noisy clusters; safety talk is hard to isolate from reaction chatter. :contentReference[oaicite:14]{index=14}

---

## So what? (practical takeaways)
- **Educators & rescue teams:** pair viral clips with **clear safety calls-to-action**; reaction energy is a hook, not the lesson.  
- **Creators:** annotate videos with **time-stamped safety tips** and link to avalanche forecasts/training modules.  
- **Communicators:** seed **gear checklists** (beacon, probe, shovel, helmet context) and **decision frameworks** (ALPTRUTh, FACETS) into descriptions/pins.

---

## How I’d improve next
1. **Refine queries**: target niche subreddits/videos with explicit safety instruction to raise the signal. :contentReference[oaicite:15]{index=15}  
2. **Richer labels**: hand-tag a small set of comments as “training/safety vs. reaction” to validate topic results.  
3. **Temporal lens**: align comment spikes with avalanche news cycles; test whether sentiment shifts after incidents.  
4. **Toxicity context**: cross-tab Detoxify scores by topic to see where discourse gets unproductive. :contentReference[oaicite:16]{index=16}

---

## Mini “how to reproduce”
1. Pull Reddit threads via **Communalytic**; pull YouTube metadata + comments via API. :contentReference[oaicite:17]{index=17}  
2. Clean text; remove short/duplicate comments; keep language filters.  
3. **Sentiment** (e.g., VADER/TextBlob or platform metrics) + **Detoxify** for toxicity. :contentReference[oaicite:18]{index=18}  
4. Vectorize (TF-IDF) → **LDA** for topics; plot top words per topic. :contentReference[oaicite:19]{index=19}  
5. Compare platform-level sentiment/topic distributions.

---

## Study tips
- Draw the **embedding picture**: safety-instruction comments should cluster; reactions should scatter. If not, revisit preprocessing.  
- Validate topics with **human labels** on a small sample; use them to tune the number of topics and stop-words.  
- Report **confidence**: show a few prototypical comments per topic so readers can judge quality.

## Common mistakes
- Treating engagement metrics as truth (it’s a **visibility filter**, not ground reality). :contentReference[oaicite:20]{index=20}  
- Reading LDA topics literally; they’re **probabilistic mixtures**, not hard labels.  
- Ignoring **ethics/consent** norms on user-generated content and platform ToS.

