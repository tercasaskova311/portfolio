---
title: "Annotation-Free Tree Crown Detection"
collection: portfolio
permalink: /portfolio/singletree-detection/
date: 2026-11-07
excerpt: "Finding individual tree crowns in open aerial imagery with no training labels: a domain-specific model detects, a foundation model outlines and filters. Part of my project with Digital Commons Lab at FBK."
tags: [Computer Vision, Earth Observation, Object Detection, Segmentation, DeepForest, SAM2, PyTorch]
header:
  teaser: /images/tree-detection-delineate.jpg
classes: wide
---

**Open data only, no ground truth, single tree detection**

This is the tree detection pipeline I built at the FBK Digital Commons Lab for project Talea. It finds individual tree crowns in orthophotos (plain RGB aerial images) from several Italian cities, without a single labelled tree needed for finetuning.

| | |
|---|---|
| **Context** | FBK Digital Commons Lab - project Talea, 2026 |
| **My role** | Designed and built the detection pipeline end to end |
| **Stack** | Python · PyTorch · DeepForest · SAM2 · GDAL · rasterio · GeoPandas · DuckDB spatial |

---

## Domain-specific model + foundation model

The pipeline combines two models that are each good at one thing:

- **DeepForest** is a **domain-specific model**: a RetinaNet detector pretrained on tree crowns. It knows **what** a tree is, so it finds almost all of them. But it also finds things that only look like trees from above - this depending on the context, can introduce FP in for of for example rooftops. As well as DeepForest strugle to detect each single tree crown in dense area thanks to the nature of detection outputs - bounding boxes.
- **SAM2** (Segment Anything Model 2) is a **foundation model**: general-purpose, never trained on tree labels. It doesn't know what a tree is, but it knows **where** an object's edge is.

Put together, DeepForest decides where to look and SAM2 draws what's really there. The crown outline SAM2 draws is then checked, and that's where the false positives get filtered out. A rooftop can be outlined perfectly, but it isn't green.

The principle: **recall first, filters after.** It's easier to remove a wrong detection than to recover a tree that was never found.

<style>
  .arch object { width: 100%; height: auto; display: block; }
  .arch .arch-mobile { display: none; max-width: 440px; margin: 0 auto; }
  @media (max-width: 760px) {
    .arch .arch-wide { display: none; }
    .arch .arch-mobile { display: block; }
  }
</style>

<figure class="arch">
  <object class="arch-wide" type="image/svg+xml" data="{{ '/images/tree-detection-pipeline.svg' | relative_url }}" aria-label="Tree detection pipeline diagram">
    <img src="{{ '/images/tree-detection-pipeline.png' | relative_url }}" alt="Two stages, no training labels. Stage 1, detection: DeepForest, a domain-specific model, proposes a box for every possible tree, with high recall and some false positives. Stage 2, segmentation: SAM2, a foundation model, outlines the crown inside each box, and checks on that outline drop what isn't a tree. The output is one polygon per tree.">
  </object>
  <object class="arch-mobile" type="image/svg+xml" data="{{ '/images/tree-detection-pipeline-mobile.svg' | relative_url }}" aria-label="Tree detection pipeline diagram">
    <img src="{{ '/images/tree-detection-pipeline.png' | relative_url }}" alt="Tree detection pipeline diagram, vertical layout">
  </object>
  <figcaption>Two stages, no training labels at any step. Click any box to open the code.</figcaption>
</figure>

---

## Stage 1: Detection

<figure>
  <img src="{{ '/images/3_bologna_deepforest_FP.png' | relative_url }}" alt="Aerial image of a residential area next to a wooded park, with red boxes around individual tree crowns" style="width:100%; border-radius:8px;">
  <figcaption>DeepForest's crown boxes over a mixed scene: houses and streets on the left, a wooded slope in the centre, open meadow on the right.</figcaption>
</figure>

Each red box is a bounding box = output of DeepForest pretrained model - with no fine-tuning.

What to notice:

