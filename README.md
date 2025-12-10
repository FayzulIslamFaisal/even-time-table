# Event Timetable - Next.js Application

A professional event timetable management system built with Next.js 16, TailwindCSS, and shadcn/ui components.

## 🚀 Features

- **Weekly Calendar View**: Navigate through days of the week with a scrollable tab interface
- **Multi-Venue Support**: Display events across multiple venues (Hall A, B, C, D)
- **Time-based Grid**: 24-hour timeline with 15-minute intervals
- **Event Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Sticky Headers**: Venue headers stay visible during vertical scroll, time column stays fixed on the left
- **Responsive Layout**: Horizontal and vertical scrolling for large timetables
- **LocalStorage Persistence**: All data is saved automatically to browser localStorage
- **Color-coded Events**: Visual distinction between different events
- **Interactive UI**: Click events to edit, drag-free scrolling

## 📋 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS 4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Language**: TypeScript
- **Data Storage**: Browser LocalStorage

## 📁 Project Structure

```
/app
  /timetable
    /components
      - TabDays.tsx          # Week day tabs component
      - VenueHeader.tsx      # Sticky venue header row
      - TimeColumn.tsx       # Fixed time column on left
      - EventGrid.tsx        # Main grid with events
      - EventCard.tsx        # Individual event card
    /data
      - localStore.ts        # LocalStorage CRUD operations
    /utils
      - timeUtils.ts         # Time calculation utilities
    - page.tsx               # Main timetable page
  - page.tsx                 # Root redirect to timetable
  - layout.tsx               # Root layout
  - globals.css              # Global styles
/components
  /ui                        # shadcn/ui components
    - button.tsx
    - card.tsx
    - dialog.tsx
    - input.tsx
    - label.tsx
    - tabs.tsx
/lib
  - utils.ts                 # Utility functions
```

## 🎯 Key Implementation Details

### Time Calculations
- **15-minute intervals**: Each time slot is 15 minutes
- **Pixel mapping**: 15 minutes = 20px height
- **Positioning**: Events are absolutely positioned based on start time and venue

### Layout Structure
1. **Top TabBar**: Horizontally scrollable week days (Mon-Sun)
2. **Venue Header**: Sticky row showing venue names (200px width each)
3. **Time Column**: Fixed left column showing hourly time slots
4. **Event Grid**: Scrollable area with background grid and event cards

### Sticky Positioning
- **Time Column**: `position: sticky; left: 0; z-index: 20`
- **Venue Header**: `position: sticky; top: 0; z-index: 10`

### Event Positioning
```typescript
// Vertical position based on start time
top = (startTimeInMinutes / 15) * 20px

// Height based on duration
height = (durationInMinutes / 15) * 20px

// Horizontal position based on venue
left = venueIndex * 200px
width = 200px - 8px (padding)
```

## 🎨 Data Structure

```typescript
interface Event {
  id: string;
  title: string;
  venue: string;
  startTime: string;  // "HH:MM" format
  endTime: string;    // "HH:MM" format
}

interface TimetableData {
  selectedDate: string;  // "YYYY-MM-DD" format
  venues: string[];
  events: {
    [date: string]: Event[];
  };
}
```

## 🔧 Setup & Installation

1. **Clone the repository**
   ```bash
   cd event-time-table-for-selise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Usage

### Adding an Event
1. Click the "Add Event" button in the top right
2. Fill in the event details:
   - Event Title
   - Venue (select from dropdown)
   - Start Time
   - End Time
3. Click "Create"

### Editing an Event
1. Click on any event card in the timetable
2. Modify the event details in the dialog
3. Click "Update" to save changes

### Deleting an Event
1. Click on an event card to open the edit dialog
2. Click the "Delete" button
3. Confirm the deletion

### Changing Days
- Click on any day tab at the top to view events for that day
- The tab bar is horizontally scrollable for easy navigation

## 🎨 Customization

### Changing Venue Width
Edit the `VENUE_WIDTH` constant in `/app/timetable/page.tsx`:
```typescript
const VENUE_WIDTH = 200; // Change to desired width in pixels
```

### Adding More Venues
Venues are stored in localStorage. You can modify the initial data in `/app/timetable/data/localStore.ts`:
```typescript
venues: ['Hall A', 'Hall B', 'Hall C', 'Hall D', 'Hall E']
```

### Adjusting Time Intervals
To change the time slot interval, modify the `generateTimeSlots()` function in `/app/timetable/utils/timeUtils.ts`.

## 🌟 Features Implemented

✅ Weekly day tabs with dates  
✅ Horizontally scrollable venue headers  
✅ Sticky venue header during vertical scroll  
✅ Fixed time column on the left  
✅ Event cards with proper positioning  
✅ Add new events  
✅ Edit existing events  
✅ Delete events  
✅ LocalStorage persistence  
✅ Responsive design  
✅ Color-coded events  
✅ 12-hour time format display  
✅ Form validation  
✅ Professional UI with shadcn/ui  

## 🚀 Production Build

```bash
npm run build
npm start
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔒 Data Persistence

All data is stored in browser localStorage under the key `event-timetable-data`. Data persists across page refreshes but is browser-specific.

## 🎯 Future Enhancements

- Drag and drop event repositioning
- Event color customization
- Export to PDF/iCal
- Multi-day events
- Event categories and filtering
- Search functionality
- User authentication
- Backend API integration
- Mobile responsive improvements

## 📄 License

MIT License - feel free to use this project for any purpose.

## 👨‍💻 Author

Built with ❤️ using Next.js and shadcn/ui

---

**Note**: This is a client-side only application. All data is stored locally in the browser. For production use with multiple users, consider implementing a backend API and database.
