import React, { useState, useMemo } from "react";

// Mobile-first Blackjack card counter with thumb-friendly controls
// - Bottom sticky bar: -1 and +1
// - Shows Running Count, True Count, Decks left, Bet
// - Deck decrease button placed under bet
// - Settings allow changing initial decks and base bet size

export default function BlackjackCounter() {
  const [runningCount, setRunningCount] = useState(0);
  const [decksRemaining, setDecksRemaining] = useState(6);
  const [initialDecks, setInitialDecks] = useState(6);
  const [baseBet, setBaseBet] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const trueCount = useMemo(() => {
    if (decksRemaining <= 0) return 0;
    const tc = runningCount / decksRemaining;
    return Number.isFinite(tc) ? tc : 0;
  }, [runningCount, decksRemaining]);

  const bet = useMemo(() => {
    const stake = Math.max(baseBet, trueCount * baseBet);
    return stake;
  }, [trueCount, baseBet]);

  const decDeck = () => setDecksRemaining((d) => Math.max(0, +(d - 0.5).toFixed(1)));
  const inc = () => setRunningCount((c) => c + 1);
  const dec = () => setRunningCount((c) => c - 1);
  const reset = () => {
    setRunningCount(0);
    setDecksRemaining(initialDecks);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-neutral-900/80 backdrop-blur">
        <button
          onClick={reset}
          className="px-3 py-2 rounded-2xl bg-neutral-800 active:scale-95 shadow hover:bg-neutral-700 transition"
          aria-label="Reset"
        >
          Reset
        </button>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-neutral-400">Running</div>
            <div className="text-xl font-bold tabular-nums">
              {runningCount >= 0 ? "+" : ""}
              {runningCount}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-neutral-400">True Count</div>
            <div className="text-3xl font-bold tabular-nums">
              {trueCount >= 0 ? "+" : ""}
              {trueCount.toFixed(1)}
            </div>
          </div>
          <button
            onClick={() => setShowSettings((s) => !s)}
            className="px-3 py-2 rounded-2xl bg-neutral-700 hover:bg-neutral-600 transition"
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 bg-neutral-900 border-b border-neutral-800 space-y-3">
          <div>
            <label className="block text-sm mb-1">Počiatočné balíčky</label>
            <input
              type="number"
              value={initialDecks}
              onChange={(e) => setInitialDecks(Number(e.target.value))}
              className="w-full p-2 rounded bg-neutral-800 text-white"
              min="1"
              step="0.5"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Jednotková stávka (€)</label>
            <input
              type="number"
              value={baseBet}
              onChange={(e) => setBaseBet(Number(e.target.value))}
              className="w-full p-2 rounded bg-neutral-800 text-white"
              min="1"
              step="0.5"
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
        <StatCard label="Decks left" value={decksRemaining} decimals={1} />

        <StatCard label="Stávka (€)" value={bet} decimals={1} />

        <button
          onClick={decDeck}
          className="px-6 py-4 rounded-2xl bg-emerald-600 shadow-lg hover:bg-emerald-500 active:scale-95 transition text-xl font-semibold"
        >
          −0.5 deck
        </button>
      </div>

      {/* Bottom controls */}
      <div className="sticky bottom-0 z-20 bg-neutral-900/90 backdrop-blur px-4 py-3">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <button
            onClick={dec}
            className="h-16 rounded-2xl bg-red-600 hover:bg-red-500 active:scale-95 shadow text-3xl font-bold"
            aria-label="Minus one"
          >
            −1
          </button>
          <button
            onClick={inc}
            className="h-16 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-95 shadow text-3xl font-bold"
            aria-label="Plus one"
          >
            +1
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sign = false, decimals = 0 }) {
  const display = useMemo(() => {
    const num = typeof value === "number" ? value : 0;
    const formatted = decimals > 0 ? num.toFixed(decimals) : Math.round(num).toString();
    const prefix = sign && num > 0 ? "+" : "";
    return `${prefix}${formatted}`;
  }, [value, sign, decimals]);

  return (
    <div className="rounded-2xl bg-neutral-900 p-4 shadow border border-neutral-800 w-full max-w-sm text-center">
      <div className="text-neutral-400 text-xs mb-1">{label}</div>
      <div className="text-4xl font-bold tabular-nums">{display}</div>
    </div>
  );
} 