# Nepocitadlo - Blackjack Card Counter

A mobile-first React application for counting cards in Blackjack with thumb-friendly controls.

## Features

- **Running Count**: Tracks the running count during gameplay
- **True Count**: Calculates true count based on decks remaining
- **Deck Management**: Decrease decks as they're used
- **Bet Calculation**: Automatically calculates optimal bet size
- **Mobile Optimized**: Thumb-friendly controls for mobile devices
- **Settings Panel**: Customize initial decks and base bet size

## Controls

- **+1 / -1**: Bottom sticky buttons for quick count adjustment
- **Reset**: Reset count and decks to initial values
- **Settings**: Configure initial decks and base bet
- **Deck Decrease**: Mark when decks are used

## Technology Stack

- React 18
- Tailwind CSS
- Vite for build tooling
- Mobile-first responsive design

## Installation

```bash
npm install
npm run dev
```

## Usage

1. Set your initial deck count and base bet in settings
2. Use +1/-1 buttons to track card count during play
3. Decrease deck count as cards are used
4. Monitor running count, true count, and optimal bet size

## License

MIT 