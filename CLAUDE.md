# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CrabTrack is an interactive digital poster for a capstone project showcasing an IoT-based aquaculture monitoring system. This is a static HTML/CSS/JavaScript website designed to be displayed on screens at exhibitions (e.g., University of Cebu - Banilad Campus Capstone Project 2025).

## Project Architecture

### Core Structure
- **Single-page application** with no build process or dependencies
- Three main files: `index.html`, `css/styles.css`, `js/script.js`
- Pure vanilla JavaScript (no frameworks)
- Designed for fullscreen presentation mode

### Design System

**Color Palette** (defined in CSS `:root`):
- `--deep-ocean`: #0a1628 (primary background)
- `--ocean-blue`: #0d2847 (secondary background)
- `--teal-accent`: #00d4aa (primary accent, interactive elements)
- `--coral-orange`: #ff6b4a (problem section accent)
- `--soft-white`: #f0f4f8 (text)
- `--muted-blue`: #4a6fa5 (secondary text)

**Typography**:
- Headers: 'Bebas Neue' (bold, uppercase display font)
- Body: 'Source Sans 3' (clean sans-serif)
- Monospace code: 'Courier New' (sensor models)

### Interactive Components

**1. Sensor Explorer Section**
- Grid of 4 sensor cards (temperature, pH, turbidity, salinity) + ESP32 card
- Clicking a sensor populates the info panel with data from `sensorData` object in `script.js`
- State management: `.active` class on cards, dynamic HTML injection into panel
- Each sensor has: icon, title, description, and specs array

**2. AI Molting Detection Demo**
- Button triggers `runAIAnalysis()` which shows a message directing visitors to ask team members for a live demo
- No actual AI analysis happens - it's designed for in-person demonstration
- Reset functionality via "Back" button that calls `resetAIDemo()`

**3. Fullscreen Mode**
- Fixed button in top-right triggers `enterFullscreen()`
- CSS adapts poster to full viewport when `.is-fullscreen` class is added to body
- Handles browser-specific fullscreen APIs (standard, webkit, ms)

### Section Structure

Each section follows a consistent pattern:
```
<section class="section">
  <div class="section-header">
    <div class="section-icon [type]">emoji</div>
    <h2 class="section-title [type]">TITLE</h2>
  </div>
  <div class="section-content [type]">
    <!-- Content here -->
  </div>
</section>
```

Section types (each with unique colors):
- `problem` - coral/orange theme
- `solution` - teal theme
- `impact` - blue theme
- `explorer` - purple theme
- `ai` - teal/blue gradient theme

## Development Guidelines

### Adding New Sections
1. Follow the section structure pattern above
2. Define section-specific styles in CSS:
   - `.section-icon.[type]` with gradient background
   - `.section-title.[type]` with matching color
   - `.section-content.[type]` if needed
3. Place new sections in `<main class="content">` between existing sections and before `<!-- Tech Stack -->`

### Adding Interactive Features
1. Add HTML structure with unique IDs for JavaScript targeting
2. Define state data in `script.js` (following pattern of `sensorData` object)
3. Create handler functions (following naming pattern: `show*`, `close*`, `reset*`)
4. Use dynamic HTML injection via `innerHTML` for state changes
5. Apply CSS classes for state changes (`.active`, `.scanning`, `.result`, etc.)

### Styling Animations
The poster uses several animation techniques:
- `@keyframes` for repeating animations (wave, float, pulse, rise, scan)
- CSS `transition` for hover states and smooth changes
- `animation-delay` for staggered effects (bubbles)
- `backdrop-filter: blur()` for glassmorphic effects

### Fullscreen Considerations
- Poster defaults to 800px width with margins for desktop viewing
- In fullscreen (`.is-fullscreen` class on body), expands to full viewport
- Always test both modes when adding content
- Fixed button positioning accounts for both modes

## Tech Stack Tags

When adding new technologies to the system, update the tech stack section near the end of `index.html`:
```html
<div class="tech-stack">
  <span class="tech-tag">Technology Name</span>
</div>
```

Current stack: ESP32, Firebase, Android, IoT Sensors, Real-Time Database, YOLOv8, Computer Vision

## Exhibition Display Notes

- The poster is intended for large screen/projector display at academic exhibitions
- Fullscreen mode optimizes for presentation
- Interactive elements are designed for touchscreen or mouse interaction
- No network requests or external dependencies (works offline)
- All content is self-contained for reliability during exhibitions
