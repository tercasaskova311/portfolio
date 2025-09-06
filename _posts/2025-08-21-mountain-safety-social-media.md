---
layout: single
title: "Analyzing Avalanche Safety Perception on Social Media. "
date: 2025-05-01
permalink: /posts/2025/08/mountain-safety-social-media/
tags: [avalanche, safety, social-media, Reddit, YouTube, NLP, sentiment, topic-modeling, detoxify]
excerpt: "How do people perceive avalanche safety in online discussions on Reddit and YouTube?"
header:
  teaser: /images/mountain-safety/teaser.png  # add an image at this path
classes: wide
---

**Repo / Notebook:**  
[tercasaskova311/mountain_safety — CSS_assigment-1.ipynb](https://github.com/tercasaskova311/mountain_safety/blob/main/CSS_assigment-1.ipynb){: .btn .btn--primary target="_blank" }

This study aims to explore what are the most frequently discussed avalanche safety concerns on Reddit and YouTube.

## Avalanche Safety in Online Discussions
Social media (Reddit & YouTube) is a key source of outdoor safety information. Avalanche safety is critical for skiers, mountaineers, and outdoor enthusiasts.Understanding how social media shapes risk perception & safety behaviour is crucial. The possible takeaways can improve communication strategies for outdoor safety professionals.

---

## Research question
**What are the most common topics about avalanche safety expressed in online discussions on Reddit and YouTube?**  

---

## Platform selection
- **Reddit** — A platform with discussion forums such as r/AvalancheAwareness, Avalanche Safety, Backcountry
User-generated discussions In-depth conversations 
- **YouTube** — A video-based platform where outdoor professionals, rescue organisations and others share safety content.
Allows access to engagement data (likes, shares, comments) to analyze how users interact with safety content.

**Data Collection Method**  
- **Reddit** Communalytic: Used to collect posts and comment threads from relevant subreddits.Data collected from r/AvalancheAwareness subreddit using Communalytic. 
- **YouTube** YouTube Data API v3: To retrieve video details, metadata and engagement statistics.Search for "avalanche safety" videos and retrieve metadata for 100 videos. Using the YouTube API v3 and video statistics through Python API requests
---

## Avalanche Awareness Discussions
(Reddit) - Communalytics
ID, Date, Author, Title:
Text: Content of the post or comment
Comment_on: Indicates whether it's a reply to another comment (logical)
Type: Post or comment classification
Score: Number of upvotes/downvotes received (Min: 1, Max: 47, Mean: 4.148)
Upvote_ratio: Proportion of upvotes (Min: 0.67, Max: 1.0, Mean: 0.9542)
User Flair: User profile tags (if available)
Submission Flair: Category of the post (if applicable)

- Number of cases: 155 posts/comments

---

## YouTube Avalanche Safety
(YouTube)
Video_ID: Unique identifier for videos
Title: Video title
Description: Video description
Published Date: When the video was published Views: Total video views
Likes: Number of likes
Comments: Number of comments
Video Sentiment: Sentiment analysis on comments Comment Text: Content of each comment
Likes on Comments: Number of likes for individual comments

- Number of Cases: 100 videos

---
## Analytical Strategy
- 1. Sentiment Analysis: using Communalytics to understadn the emotional tone. 
Sentiment Insights: uncover a general sentiment around avalanche risk and safety on
both Reddit and YouTube.

- 2. Topic Analysis: Identify and categoriez the most frequent discussed topics. 
Expect to identify which specific avalanche safety topics are discussed most frequently.

---

## Youtube - Avalanche Safety videos
Sentiment Analysis
Both used libraries agree on:
(7.14%) posts with negative sentiments (polarity scores <= -0.05) (80.95%) posts with positive sentiments (polarity scores >= 0.05).
The Civility Analyzer identifies toxic and prosocial interactions in a dataset. Using Detoxify ML model. The module calculates toxicity scores.

## Reddit: Avalanche Awareness
Sentiment Analysis
12 (12.12%) posts with negative sentiments (polarity scores <= -0.05),
71 (71.72%) posts with neutral sentiments (polarity scores between -0.05 and 0.05), and 16 (16.16%) posts with positive sentiments (polarity scores >= 0.05).


## Youtube - Avalanche Safety videos - comments
Topic Analysis
1.Initialize the LatentDirichletAllocation model 2.Fit the LDA model
3.Display the top words for each topic
Topic 1: ever love please video get dont avalanche lol man thats
Topic 2: time think air got dont looks bro avalanche snow like
Topic 3: wtf didnt cameraman one test god oh im snow avalanche
Topic 4: brad music good rip thank really helmet would great video
Topic 5: amazing run wallet stupid go thank never wow clean thanks

Surprisingly, no strong mentions of "avalanche safety," "training," or "how to survive".
Possible conclusion: People aren’t learning about avalanche safety as much as they are reacting emotionally to videos.
High emotional engagement
Many words indicate strong reactions: wtf, bro, lol, oh, god, amazing, wow, stupid.
Possible conclusion: Avalanche safety videos on YouTube attract shock and entertainment rather than serious safety discussions.
Helmet and safety gear discussion (Topic 4)
This could indicate some discussion around protective equipment.
If you look deeper into these comments, you might find debates on whether helmets help in an avalanche.
Some tragedy discussions (RIP in Topic 4)
If the dataset includes videos of real avalanche accidents, this might indicate people reacting to fatal incidents.

Code here: https://github.com/tercasaskova311/mountain_safety
## Ethical Considerations Ethical Concerns with Social Media Data
Bias: Data from Reddit and YouTube may not reflect the general population, as these platforms have specific user demographics and engagement patterns.
User Engagement: Interactions may not represent users' true beliefs but their engagement with certain content, potentially skewing the analysis.

## Limitations
Limitations
Data Availability
Reddit: Limited relevant subreddits for avalanche safety, leading to broader, off- topic discussions.
YouTube: Restricted to video metadata and comments, lacking full context and access to older content.

Bias in Data
Platform Demographics: Users on Reddit and YouTube may not represent the general public.
Engagement Bias: Popular content may skew analysis, as more emotional or sensational content gets more interaction.
Topic Analysis Challenges
Identifying Topics: Avalanche safety discussions are hard to isolate in comments or videos. Context Loss: Sentiment and topic modeling may miss nuanced meanings or user intent.


## Final considerations
Research Question Refinement
After data collection, the research question may need to be narrowed or refined based on the actual data available, focusing on specific aspects of avalanche risk perception that emerge.
