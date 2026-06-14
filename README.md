# 🛒 BetterBuy

BetterBuy is a Chrome Extension that helps users make smarter laptop purchasing decisions on Amazon.

When viewing a laptop product page, BetterBuy analyzes the product's specifications, identifies comparable alternatives, and recommends potentially better options based on performance, value, and category. The goal is to reduce the time users spend researching and comparing products manually.

> BetterBuy is currently in its early development stage and supports laptop recommendations on Amazon.

## Features

- Extracts key laptop specifications from Amazon product pages
- Classifies laptops into categories such as Gaming, Productivity, and Creator
- Compares products using a custom ranking engine
- Evaluates recommendations based on performance, price, ratings, and category relevance
- Provides transparent recommendation reasons
- Displays the current product alongside recommended alternatives
- Highlights the top-ranked recommendations for quick comparison

## Tech Stack

- React
- JavaScript
- Chrome Extension (Manifest V3)
- Node.js
- Express.js

## How It Works

```text
Amazon Product Page
        ↓
Specification Extraction
        ↓
Category Detection
        ↓
Competitor Discovery
        ↓
Ranking Engine
        ↓
Recommendation Generation
        ↓
Extension Popup
```

## Current Limitations

- Supports Amazon only
- Supports laptops only
- Extraction accuracy is still being improved
- Recommendation logic is continuously being refined

## Roadmap

- Direct product navigation from recommendations
- Enhanced CPU and GPU benchmarking
- Display quality analysis
- Improved extraction and ranking accuracy
- Support for additional product categories

## Project Status

🚧 Active Development (MVP)

This project is being built incrementally with a focus on recommendation quality, transparency, and practical user value.
