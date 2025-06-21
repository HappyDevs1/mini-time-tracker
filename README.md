## Mini Time Tracker
![image alt](https://github.com/HappyDevs1/mini-time-tracker/blob/main/Screenshot%20(286).png?raw=true)

## Overview
The Mini Time Tracker is a web application that helps users track their time spent on various tasks. Users can create time entries with task names and hours worked, view all entries, see total hours worked, and use an active timer to track time in real-time.

## Features
- Create time entries with task names and hours worked
- View all time entries in a list
- See total hours worked across all entries
- Edit or delete existing entries
- Start/stop timer for real-time tracking
- Local storage persistence
- Responsive design

## Setup and Run Instructions
### Prerequisites
1. Node.js (v16 or higher)
2. npm (v8 or higher)

### Installation
**Clone the repository:**
```bash
git clone https://github.com/HappyDevs1/mini-time-tracker.git
cd mini-time-tracker
```
**Install dependencies:**
```bash
npm install
```
**Start the development server:**
```bash
npm run dev
```
**Open the app in your browser:**

```text
http://localhost:5173
```

## Assumptions and Trade-offs
### Assumptions
1. Users only need to track time on a single device (no cloud sync)
2. Timer accuracy within 1 second is sufficient
3. Users are comfortable with English interface
4. Task names don't require categorization or tagging
5. Time entries don't need date information

### Trade-offs
- **1. Local Storage vs Database:**
   Used localStorage for simplicity and offline support
   - **Trade-off:** Data not synced across devices
- **2. Timer Implementation:**
   Used JavaScript intervals for timer updates
   - **Trade-off:** Potential drift over long periods
- **3. UI Framework:**
   Used Tailwind CSS for rapid styling
   - **Trade-off:** Larger CSS bundle size
- **4. State Management:**
   Used React useState for simplicity
   - **Trade-off:** Might become complex with more features
- **5. Form Validation:**
   Basic client-side validation only
   - **Trade-off:** No server-side validation

## What I'd Improve with More Time
### Core Improvements
- **1. User Authentication:**
  - Add login system with JWT tokens
  - Support multiple users with separate data
- **2. Backend Integration:**
  - Create Node.js/Express API
  - Use MongoDB/PostgreSQL for data storage
  - Implement proper data synchronization
- **3. Enhanced Timer:**
  - Web Workers for more accurate timing
  - Background timer persistence
  - Pause/resume functionality
- **4. Reporting Features:**
  - Daily/weekly/monthly summaries
  - Charts and visualizations (using Chart.js)
  - Export to CSV/PDF functionality
- **5. UI/UX Improvements:**
   - Mobile-first approach
   - Dedicated mobile app using React Native
- **6. Dark Mode:**
   - Implement theme switching
   - Respect system preferences
- **7. Drag and Drop:**
   - Reorder entries with drag and drop
   - Visual timeline of tasks
- **8. Notifications:**
   - Browser notifications for timer events
   - Reminders for long-running tasks

- **6. Advanced Features**
   - Project Management:
      Organize tasks by projects
      Add tags/categories for better organization
   - Time Blocking:
      Calendar integration for scheduling
      Visual time blocking interface
   - Pomodoro Timer:
      Built-in Pomodoro technique support
      Customizable work/break intervals
   - Integrations:
      Connect with productivity tools (Trello, Jira, etc.)
      Browser extension for cross-app tracking
      Performance Optimization
   - Caching:
      Service workers for offline support
      Smart data caching strategies

## Live Demo
**The application is deployed on Netlify:**
https://mini-time-tracker.netlify.app/
