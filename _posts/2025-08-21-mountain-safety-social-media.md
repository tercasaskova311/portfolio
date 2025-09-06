---
layout: single
title: "Avalanche Safety on Social Media: Evidence from Reddit and YouTube"
date: 2025-08-21
permalink: /posts/2025/08/mountain-safety-social-media/
tags: [avalanche, safety, social-media, Reddit, YouTube, NLP, sentiment, topic-modeling, detoxify]
excerpt: "What are people actually discussing about avalanche safety online? A small, transparent analysis of Reddit threads and YouTube comments."
header:
  teaser: /assets/images/mountain_safety_1.png
classes: wide
toc: true
toc_sticky: true
---

**Repository / notebook**  
[tercasaskova311/mountain_safety — CSS_assigment-1.ipynb](https://github.com/tercasaskova311/mountain_safety/blob/main/CSS_assigment-1.ipynb){: .btn .btn--primary target="_blank" }

## Which avalanche-safety topics are most visible on Reddit and YouTube, and what is the prevailing sentiment?  

- **Data.** 155 items from r/AvalancheAwareness (posts and comments) via Communalytic; 100 YouTube videos with engagement metrics and sampled comments via the YouTube Data API v3.  
- **Methods.** Sentiment with platform tools (plus Detoxify for toxicity screening); topic exploration with Latent Dirichlet Allocation (LDA) on YouTube comments.  

- **Findings.** YouTube discussions are **highly reactive** (~81% positive, ~7% negative; rest neutral), dominated by exclamations and spectacle; Reddit is **more neutral/mixed** (~12% negative, ~72% neutral, ~16% positive). LDA topics on YouTube cluster around **reactions**; explicit procedural safety terms are comparatively sparse.  
- **Implication.** Avalanche content on large platforms appears to amplify **emotion** more than **procedure**. Safety communication that foregrounds concise checklists and decision workflows may help rebalance attention.

---

## 1) Background and framing
Avalanche incidents are low-base-rate, high-consequence events. Social media shapes risk perception both directly (viewers’ takeaways) and indirectly (norms about gear and behavior). Conceptually, treat each comment as a small “vector” of attention: if vectors point toward *awe and shock*, the field encourages **spectating**; if they point toward *forecast checks and terrain choices*, the field encourages **practice**. This study measures where that attention tends to flow.

## 2) Data
**Reddit (r/AvalancheAwareness).** 155 posts/comments, with metadata (score, upvote ratio, flairs).  
**YouTube.** 100 videos retrieved by “avalanche safety”; metadata and engagement (views, likes, comments), plus a sample of comments for text analysis.

*Note.* This is a scoped, transparent sample intended for method demonstration rather than population estimates.

## 3) Methods (succinct)
- **Sentiment.** Platform sentiment via Communalytic; complementary toxicity screening via **Detoxify** to flag incivility.  
- **Topics.** **LDA** on tokenized YouTube comments to reveal recurring word bundles (K chosen pragmatically; stopwords tuned iteratively).  
- **Comparisons.** Descriptive contrasts across platforms; no causal claims.

> Intuition: sentiment ≈ *temperature*; topics ≈ *contours*. Together they sketch where conversation heat and mass concentrate.

## 4) Results
### 4.1 Sentiment
- **YouTube comments:** ~**80.95%** positive, ~**7.14%** negative (remainder neutral). Language is arousal-heavy (“amazing”, “wow”, “wtf”, “rip”).  
- **Reddit (r/AvalancheAwareness):** ~**16.16%** positive, ~**12.12%** negative, ~**71.72%** neutral.

**Interpretation.** YouTube’s engagement incentives correlate with high-arousal reactions; Reddit displays a steadier tone but still not dominated by procedural discourse.

### 4.2 Topics (YouTube comments, LDA)
- **T1–T3: Reaction clusters** — frequent tokens like *wtf, bro, lol, snow, avalanche*.  
- **T4: Light gear/gratitude** — tokens such as *helmet, good, thank, would, great*.  
- **T5: Hype/amazement** — *amazing, wow, never, clean, thanks*.

Notably **absent or rare** in dominant topics: multi-step procedural terms (e.g., *beacon checks, terrain traps, slope angle, compression tests*).

## 5) Discussion
**Why the tilt toward reaction?**  
- **Platform incentives.** Algorithms reward watch time and engagement; dramatic clips outperform tutorials.  
- **Affordances.** Short comment boxes favor exclamations; instruction is longer and effortful.  
- **Selection.** Viral avalanche content is often **spectacle**, not pedagogy.

**Practical implications.**  
- Pair dramatic content with **actionable micro-checklists** (forecast → terrain → roles → beacon check → travel protocol).  
- Pin and timestamp **procedural summaries** in descriptions and top comments.  
- Encourage creators and SAR organizations to standardize brief, high-signal safety callouts.

## 6) Validity, ethics, and limitations
- **Scope.** One subreddit and 100 videos ≠ the ecosystem.  
- **Text limits.** Sarcasm and context gaps can mislead polarity; LDA is bag-of-words and ignores phrase structure.  
- **Engagement bias.** High-arousal content likely overrepresented.  
- **Ethics.** Respect platform TOS; avoid doxxing; treat tragedy content with care.

---
