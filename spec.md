# MASTER KEY Security Platform

## Current State
Full-stack security intelligence platform with:
- 5 hardcoded Indian database records
- Search by mobile, name/keyword, face match (simulated)
- Admin panel for user management
- Detailed result cards with news, social media links, live activity (all mocked data)
- http-outcalls component not yet wired for real API calls

## Requested Changes (Diff)

### Add
- Backend HTTP outcalls to fetch real Wikipedia data for searched names (public, free API)
- Backend HTTP outcalls to fetch real news via DuckDuckGo Instant Answer API for searched names/queries
- Wikipedia summary section in search results showing real internet data
- News snippet section pulling real DuckDuckGo results
- "Live Internet Data" badge/indicator when real data is fetched
- Graceful fallback when APIs return no results

### Modify
- SearchPage: After a search match is found (or even for NOT FOUND), show a "Internet Search Results" panel with real Wikipedia + DuckDuckGo data fetched via backend
- Backend main.mo: Add query methods that perform HTTP outcalls to Wikipedia API and DuckDuckGo API
- Display real news articles and summaries alongside the existing database results

### Remove
- Nothing removed; this augments the existing system

## Implementation Plan
1. Update backend main.mo to add HTTP outcall functions:
   - `searchWikipedia(query: Text)` -- calls Wikipedia REST API, returns summary JSON
   - `searchDuckDuckGo(query: Text)` -- calls DuckDuckGo Instant Answer API, returns related topics
2. Regenerate backend.d.ts bindings
3. Update SearchPage.tsx to call these backend functions after a search and display real internet results in a dedicated panel
4. Add loading states and error handling for the API calls
5. Validate and build
