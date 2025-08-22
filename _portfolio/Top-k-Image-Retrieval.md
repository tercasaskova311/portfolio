---
title: "From CNNs to Transformers: Top-k Image Retrieval"
collection: portfolio
permalink: /portfolio/topk-image-retrieval/
date: 2025-05-01
excerpt: "CLIP, DINOv2, EfficientNet, ResNet, GoogLeNet; frozen vs fine-tuned; GAP vs GeM; cosine similarity."
repo: https://github.com/tercasaskova311/Top-k-Image-Retrieval-Image-recognition-
header:
  teaser: _portfolio/0fe88234-21a7-42d4-ad46-ad00cee64ee4.JPG  # only filename
---

[View code on GitHub]({{ page.repo }}){: .btn .btn--primary target="_blank" }

Built a retrieval pipeline that turns images → embeddings → nearest-neighbor search. Compared classic CNNs (EfficientNet, ResNet, GoogLeNet) with modern transformer encoders (CLIP, DINOv2). Tested *frozen vs. fine-tuned* backbones, **GAP vs. GeM** pooling, and **cosine similarity** for ranking.

Think of each image as a point in a high-dimensional space. A good encoder **clusters semantically similar images** so the “nearest neighbors” are the right matches. Pooling (GAP/GeM) is how we compress a feature map into that single point; the distance metric is how we **measure closeness**.

## What We have built
- Data pipeline: loaders, augmentations, train/val split.
- Encoders: CLIP (ViT), DINOv2 (ViT), EfficientNet, ResNet, GoogLeNet.
- Pooling heads: **GAP** (average) and **GeM** (generalized mean).
- Training modes: **frozen** encoders vs **fine-tuning** the backbone.
- Loss/metric: cosine similarity with margin (contrastive / triplet ready).
- Evaluation: recall@K / precision@K; qualitative nearest-neighbor grids.

## Typical findings to look for
- Fine-tuning usually helps when labels match the target domain.
- **GeM** often beats GAP for retrieval (it preserves strong local activations).
- Cosine tends to be stable when vectors are length-normalized.

> Replace this paragraph with your numbers/plots once you finalize runs.

## Minimal usage sketch
```python
# encode -> index -> query
emb = encoder(image_batch)            # backbone (e.g., CLIP/DINOv2)
vecs = pool(emb)                      # GAP or GeM
vecs = normalize(vecs)                # for cosine
index.add(vecs)                       # FAISS/Annoy/Sklearn NN
D, I = index.search(query_vecs, k=10) # top-k