- **True positives:** almost all the trees are found, although in denser areas the boxes aren't precise.
- **False positives:** some rooftops are labelled as trees.

That's exactly what this stage should do: find everything, even at the cost of a few mistakes.

To make one detector work across cities, images are cut into patches that always cover the **same ground area**, whatever the camera resolution, so a tree looks the same size to the model in every city.

---

## Stage 2: Segmentation

<figure>
  <img src="{{ '/images/3_bologna_sam2_FN.png' | relative_url }}" alt="The same aerial image with yellow outlines tracing the irregular shape of each tree crown" style="width:100%; border-radius:8px;">
  <figcaption>The same scene after SAM2: every box has become an outline of the actual crown.</figcaption>
</figure>

Each box from stage 1 is given to SAM2 as a prompt, and SAM2 traces the crown inside it.

What changes compared to stage 1:

- **Shapes follow the canopy.** The outlines are irregular, like real crowns, instead of rectangles.
- **Shadows and background drop out.** On the meadow trees, the outline hugs the crown rather than the shadow or the grass that a box also contains.
- **Touching crowns get separate outlines**, so the dense centre becomes a mosaic of individual trees.

**Filtering the false positives.** Because each detection now has a real outline, it can be checked:

- **Is it green?** A vegetation index over the crown. Rooftops, roads and shadows fail here.
- **Is it a plausible size?** Outlines too small or too large for a single tree are dropped.
- **Is the shape sane?** If SAM2 snapped to the wrong object, the original box is kept instead.

To keep this fast at city scale, each image chip is encoded by SAM2 **once**, and all boxes in it reuse that encoding.

---

## Why not fine-tune?

<figure>
  <img src="{{ '/images/tree-detection-pretrained-vs-finetuned.png' | relative_url }}" alt="Two copies of the same aerial image of a park with houses. On the left, orange boxes from the pretrained DeepForest cover almost every tree. On the right, cyan boxes from the fine-tuned DeepForest cover far fewer trees and many boxes are very small." style="width:100%; border-radius:8px;">
  <figcaption>The same scene: pretrained DeepForest (left) vs. DeepForest fine-tuned on an OAM-TCD subset (right).</figcaption>
</figure>

The obvious alternative is to fine-tune the detector on labelled trees, so I tested that. I fine-tuned DeepForest on a subset of [OAM-TCD](https://huggingface.co/datasets/restor/tcd), an open tree crown dataset, and compared both models by manual validation in three cities:

| | F1 | Recall | Precision |
|---|---|---|---|
| **Pretrained DeepForest** | **83.5 %** | **89.7 %** | 78.0 % |
| Fine-tuned DeepForest | 62.6 % | 48.6 % | **87.7 %** |

The fine-tuned model is slightly more precise, but it **misses half the trees**. With recall at 48.6 %, F1 drops by more than 20 points. For a pipeline built on "recall first", that's the wrong trade.

The likely cause is **domain shift**: the training data isn't the target data. OAM-TCD comes from different sensors, its images look different from Italian municipal orthophotos, and its labelling style is different too (some trees are labelled one by one, others as whole groups of canopy). Fine-tuning on data like that can also distort the good features the model learned in pretraining ([Kumar et al., 2022](https://arxiv.org/abs/2202.10054)).

<small>Recall is measured against all trees found by either model, so it's an upper bound. Only boxes were validated, not the SAM2 outlines.</small>

---

## Annotation-free, by design

Put together, the result is a pipeline that needs **no labelled trees at any step**:

- **Open data only.** Most cities publish RGB orthophotos, unlike LiDAR or tree inventories, so the pipeline can run almost anywhere.
- **No labels needed.** Labelling trees is slow and expensive, and labels from elsewhere don't transfer well, as the fine-tuning test shows.
- **Moves to a new city as it is.** A new city only needs its orthophotos and a quick check of the filter thresholds, not a new training set.
- **Each tree becomes an object**, an outline with its own shape and size, ready for any analysis that needs individual trees.