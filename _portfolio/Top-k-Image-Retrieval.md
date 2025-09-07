---
title: "From CNNs to Transformers: Top-k Image Retrieval"
collection: portfolio
permalink: /portfolio/topk-image-retrieval/
date: 2025-05-01
excerpt: "CLIP, DINOv2, EfficientNet, ResNet, GoogLeNet; frozen vs fine-tuned; GAP vs GeM; cosine similarity."
repo: https://github.com/tercasaskova311/Top-k-Image-Retrieval-Image-recognition-
tags: [Deep Learning, Computer Vision, Transformers, CNNs, Metric Learning, Image Retrieval]
header:
  teaser: _portfolio/0fe88234-21a7-42d4-ad46-ad00cee64ee4.JPG
---

[View code on GitHub]({{ page.repo }}){: .btn .btn--primary target="_blank" }

---

## Overview
Developed a **top-k image retrieval system** for the *Image Retrieval Competition* (University of Trento). The task: retrieve the 10 most similar gallery images for each query image.  

We built a retrieval pipeline that turns **images → embeddings → nearest-neighbor search**, and systematically compared **CNN backbones** (EfficientNet, ResNet, GoogLeNet) with **transformer encoders** (CLIP, DINOv2).  

---

## What We Built
- **Encoders**: CLIP (ViT), DINOv2 (ViT), EfficientNet, ResNet, GoogLeNet.  
- **Pooling**: GAP (average pooling) vs GeM (generalized mean).  
- **Training**: frozen vs fine-tuned backbones; tested both contrastive and cross-entropy objectives.  
- **Evaluation**: recall@K, precision@K, competition-weighted Top-k accuracy.  
- **Visualization**: qualitative nearest-neighbor grids and retrieval dashboards.  
- **Implementation**: PyTorch, FAISS for nearest-neighbor search.  

---

## Engineering Challenges & Solutions

### 1. High-Dimensional Embeddings
- **Problem**: Large transformer embeddings slowed retrieval and ballooned memory usage.  
- **Solution**: Applied **vector normalization + cosine similarity**, integrated FAISS for fast ANN search.  

### 2. Pooling Trade-offs
- **Observation**: GAP pooled away strong local features; retrieval suffered.  
- **Solution**: GeM pooling retained sharp activations, consistently boosting retrieval scores.  

### 3. Fine-Tuning Stability
- **Problem**: Fine-tuning large backbones (CLIP ViT-L/14) often diverged due to small dataset size.  
- **Solution**: Layer freezing, smaller learning rates, contrastive loss with hard negative mining.  

### 4. Competition Constraints
- **Challenge**: Competition required celebrity face retrieval across **real vs synthetic domains**.  
- **Solution**: Used CLIP embeddings (pretrained on multimodal data) to bridge style/domain gap.  

---

## Results

- **Competition metric (weighted Top-k accuracy):**  
  - Best: **791.82** (CLIP ViT-L/14, fully fine-tuned, contrastive + cross-entropy).  

- **Precision@K (public Animal dataset):**  
  - Best: **0.8513** (EfficientNet-B3, fine-tuned, GAP pooling).  

**Key takeaways:**
- Fine-tuning helps when domain labels are available, but frozen CLIP still performed strongly on domain-shifted tasks.  
- GeM > GAP for retrieval robustness.  
- Cosine similarity + normalization stabilized comparisons across models.  

---

## Project Structure
- `models/` — model scripts (CLIP, DINOv2, EfficientNet, ResNet, GoogLeNet).  
- `src/` — metric computation + visualization tools.  
- `results/` — logged JSON performance per model.  
- `report/` — CVPR-style technical report with figures/tables.  

---

## Skills Demonstrated
- **Deep Learning Architectures**: CNNs vs Vision Transformers for retrieval.  
- **Metric Learning**: contrastive loss, triplet loss, cosine similarity, recall@K.  
- **Optimization**: layer freezing, pooling strategy comparisons, hard negative sampling.  
- **System Design**: FAISS ANN search pipeline for scalable top-k retrieval.  
- **Evaluation**: experimental design across multiple datasets, formal CVPR-style report.  

---

📂 **Repo**: [From CNNs to Transformers: Top-k Image Retrieval]({{ page.repo }})  
