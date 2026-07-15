# Rayo Cafe Menu — Product Requirement Document

## Product Overview

Rayo is a mobile-first digital cafe menu application designed for Persian-speaking users.

The system allows customers to browse menu categories, explore food items, view detailed information, save favorites, and check item availability.

This is a frontend-only application.

No backend exists.

All data is stored in static JSON files.

---

# Product Goals

Main goals:

- Modern digital menu experience
- Fast navigation between categories
- Smooth mobile experience
- Beautiful UI similar to SnappFood
- Static architecture for easy maintenance

---

# Core Features

## Category Management

Each category contains:

- ID
- Persian title
- Icon
- Availability settings

Example:

- Coffee
- Dessert
- Breakfast
- Main Course

---

## Food Items

Each food contains:

- ID
- Category ID
- Name
- Price
- Image
- Short description
- Popular state
- Favorite support

---

## Food Detail Modal

Each food modal contains:

- Food image
- Full description
- Ingredients list
- Minimum preparation time
- Favorite button
- Availability status

---

## Favorites

Users can:

- Add favorite foods
- Remove favorite foods
- Store favorites in localStorage

---

## Availability Logic

Each item supports:

### Always Available

Food is always orderable.

### Scheduled Availability

Food available between hours.

Example:

08:00 → 14:00

If unavailable:

- Ordering disabled
- Show unavailable badge

Applied on:

- category level
- food level

---

## Search

Search by:

- food name
- category name

Instant filtering.

---

# Technical Architecture

Frontend only.

Stack:

- React / Next.js
- TypeScript
- TailwindCSS
- Framer Motion
- Static JSON data

---

# Data Architecture

/data/categories.json

/data/foods.json

/data/food-details.json

/data/favorites.json

Relations:

foods.categoryId → categories.id

foodDetails.foodId → foods.id

---

# UI Requirements

Mobile First

RTL Persian Layout

Light Theme

Sticky category navigation

Horizontal category list

Smooth transitions

SnappFood inspired cards

Rounded corners

Modern shadows

Fast interactions

---

# Performance Requirements

- Lazy image loading
- Memoized components
- Optimized rendering
- Minimal bundle size

---

# Deliverables

- Complete frontend
- Static JSON architecture
- Fully responsive pages
- Reusable components
- Production ready codebase
