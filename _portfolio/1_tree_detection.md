---
title: "Single Tree Detection using DeepForest & SAM2"
collection: portfolio
permalink: /portfolio/singletree-detection/
date: 2026-08-30
excerpt: "A training-free computer vision pipeline for single-tree detection from orthophotos, combining zero-shot DeepForest detection with Segment Anything Model 2 (SAM2) for precise crown segmentation."
tags: [Earth Observation, DeepForest, SAM2, Orthophotos, Single Tree Detection]
header:
teaser: /images/PLACEHOLDER.png
classes: wide
---

## 🌳 Single Tree Detection from Orthophotos

Main focus in this task has been building a pipeline that relies only on open, widely-available data, requires no task-specific training, and still achieves high precision and recall.

*Technologies:* *Python · PyTorch · DeepForest · SAM2 · DuckDB (spatial) · GeoPandas*

### Methodology

The pipeline uses RGB orthophotos, since these are commonly and openly available at the municipal level across different cities — unlike LiDAR, which offers richer 3D structure but is far less consistently available and more expensive to acquire. This makes orthophotos a practical foundation for greenery monitoring at scale.

Two models are combined: DeepForest and SAM2.

DeepForest, a pretrained CNN detector, provides strong precision out of the box, but only moderate recall on tested orthophoto imagery — it misses a meaningful share of real trees, particularly smaller or shadowed crowns. Rather than compensating with model fine-tuning (tested, but found to trade recall away for a further precision gain — see below), SAM2 is used as a second stage: it refines each DeepForest box into a pixel-precise crown polygon, and its own mask-quality signal, combined with a colour-based greenness filter, helps reject spurious, non-vegetation detections (rooftop edges, shadows) that DeepForest's confidence score alone can miss. The result is a pipeline whose final output is genuine crown polygons, not bounding boxes.

### A training-free approach

The pipeline is deliberately training-free. Fine-tuning DeepForest on a European tree-crown dataset was tested directly: it improved precision further but came at a substantial cost to recall — a genuine trade-off, not a straightforward improvement, and one that didn't generalise consistently across cities with different canopy types and imaging conditions. The zero-shot model, calibrated per city instead, proved both simpler to maintain across a heterogeneous, multi-provider dataset and more robust overall.

### The dense-canopy problem

Dense, touching-crown clusters pose a genuine challenge distinct from ordinary detection: SAM2's own mask-quality scores are systematically lower here, reflecting real boundary ambiguity between neighbouring trees rather than detection error. A single fixed acceptance threshold either rejects too many true positives in dense canopy, or is loose enough there to let false positives back in elsewhere. This was addressed with density-aware SAM2 thresholds, calibrated per city based on local canopy conditions — a separate fix from the standard non-maximum-suppression and patch-overlap logic used to remove duplicate detections at tile boundaries.

### Results

<img src="{{ 'images/treedetection.png' | relative_url }}" alt="Single Tree Detection" style="width:240px; float:right; margin:0 0 1rem 1.5rem; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.15);" />
<img src="{{ 'images/treedetection_2.png' | relative_url }}" alt="Single Tree Detection" style="width:240px; float:left; margin:0 0 1rem 1.5rem; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.15);" />
<img src="{{ 'images/treedetection_3.png' | relative_url }}" alt="Single Tree Detection" style="width:240px; float:middle; margin:0 0 1rem 1.5rem; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.15);" />