# TG Language App

Language learning mobile app built with React + Vite.

## Features

- Flashcard learning with swipe gestures
- Topic-based organization
- Blitz test (10 random words from learned vocabulary)
- Topic tests after completing all cards
- Progress tracking and statistics

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
  components/     # UI components
  hooks/         # Custom React hooks
  utils/         # Utilities and types
public/
  words.csv      # Word database
  images/        # SVG images
bot/            # Telegram bot (optional)
scripts/       # Utility scripts