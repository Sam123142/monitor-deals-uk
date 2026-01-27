# Phase 2 Implementation Plan

## Goal Description
Enhance the application with UK localization (GBP currency), a detailed view for individual monitors, and improved discovery tools (Search + Advanced Filters).

## Proposed Changes

### Data Layer
#### [MODIFY] [mockData.ts](file:///C:/Users/User/.gemini/antigravity/scratch/monitor-deals-app/lib/mockData.ts)
- Convert all prices ($) to GBP (£).
- Ensure store links (mock) imply UK retailers (e.g., Amazon UK).

### Pages & Routing
#### [NEW] [page.tsx](file:///C:/Users/User/.gemini/antigravity/scratch/monitor-deals-app/app/monitor/[id]/page.tsx)
- Dynamic route for individual monitor details.
- Display large image, full specs, price history (mock), and specific "Buy Now" CTA.

### Components
#### [MODIFY] [Header.tsx](file:///C:/Users/User/.gemini/antigravity/scratch/monitor-deals-app/components/Header.tsx)
- Add a Search Bar in the header.

#### [MODIFY] [page.tsx (Deals)](file:///C:/Users/User/.gemini/antigravity/scratch/monitor-deals-app/app/deals/page.tsx)
- Add side-bar or top-bar filters for:
    - Resolution (1080p, 1440p, 4K)
    - Refresh Rate (144Hz, 240Hz, etc.)
    - Screen Size

## Verification Plan
### Manual Verification
- **Localization**: Verify all £ symbols are correct throughout the app.
- **Navigation**: Click a monitor card -> Verify it opens the Details page (id matching).
- **Search**: Type in header search -> Verify results update or navigate to search page (or instant filtering).
- **Filters**: Select "4K" -> Verify only 4K monitors show.
