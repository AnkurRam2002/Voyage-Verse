# 🗺️ VoyageVerse — Future Roadmap

> A living document tracking planned features, their scope, and current progress.

---

## Progress Legend
| Symbol | Meaning |
|--------|---------|
| 🔴 | Not started |
| 🟡 | In progress |
| 🟢 | Complete |

---

## Feature Index

| # | Feature | Status | Progress |
|---|---------|--------|----------|
| F-01 | [Follow System](#f-01-follow-system) | 🔴 Not Started | 0% |
| F-02 | [Rich Text Editor](#f-02-rich-text-editor) | 🟢 Complete | 100% |
| F-03 | [Story Search & Filters](#f-03-story-search--filters) | 🟢 Complete | 100% |
| F-04 | [Tags & Categories](#f-04-tags--categories) | 🔴 Not Started | 0% |
| F-05 | [Nearby Stories (Geolocation)](#f-05-nearby-stories) | 🔴 Not Started | 0% |
| F-06 | [Admin Dashboard](#f-06-admin-dashboard) | 🟢 Complete | 100% |
| F-07 | [Community Platform](#f-07-community-platform) | 🔴 Not Started | 0% |
| F-08 | [Trip Planner](#f-08-trip-planner) | 🔴 Not Started | 0% |
| F-09 | [AI Travel Guide](#f-09-ai-travel-guide) | 🔴 Not Started | 0% |

---

## F-01: Follow System

**Goal**: Allow users to follow each other and receive a personalized feed of stories from the people they follow.

**Progress**: `░░░░░░░░░░` 0%

### Sub-tasks
- 🔴 Add `followers` and `following` arrays to the User schema
- 🔴 Create `POST /api/users/[id]/follow` and `DELETE /api/users/[id]/unfollow` routes
- 🔴 Display follow/unfollow button on user profiles
- 🔴 Build a `/feed` page showing stories only from followed users
- 🔴 Show follower/following counts on profile page
- 🔴 Add "Suggested Users" panel based on popular storytellers

**Tech**: MongoDB (User schema update), Next.js API routes, React state

---

## F-02: Rich Text Editor

**Goal**: Replace the plain textarea in the story creation form with a full WYSIWYG/Markdown editor supporting headings, bold, italic, images, and embeds.

**Progress**: `██████████` 100% ✅

### Sub-tasks
- 🟢 Install and configure **TipTap** (`@tiptap/react`)
- 🟢 Build a `RichEditor` component with toolbar (bold, italic, headings, lists, links, alignment)
- 🟢 Update Post schema to store HTML content
- 🟢 Update story display page to render rich HTML safely with prose CSS

**Tech**: TipTap, Cloudinary (for image uploads), React, MongoDB schema update

---

## F-03: Story Search & Filters

**Goal**: Provide full-text search across story titles and descriptions, with filters by location, tag, and date range.

**Progress**: `██████████` 100% ✅

### Sub-tasks
- 🟢 Create a search bar component in the blog/stories page
- 🟢 Build `GET /api/blog/search?q=&location=&from=&to=` API route
- 🟢 Implement MongoDB `$regex` filter on `title` and `desc` fields
- 🟢 Add location filter input
- 🟢 Add date range picker for filtering by date
- 🟢 Debounced live search with skeleton loading states

**Tech**: MongoDB Atlas Search or native `$text` index, Next.js API routes, React

---

## F-04: Tags & Categories

**Goal**: Let users tag stories with predefined travel themes (e.g. `#Beach`, `#Mountains`, `#Budget`) and allow browsing by tag.

**Progress**: `░░░░░░░░░░` 0%

### Sub-tasks
- 🔴 Add `tags` field (array of strings) to Post schema
- 🔴 Build a tag selector component in the story creation form
- 🔴 Display tags as pills on story cards and detail pages
- 🔴 Create a `/tags/[tag]` browse page listing all stories with that tag
- 🔴 Add a "Popular Tags" sidebar widget on the blog page
- 🔴 Seed predefined tag list (Beach, Mountains, Solo, Budget, Luxury, etc.)

**Tech**: MongoDB schema update, Next.js dynamic routes, React

---

## F-05: Nearby Stories

**Goal**: Use the browser's Geolocation API to discover travel stories from places near the user's current location.

**Progress**: `░░░░░░░░░░` 0%

### Sub-tasks
- 🔴 Create a "Discover Nearby" button/page
- 🔴 Request browser geolocation permission on click
- 🔴 Build `GET /api/stories/nearby?lat=&lng=&radius=` API route using MongoDB `$geoNear`
- 🔴 Add a `2dsphere` geospatial index to the Post collection
- 🔴 Display nearby stories on a mini Leaflet.js map with pins
- 🔴 Allow adjusting the radius (10km, 50km, 100km) with a slider

**Tech**: Browser Geolocation API, MongoDB `$geoNear`, Leaflet.js, Next.js API routes

---

## F-06: Admin Dashboard

**Goal**: Provide admins with an analytics dashboard showing key metrics: total users, stories per day, top stories, and engagement stats.

**Progress**: `██████████` 100% ✅

### Sub-tasks
- 🟢 Build **MongoDB aggregation** logic for 30-day stats
- 🟢 Create `AdminDashboard` with dual Area charts (Stories vs Users) using **Recharts**
- 🟢 Implement responsive container and glassmorphism styling
- 🟢 Integrate dashboard into the main Admin page layout
- 🟢 Gate dashboard behind `isAdmin` check

**Tech**: Recharts, MongoDB aggregation pipelines, Next.js API routes

---

## F-07: Community Platform

**Goal**: Add community features: travel forums, group trip planning threads, and an ask-for-advice Q&A section.

**Progress**: `░░░░░░░░░░` 0%

### Sub-tasks
- 🔴 Design and create a `Thread` / `Post` schema for forums
- 🔴 Create a `/community` page with categories (Tips, Q&A, Group Trips)
- 🔴 Build a thread creation form with rich text support
- 🔴 Add comment/reply threading inside each thread
- 🔴 Add upvote system for replies
- 🔴 Create a "Group Trip" board: users post intended trips and invite others
- 🔴 Add real-time notifications for new replies (Socket.io or polling)

**Tech**: MongoDB, Next.js, Socket.io (optional for real-time), TipTap (for thread content)

---

## F-08: Trip Planner

**Goal**: Let users plan, organize, and share their future trips with day-by-day itineraries alongside their stories.

**Progress**: `░░░░░░░░░░` 0%

### Sub-tasks
- 🔴 Create a `Trip` schema (destination, dates, days[], collaborators[])
- 🔴 Build a `/trips/new` form with destination, start/end date inputs
- 🔴 Create a day-by-day itinerary builder (drag-and-drop activity cards)
- 🔴 Add a map view showing the route across destinations
- 🔴 Allow inviting collaborators to co-plan a trip
- 🔴 Add a "Convert to Story" button once a trip is complete
- 🔴 Show a list of trips on the user's profile

**Tech**: MongoDB, Next.js, Leaflet.js / Mapbox GL, `@dnd-kit` for drag-and-drop

---

## F-09: AI Travel Guide

**Goal**: Add a GPT-powered chat widget on story and destination pages so users can ask detailed questions like "What's the best time to visit?" or "Is this safe for solo travelers?"

**Progress**: `░░░░░░░░░░` 0%

### Sub-tasks
- 🔴 Create a `POST /api/ai/ask` route using the **OpenAI API**
- 🔴 Build a collapsible chat widget component (`AskAI.jsx`)
- 🔴 Inject the story's location and description as system context
- 🔴 Stream responses for a real-time typing feel
- 🔴 Add suggested questions per destination (e.g. "Best local food?", "Visa requirements?")
- 🔴 Add rate limiting per user to control API costs
- 🔴 Cache common questions per destination in MongoDB

**Tech**: OpenAI API (GPT-4o), Next.js API routes (streaming), React, MongoDB (caching)

---

*Last updated: March 2026 · Total features: 9 · Implemented: 3/9*
