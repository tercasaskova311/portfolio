---
title: "From CNNs to Transformers: Top-k Image Retrieval"
collection: portfolio
permalink: /portfolio/topk-image-retrieval/
date: 2025-05-01
excerpt: "CLIP, DINOv2, EfficientNet, ResNet, GoogLeNet; frozen vs fine-tuned; GAP vs GeM; hybrid losses; cosine similarity."
repo: https://github.com/tercasaskova311/Top-k-Image-Retrieval-Image-recognition-
tags: [Deep Learning, Computer Vision, Transformers, CNNs, Metric Learning, Image Retrieval]
header:
  teaser: /Users/terezasaskova/Desktop/portfolio-1/assets/images/home-bg.jpg
---


[View code on GitHub]({{ page.repo }}){: .btn .btn--primary target="_blank" }

---

## Overview
This project was developed for the **Image Retrieval Competition** at the University of Trento. The task: given a real celebrity photo (query), retrieve the 10 most similar synthetic images (gallery).  

Submissions were evaluated with a **weighted top-k accuracy metric**:  
- Top-1 = 600 pts  
- Top-5 = 300 pts  
- Top-10 = 100 pts  

We compared **CNNs** (ResNet, EfficientNet, GoogLeNet) against **transformer-based encoders** (CLIP, DINOv2), exploring both **frozen vs fine-tuned backbones** and pooling strategies (**GAP vs GeM**).  

---

## Key Engineering Challenges

### 1. Model Scaling & Memory Limits
- **Problem:** Larger models like CLIP ViT-L/14 repeatedly ran out of GPU memory during competition.  
- **Fix:** Post-competition, we added **gradient accumulation + explicit memory management (`torch.cuda.empty_cache()`)**, enabling full fine-tuning.  
- **Outcome:** This unlocked a jump from **510.24 → 791.82 weighted Top-k accuracy**.  

### 2. Pooling Strategy
- **Observation:** GAP (average pooling) often smoothed out strong local activations, hurting retrieval.  
- **Solution:** **GeM pooling** preserved discriminative signals, improving recall@K across CNNs.  

### 3. Training Pipeline Bugs
- **Issue:** On competition day, fine-tuning was not correctly updating transformer blocks due to flawed training logic.  
- **Fix:** Post-competition we redesigned the pipeline with proper layer unfreezing, small LR schedules, and hybrid losses.  

### 4. Loss Functions for Retrieval
- **Problem:** Cross-entropy loss alone produced discriminative but poorly structured embeddings.  
- **Solution:** Combined **cross-entropy + contrastive loss on normalized embeddings**.  
- **Impact:** Preserved both **class separation** and **semantic continuity**, crucial under domain shift (real ↔ synthetic).  

---

## Results

- **Competition Day Best:**  
  - CLIP ViT-B/16, frozen, **510.24 weighted Top-k**.  

- **Post-Competition Best:**  
  - CLIP ViT-L/14, fully fine-tuned, **791.82 weighted Top-k**.  

- **Auxiliary Dataset (Animals):**  
  - EfficientNet-B3, fine-tuned, GAP pooling → **0.8513 Precision@K**.  

**Key Takeaways:**
- Transformers (CLIP, DINOv2) outperformed CNNs when **semantic similarity** mattered more than pixel-level similarity.  
- **Training design matters as much as architecture**: fixing fine-tuning and adopting hybrid losses made a bigger difference than model choice alone.  
- Resource-aware techniques (gradient accumulation, memory clearing) are essential for scaling large models.  

---

## Lessons Learned
- **Architectures alone don’t guarantee performance** — the pipeline (losses, fine-tuning, memory management) is equally critical.  
- **Hybrid objectives** (classification + contrastive) yield embeddings that are both discriminative and semantically meaningful.  
- **Scaling laws hold**: larger vision transformers consistently improve when given enough compute and a well-designed pipeline.  

---

## Skills Demonstrated
- **Deep Learning**: CNNs vs Transformers for retrieval.  
- **Metric Learning**: cosine similarity, recall@K, hybrid loss design.  
- **Optimization**: gradient accumulation, fine-tuning strategies, memory management.  
- **System Design**: FAISS-based ANN search for scalable retrieval.  
- **Experimental Rigor**: systematic model comparison, post-competition ablation, CVPR-style report.  

---

📂 **Repo**: [From CNNs to Transformers: Top-k Image Retrieval]({{ page.repo }})
