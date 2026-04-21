# CaptionCraft — Frontend

React + Vite frontend for the CaptionCraft social media app.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

App will run at → http://localhost:5173

## Requirements
- Your backend must be running at http://localhost:3000
- Backend needs CORS enabled with credentials support

## Backend CORS fix
Add this to your backend `app.js` so cookies work with the frontend:

```js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

## Features
- Register / Login with JWT cookie auth
- Upload image → AI generates caption via Gemini
- Feed page shows your created posts (stored in sessionStorage)
- Protected routes redirect to login if not authenticated
