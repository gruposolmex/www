# Grupo Solmex Icon System

## Overview

The Solmex icon system is a comprehensive library of 40+ icons designed for logistics and operations management. All icons follow strict design guidelines derived from the Solmex brand identity.

## Specifications

### Grid System
- **Base Size**: 24×24px viewBox
- **Safe Zone**: 2px padding (20×20px live area)
- **Stroke Weight**: 1.5px (standard)
- **Corner Radius**: 2px (rounded caps)
- **Line Cap**: Round
- **Line Join**: Round

### Color
- **Default Stroke**: `#FF943B` (Solmex Orange)
- Icons can be customized via CSS or by editing the SVG directly

### Stroke Weights
| Weight | Use Case |
|--------|----------|
| 1px | Light / Small sizes (16px) |
| 1.5px | Standard (default) |
| 2px | Bold / Emphasis |
| 2.5px | Heavy / Large sizes (48px+) |

### Size Scale
| Size | Context |
|------|---------|
| 16px | Dense UI, inline |
| 20px | Navigation |
| 24px | Standard (default) |
| 32px | Feature emphasis |
| 48px | Hero/display |

## Icon Categories

### Operations & Logistics (8 icons)
- `shipment.svg` - Package/shipment container
- `route.svg` - Route path
- `schedule.svg` - Clock/time schedule
- `terminal.svg` - Location marker
- `truck.svg` - Truck vehicle
- `railcar.svg` - Rail car
- `inventory.svg` - Stacked inventory
- `dashboard.svg` - Dashboard/monitor

### Movement & Flow (8 icons)
- `arrow-right.svg` - Right arrow
- `transfer.svg` - Transfer/exchange
- `delivered.svg` - Checkmark/delivered
- `in-transit.svg` - Clock/in-transit
- `loading.svg` - Loading/download
- `unloading.svg` - Unloading/upload
- `sync.svg` - Synchronization
- `dispatch.svg` - Send/dispatch

### Compliance & Safety (8 icons)
- `secure.svg` - Shield/security
- `verified.svg` - Verified checkmark
- `warning.svg` - Warning triangle
- `error.svg` - Error/X mark
- `info.svg` - Information circle
- `locked.svg` - Locked padlock
- `unlocked.svg` - Unlocked padlock
- `document.svg` - Document/file

### Data & Analytics (8 icons)
- `chart-bar.svg` - Bar chart
- `analytics.svg` - Analytics line
- `chart-pie.svg` - Pie chart
- `trending-up.svg` - Trending up
- `trending-down.svg` - Trending down
- `database.svg` - Database
- `processor.svg` - Processor/chip
- `network.svg` - Network layers

### Actions (8 icons)
- `search.svg` - Search/magnifying glass
- `add.svg` - Plus/add
- `remove.svg` - Minus/remove
- `edit.svg` - Edit/pencil
- `delete.svg` - Delete/trash
- `download.svg` - Download
- `upload.svg` - Upload
- `settings.svg` - Settings/gear

## Usage

### As Image
```html
<img src="svg/icon-name.svg" alt="Icon description" />
```

### Inline SVG
```html
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Copy SVG content from file -->
</svg>
```

### CSS Background
```css
.icon {
  background-image: url('svg/icon-name.svg');
  background-size: 24px 24px;
  width: 24px;
  height: 24px;
}
```

### Customizing Colors
Icons use `stroke="#FF943B"` by default. To change color:

**Via CSS (for inline SVG):**
```css
.icon svg {
  stroke: #your-color;
}
```

**Via SVG editing:**
Replace `stroke="#FF943B"` with your desired color in the SVG file.

## File Structure

```
icons/
├── svg/
│   ├── shipment.svg
│   ├── route.svg
│   ├── terminal.svg
│   └── ... (40+ icons)
├── icon-system.html
├── icon-system.svg
└── README.md
```

## Design Principles

1. **Consistency**: All icons follow the same grid, stroke weight, and corner radius
2. **Clarity**: Icons are designed to be recognizable at small sizes
3. **Precision**: Clean, engineered aesthetic matching Solmex brand
4. **Scalability**: Vector-based for perfect scaling at any size

## License

© 2025 Grupo Solmex. All rights reserved.

