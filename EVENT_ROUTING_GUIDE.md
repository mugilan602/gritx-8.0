# Event Routing System - Implementation Guide

## 🎯 Overview
This system provides dynamic routing for 19 different events, where each event card links to its own detailed event page using the `AnimatedEventPage` component.

## 📁 File Structure
```
src/
├── data/
│   ├── eventsData.js              # Main events array with basic info
│   ├── eventDataLoader.js         # Centralized event data mapping
│   └── events/
│       ├── projectrix.js          # Detailed ProjectriX event data
│       ├── code2cosmos.js          # Detailed Code2Cosmos event data
│       ├── bugBlaze.js             # Detailed Bug Blaze event data
│       └── ...                    # Add more detailed event files here
├── pages/
│   ├── DynamicEventPage.jsx       # Handles dynamic event routing
│   └── Events.jsx                 # Updated to use new events data
└── components/
    ├── AnimatedEventPage.jsx       # The animated event display component
    └── EventNavigationExamples.jsx # Examples of navigation patterns
```

## 🔧 How It Works

### 1. Events Data Structure
**File: `src/data/eventsData.js`**
- Contains all 19 events with basic info
- Each event has `id`, `title`, `description`, `link`, `slug`, `icon`, etc.
- The `link` property defines the route (e.g., "/projectrix")
- The `slug` property is used to match and load detailed event data

### 2. Detailed Event Data
**Files: `src/data/events/*.js`**
- Each event can have its own detailed data file
- Contains full event information: rounds, prizes, coordinators, etc.
- Example structure:
```javascript
export const projectrixEventData = {
    name: "ProjectriX",
    logoUrl: "/logo1.png",
    description: "Detailed description...",
    rounds: [
        { id: 1, title: "Round 1: ...", description: "..." },
        // ... more rounds
    ],
    details: {
        teamSize: "1-4 Members",
        prizes: { first: "₹25,000", second: "₹15,000", third: "₹8,000" },
    },
    coordinators: [
        { id: 1, name: "...", role: "...", imageUrl: "..." },
        // ... more coordinators
    ],
    gform: "registration-link"
};
```

### 3. Event Data Loader
**File: `src/data/eventDataLoader.js`**
- Maps event slugs to their detailed data
- Provides `getEventDataBySlug(slug)` function
- Includes default event data template for events without custom data
- Automatically generates fallback data for events not yet detailed

### 4. Dynamic Routing
**File: `src/pages/DynamicEventPage.jsx`**
- Extracts slug from URL pathname
- Loads corresponding event data using `getEventDataBySlug()`
- Passes data to `AnimatedEventPage` component
- Redirects to `/events` if event not found

### 5. Route Configuration
**File: `src/App.jsx`**
```javascript
// Individual routes for each event
<Route path="/projectrix" element={<DynamicEventPage />} />
<Route path="/code2cosmos" element={<DynamicEventPage />} />
<Route path="/bug-blaze" element={<DynamicEventPage />} />
// ... all 19 event routes
```

### 6. Events Page Integration
**File: `src/pages/Events.jsx`**
- Imports events data from `src/data/eventsData.js`
- Each event card links to its specific route using `event.link`
- Updated to handle image icons instead of emoji icons
- Includes error handling for missing icons

## 🚀 Usage Examples

### Adding a New Event
1. **Add to events array** (`src/data/eventsData.js`):
```javascript
{
    id: 20,
    icon: "/logo20.png",
    title: "New Event",
    description: "Event description...",
    hueA: 80,
    hueB: 120,
    link: "/new-event",
    slug: "new-event"
}
```

2. **Create detailed data** (`src/data/events/newEvent.js`):
```javascript
export const newEventData = {
    name: "New Event",
    logoUrl: "/logo20.png",
    description: "Detailed description...",
    rounds: [...],
    details: {...},
    coordinators: [...],
    gform: "..."
};
```

3. **Add to event loader** (`src/data/eventDataLoader.js`):
```javascript
import { newEventData } from './events/newEvent.js';

export const eventDataMap = {
    // ... existing events
    'new-event': newEventData,
};
```

4. **Add route** (`src/App.jsx`):
```javascript
<Route path="/new-event" element={<DynamicEventPage />} />
```

### Navigation Examples
```javascript
// Using Link component
<Link to="/projectrix">Go to ProjectriX</Link>

// Using useNavigate hook
const navigate = useNavigate();
navigate('/projectrix');

// Event card (already implemented)
{eventsData.map(event => (
    <Link to={event.link} key={event.id}>
        <EventCard event={event} />
    </Link>
))}
```

## ✅ Current Status

### ✅ **Fully Implemented Events (with detailed data):**
- ProjectriX (`/projectrix`)
- Code2Cosmos (`/code2cosmos`)  
- Bug Blaze (`/bug-blaze`)

### ⚡ **Auto-Generated Events (using default template):**
- Roll and Rule (`/roll-and-rule`)
- Script2Screen (`/script2screen`)
- HuntXcape (`/huntxcape`)
- Jockey Junction (`/jockey-junction`)
- Sportsera (`/sportsera`)
- E-football (`/e-football`)
- Cinimax (`/cinimax`)
- Campus Ambassador (`/campus-ambassador`)
- Frozen Frames (`/frozen-frames`)
- Design Dash (`/design-dash`)
- The Debate Saga (`/the-debate-saga`)
- Web Vibe (`/web-vibe`)
- The Reel Showdown (`/the-reel-showdown`)
- Mini Hackathon (`/mini-hackathon`)
- CineSpark (`/cine-spark`)
- Paper Presentation (`/paper-presentation`)

## 🎨 Features
- ✅ Dynamic routing for all 19 events
- ✅ Automatic fallback data generation
- ✅ Image icon support with error handling
- ✅ Responsive design maintained
- ✅ Fast animations and smooth transitions
- ✅ SEO-friendly individual event URLs
- ✅ Easy event management and updates

## 📝 Next Steps
1. **Create detailed data files** for remaining events in `src/data/events/`
2. **Add event-specific images** to `public/` folder (logo1.png - logo19.png)
3. **Customize default event template** if needed
4. **Test all routes** to ensure proper navigation
5. **Add 404 handling** for invalid event routes

## 🔧 Troubleshooting
- **Event not loading**: Check if slug matches in `eventDataMap`
- **Images not showing**: Verify image paths in `public/` folder
- **Route not working**: Ensure route is added to `App.jsx`
- **Data missing**: Check if event data exists in `eventDataLoader.js`