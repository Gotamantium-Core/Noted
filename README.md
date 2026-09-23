# Attendance Tracker

A client-side web app for tracking college attendance, built with **React**, **Vite**, **Tailwind CSS**, and **React Router**.

Enter your subjects, set up a weekly timetable, then mark each period as attended, absent, or free. The dashboard computes current attendance percentages, how many classes you can still skip, and which subjects need attention — all while keeping your data private in the browser.

## Features

- **Subjects** — add and remove subjects with a name and code.
- **Weekly Timetable** — build a timetable for Mon–Fri across 6 periods (09–10 through 15–16) and assign a subject to each slot.
- **Day Attendance** — open any date on the calendar and mark each period as **Attended**, **Absent**, **Free**, or unmarked. Changes are staged until you hit save.
- **Calendar** — browse months, see which days are working days vs. holidays, and toggle any date's status. For working days on weekends, you can borrow the timetable from a weekday.
- **Dashboard** — set semester start/end dates and a per-subject minimum attendance target. For each subject it shows:
  - Attended / total classes and percentage
  - A progress bar against the minimum target
  - Remaining classes in the semester
  - The number of classes you can still skip while staying above the minimum

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router 7](https://reactrouter.com/)
- [lucide-react](https://lucide.dev/) for icons

## Getting Started

```bash
npm install
npm run dev
```

Open the local URL Vite prints (typically `http://localhost:5173`) in your browser.

There is no backend and no account system — all data is stored in your browser's `localStorage`, so it stays on your device.

## Available Scripts

| Script           | Description                        |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Start the dev server with HMR      |
| `npm run build`  | Build the app for production       |
| `npm run preview`| Preview the production build       |
| `npm run lint`   | Run ESLint                         |

## Project Structure

```
src/
├── App.jsx                 # App shell with router + sidebar layout
├── pages/                  # Route-level pages
│   ├── DashboardPage.jsx   # Attendance overview & skip calculator
│   ├── SubjectsPage.jsx    # Subject manager
│   ├── TimetablePage.jsx   # Weekly timetable editor
│   ├── CalendarPage.jsx    # Month calendar / working-day view
│   └── DayAttendance.jsx   # Per-day period attendance
├── components/             # Reusable UI pieces
├── utils/                  # Storage, date, and attendance math
│   ├── storage.js          # localStorage store + migration helpers
│   ├── getSkipAllowance.js # Skip-allowance calculations
│   ├── getSubjectAttendance.js
│   ├── dateUtils.js
│   └── theme.js            # Dark mode handling
├── styles.js               # Shared style tokens
└── index.css               # Tailwind entry
```

## How the Dashboard Math Works

For each subject, the app:

1. Counts **total** and **attended** periods from your marked attendance.
2. Figures out how many **future classes** remain in the semester (working days from tomorrow to the semester end).
3. Computes how many of those future classes can be missed while keeping your percentage at or above the per-subject **minimum attendance** target.

This tells you at a glance whether you can safely skip a class or need to show up.