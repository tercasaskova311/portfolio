---
layout: single
title: "Single Tree Detection for nature protection"
date: 2026-07-11
tags: [machinelearning, CV, RestinaNet, SAM2, pandas, treedetection]
header:
  teaser: /assets/images/Scatterplot.png
classes: wide
toc: true
toc_sticky: true
---

## Annotation-free DeepForest + SAM2 tree crown detection 🌲

More about my internship: Annotation-free DeepForest + SAM2 tree crown detection 🌲 as part of an implementation of 3-30-300 principle by Cecil Konijnendijk.

## Massive clear cuts and logging of old growth trees
I was in Vancouver Island, Canada visiting my friend some time back, and something you can see very clearly there and what some of the communities on Vancouver Island have been fighting - is massive clear cuts and logging of old growth trees. The problem over there: remote sensing and tree detection are often in the hands of big logging companies - you can use lidar or high-resolution satellite imagery, but that has its price, and the precise locations of many old growths still aren't mapped by the organizations which aim to protect them. 

## Annotation-free tree detection pipeline
Which brings me to my internship work: an annotation-free tree detection pipeline. It runs on orthophotos and open data only - a combination of DeepForest and SAM2, where the FPs with lower detection probability that survive the DeepForest step get filtered out by SAM2's edge detection. As a result, it's fast, needs no added training, and uses only open data. 

And so it got me thinking again about these people on Vancouver Island. These monitoring and detection tools are exactly what they need, especially if they can run on open data without time- or data-demanding training. It really is a way to scale up and run many areas without expensive training or tree label data. I'd be curious to see any progress on annotation-free tree detection for old growths, more specific detection isn't possible with this setup yet.

## DeepForest and SAM2
This setup actually brings a good balance because it uses both DeepForest and SAM2. And so it got me thinking about these people on Vancouver Island - these monitoring and detection tools are needed, especially if it's possible to run them with open data and without initial time- or data-demanding training. I would be curious to see any progress with annotation-free tree detection for old growths and more specific detection, which so far with this setup is not possible. 

Read about the detection pipeline more in depth here: https://lnkd.in/dC-RwdC4


#singletreedetection #deepforest #sam2 #domainspecifcmodel #foundationmodel #opendata #orthophotos #annotationfree

