---
title: "Blog Archive"
layout: archive
permalink: /archive/
---

A collection of thoughts, projects, and learnings from my journey through data science, research, and sport.

---

## 📚 Recent Posts

{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}

---

## ✨ Formatting Reference

Use this section to preview formatting in Markdown for future posts or notes.

### Headers

# H1 - Title  
## H2 - Section  
### H3 - Subsection  
#### H4 - Subsubsection  

### Blockquote

> “The more I learn, the more I realize how much I don't know.” —Einstein

### Table

| Project                | Year | Description                             |
|------------------------|------|-----------------------------------------|
| Churn Prediction       | 2024 | Classification using XGBoost            |
| Sentiment Analyzer     | 2024 | NLP project on tweet sentiment          |
| Bike Injury Dashboard  | 2023 | Interactive Plotly app using pandas     |

### Lists

**Unordered**
- Python
- SQL
  - PostgreSQL
  - SQLite
- Streamlit

**Ordered**
1. Load dataset
2. Clean missing values
3. Fit model
4. Evaluate results

### Inline Elements

- *Italic*
- **Bold**
- `Monospace`
- [Link to GitHub](https://github.com/tercasaskova311)

### Code Block

```python
def predict_churn(data):
    model = XGBClassifier()
    model.fit(data.X, data.y)
    return model.predict(data.X_test)
