---
title: "From CNNs to Transformers: Top-k Image Retrieval"
collection: portfolio
permalink: /portfolio/topk-image-retrieval/
date: 2025-05-01
excerpt: "Matching real celebrity photos to AI-generated portraits. Transformer vs. CNN. Image recognition ML compettion"
repo: https://github.com/tercasaskova311/Top-k-Image-Retrieval-Image-recognition-
tags: [Deep Learning, Computer Vision, Transformers, CNNs, Metric Learning, Image Retrieval]
header:
  teaser: /Users/terezasaskova/Desktop/portfolio-1/images/home-bg.jpg
classes: wide
---

[View code on GitHub]({{ page.repo }}){: .btn .btn--primary target="_blank"}  
[Read full paper (CVPR format)]({{ page.repo }}/blob/main/report/report_cvpr2025.pdf){: .btn .btn--light-outline target="_blank"}

This was a competition project for our Machine Learning course—four members team which the goal to: retrieve the top-10 most similar images for each query. Queries were real photos of celebrities, and the gallery was synthetic AI-generated portraits of the same people, but rendered in completely different artistic styles.

This wasn't a pixel-matching problem. A real photo of someone in a suit and a cartoon-style portrait of the same person share almost nothing at the texture level. We needed semantic understanding—models that could reason about identity despite radical visual differences.

---

## My Role & Focus

I worked in a team of four, and I focused mainly on two areas:

**CLIP** — I ran the CLIP variants (ViT-B/32, B/16, L/14), handling both frozen and fine-tuned setups. This involved figuring out how to properly unfreeze transformer layers, tuning learning rates, and eventually discovering we'd been doing fine-tuning wrong the entire competition.

**Metrics design** — We initially used generic retrieval metrics, but I realized we needed something aligned with the competition's weighted scoring system (600 points for Top-1, 300 for Top-5, 100 for Top-10). I built the evaluation pipeline that tracked this properly and helped us understand where models were actually failing.

Looking back, one thing I'd change: CLIP has its own contrastive loss built-in, and we should have used it from the start instead of reinventing it post-competition.

---

## What We Tried

We tested everything: ResNets, EfficientNets, GoogLeNet, DINOv2, and multiple CLIP variants. We experimented with pooling strategies (Global Average Pooling vs. Generalized Mean Pooling), froze vs. fine-tuned encoders, and ran ablations on loss functions.

The pattern that emerged was clear: **transformers consistently outperformed CNNs** when semantic similarity mattered more than texture matching. CLIP, pretrained on 400M image-text pairs, had learned to embed meaning rather than just pixels. It could look at a real photo and a stylized illustration and understand they depicted the same person—something ResNets struggled with.

But here's where it got interesting: having a powerful architecture didn't automatically translate to good results.

---

## The Fine-Tuning Fix

During the competition, we were convinced we were fine-tuning CLIP properly. We weren't.

The training loop had a subtle bug: parameter updates weren't propagating to the transformer blocks. We were essentially running frozen inference with an unfrozen classification head, which is why our competition-day score with ViT-L/14 was 510.24—decent, but nowhere near its potential.

Post-competition, We went back and debugged the entire training pipeline:
- Fixed layer unfreezing to ensure gradients flowed through all transformer blocks
- Added gradient accumulation (simulating larger batches without OOM errors)
- Implemented explicit memory management (`torch.cuda.empty_cache()`)
- Replaced pure cross-entropy with a hybrid loss: **cross-entropy + contrastive learning**

That last point was critical. Cross-entropy alone pushes classes apart but doesn't preserve relational structure in the embedding space. If two celebrities look similar, their embeddings should reflect that, even if they're different identities. Contrastive loss enforces this: pull same-class embeddings together, push different-class embeddings apart.

With these fixes, ViT-L/14's score jumped to **791.82**—a +281.6 improvement. That's not a minor bump; that's the difference between a working training pipeline and a broken one.

---

## Why CLIP Actually Worked

CLIP's advantage comes from its pretraining objective. It's trained on image-caption pairs, learning to align visual and textual semantics in a shared embedding space. This gives it abstract reasoning capabilities that CNNs don't have.

A CNN sees edges, textures, and color gradients. CLIP sees "a person with specific facial features" regardless of whether they're photographed or illustrated. When you're matching across massive domain shifts, that's the capability you need.

But—and this is important—CLIP's zero-shot performance wasn't enough. Even with 400M pretraining examples, it needed task-specific fine-tuning to distinguish between real and synthetic faces in our dataset. The trick was doing that fine-tuning correctly, which we initially didn't.

---

## Lessons I'd Apply Next Time

**Use native model tools when they exist.** CLIP has a built-in contrastive loss designed for its architecture. We ended up implementing our own variant post-competition, which worked, but it would've been smarter to start with what the authors provided.

**Infrastructure matters as much as architecture.** The difference between our competition score and our post-competition score wasn't about discovering a better model—it was about fixing memory bottlenecks and gradient flow. Scaling laws are real: larger models perform better, but only if your training pipeline can actually train them.

**Metrics guide everything.** We spent the first half of the competition optimizing for the wrong thing because our evaluation didn't match the competition's weighted scoring. Once I built the proper metric tracker, decision-making became much clearer.

**Ablations reveal more than leaderboards.** We ran side-by-side comparisons of every architecture, pooling strategy, and loss function. That's how we learned transformers systematically beat CNNs for semantic retrieval. The leaderboard told us scores; ablations told us why.

---

## Results

| Model | Configuration | Top-k Accuracy |
|-------|--------------|----------------|
| CLIP ViT-L/14 | Fine-tuned, hybrid loss (post-competition) | **791.82** |
| CLIP ViT-L/14 | Fine-tuned, CE only (competition day) | 510.24 |
| CLIP ViT-B/16 | Fine-tuned | 603.85 |
| EfficientNet-B3 | Fine-tuned, GAP | 0.8513 (Precision@K on Animals dataset) |
| ResNet-152 | Fine-tuned | ~0.72 (Precision@K) |

The final system retrieves semantically correct matches even when query and gallery images look nothing alike visually—exactly what we needed.

---

## Technical Stack

**Models:** CLIP (ViT-B/32, B/16, L/14), DINOv2, EfficientNet (B0, B3), ResNet (34, 50, 101, 152), GoogLeNet  
**Framework:** PyTorch, torchvision, Hugging Face Transformers  
**Evaluation:** Custom weighted Top-k accuracy aligned with competition scoring  
**Training optimizations:** Gradient accumulation, mixed precision (fp16), explicit memory management  
**Collaboration:** Team of 4, version control via GitHub, experiments logged in JSON

---

**making models trainable, not just picking the right architecture.**

We had access to ViT-L/14 from day one. It took us time to actually unlock its performance because the barrier wasn't the model—it was memory constraints, gradient bugs, and loss function design. 

---

📂 [Full code and experiments]({{ page.repo }})  
📄 [Technical paper (CVPR format)]({{ page.repo }}/blob/main/report/report_cvpr2025.pdf)

**Team:** Silvia Bortoluzzi, Diego Conti, Sara Lammouchi, Tereza Sásková  
**Course:** Introduction to Machine Learning, University of Trento (2024–2025)

---
