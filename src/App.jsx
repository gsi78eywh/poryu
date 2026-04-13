/* -------------------------------------------------------------
   LOVE‑GIFT APP – ONE‑FILE (Landing → Cards → Food → Drink
   → Song → Quality → Ready‑Screen → Slideshow)
   ------------------------------------------------------------- */

import React, { useState, useEffect, useRef } from "react";
import "./App.css";

/* ---------------------------  DATA  --------------------------- */
// Songs (start at the chorus)
const SONGS = [
  { title: "Panaginip – Nicole", id: "k20L76PJ_0g", start: 45 },
  { title: "Mundo – IV of Spades", id: "gE0HabpmW0c", start: 92 },
  { title: "Araw Araw – Ben&Ben", id: "V4qjAyb4lNI", start: 68 },
  { title: "El Manu Tahanan", id: "BxPJRAbGOKQ", start: 60 }
];

// Food / Drink / Quality options (single‑choice)
const FOOD_OPTIONS   = ["Pizza", "Sushi", "Pasta", "Burger", "Salad"];
const DRINK_OPTIONS  = ["Coke", "Pepsi", "Water", "Lemonade", "Coffee"];
const QUALITY_OPTIONS = ["Kind", "Funny", "Smart", "Ambitious", "Caring"];

// Love cards (feel free to edit)
const LOVE_CARDS = [
  { message: "You are my first thought every morning" },
  { message: "You are my last thought every night" },
  { message: "Your smile brightens my darkest days" },
  { message: "I love you more than words can say" },
  { message: "You are my person, my soulmate" },
  { message: "Forever isn’t enough time with you" },
  { message: "I love you more each day 💕" }
];

// Slideshow photos (replace with yours)
const PHOTOS = [
  "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
  "https://images.unsplash.com/photo-1529619768328-e37af76c6fe5?w=800",
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
  "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800",
  "https://images.unsplash.com/photo-1529139574466-a302d2d3f529?w=800",
  "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?w=800",
  "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=800",
  "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800"
];

// Decorations for the slideshow
const FLOWERS = ["🌸","💗","🌺","💐","🌷","🌹","💮","🩷","🏵️","❣️"];
const HEARTS  = ["❤️","💕","💖","💗","💘","💝","🧡","💛"];
const WORDS   = ["My Love","Forever","Soulmate","Baby","I Love You","Always","Together","My Heart","You & Me","Beloved"];
const MAIN_MSG = ["I Love You","My Everything","Forever Yours","My Soulmate","My Baby","My Life","You & Me","Always & Forever","Together Forever","My Heart"];

/* ---------------------------  APP  --------------------------- */
export default function App() {
  /* ---- UI flow (stage) ---- */
  // 0–Landing, 1–Cards, 2–Food, 3–Drink, 4–Song, 5–Quality,
  // 6–Ready screen, 7–Slideshow
  const [stage, setStage] = useState(0);

  /* ---- Selections ---- */
  const [flipped, setFlipped] = useState([]);
  const [showNext, setShowNext] = useState(false);
  const [food, setFood] = useState(null);
  const [drink, setDrink] = useState(null);
  const [song, setSong] = useState(null);
  const [quality, setQuality] = useState(null);

  /* ---- Slideshow helpers ---- */
  const [photoIdx, setPhotoIdx] = useState(0);
  const slideRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [clickHearts, setClickHearts] = useState([]);

  /* ---- Cards (3‑D flip) ---- */
  const flipCard = i => {
    if (!flipped.includes(i)) {
      const nf = [...flipped, i];
      setFlipped(nf);
      if (nf.length === LOVE_CARDS.length) setTimeout(() => setShowNext(true), 500);
    }
  };

  /* ---- Slideshow image rotation ---- */
  useEffect(() => {
    if (stage === 7) {
      const it = setInterval(() => setPhotoIdx(i => (i + 1) % PHOTOS.length), 3500);
      return () => clearInterval(it);
    }
  }, [stage]);

  /* ---- Mouse tilt for the photo frame ---- */
  const onMouseMove = e => {
    const rect = slideRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;   // -6 … +6
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12; // -6 … +6
    setTilt({ x, y });
  };

  /* ---- Click‑generated hearts ---- */
  const spawnHeart = e => {
    const rect = slideRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const id = Date.now();
    setClickHearts(prev => [...prev, { id, x, y }]);
    setTimeout(() => setClickHearts(prev => prev.filter(h => h.id !== id)), 3800);
  };

  /* ==============================================================
                     RENDER BY STAGE
     ============================================================== */
  return (
    <div className="app">

      {/* ----------------  Subtle background ---------------- */}
      <div className="bg-aurora"></div>
      <div className="stars">
        {[...Array(60)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`
            }}
          />
        ))}
      </div>

      {/* ==================== 0 – LANDING ==================== */}
      {stage === 0 && (
        <div className="stage center">
          <div className="landing">
            <div className="gift-frame" onClick={() => setStage(1)}>
              <div className="gift-lid"></div>
              <div className="gift-body"><span className="heart-emoji">❤️</span></div>
            </div>
            <h1 className="main-title">Just For You</h1>
            <p className="subtitle">Tap the gift to open…</p>
            <button className="btn-primary" onClick={() => setStage(1)}>
              <span>Open Gift</span>
              <span className="btn-icon">🎁</span>
            </button>
          </div>
        </div>
      )}

      {/* ==================== 1 – LOVE CARDS ==================== */}
      {stage === 1 && (
        <div className="stage center">
          <h2 className="section-title">Tap each card 💕</h2>
          <p className="subtitle">Reveal my feelings</p>

          <div className="cards-grid">
            {LOVE_CARDS.map((c, i) => (
              <div
                key={i}
                className={`card ${flipped.includes(i) ? "flipped" : ""}`}
                onClick={() => flipCard(i)}
              >
                <div className="card-inner">
                  <div className="card-front"><span className="card-emoji">❤️</span></div>
                  <div className="card-back"><p>{c.message}</p></div>
                </div>
              </div>
            ))}
          </div>

          {showNext && (
            <button className="btn-next" onClick={() => setStage(2)}>
              Next ❤️
            </button>
          )}
        </div>
      )}

      {/* ==================== 2 – FOOD ==================== */}
      {stage === 2 && (
        <div className="stage center">
          <h2 className="section-title">Pick a food you love 🍕</h2>
          <div className="option-list">
            {FOOD_OPTIONS.map((item, i) => (
              <button
                key={i}
                className="option-btn"
                onClick={() => { setFood(item); setStage(3); }}
              >{item}</button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 3 – DRINK ==================== */}
      {stage === 3 && (
        <div className="stage center">
          <h2 className="section-title">Pick a drink you love 🥤</h2>
          <div className="option-list">
            {DRINK_OPTIONS.map((item, i) => (
              <button
                key={i}
                className="option-btn"
                onClick={() => { setDrink(item); setStage(4); }}
              >{item}</button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 4 – SONG ==================== */}
      {stage === 4 && (
        <div className="stage center">
          <h2 className="section-title">Pick a song for our story 🎵</h2>
          <div className="option-list">
            {SONGS.map((s, i) => (
              <button
                key={i}
                className="option-btn"
                onClick={() => { setSong(s); setStage(5); }}
              >{s.title}</button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 5 – QUALITY ==================== */}
      {stage === 5 && (
        <div className="stage center">
          <h2 className="section-title">Pick a quality you’d love in a man 🌟</h2>
          <div className="option-list">
            {QUALITY_OPTIONS.map((q, i) => (
              <button
                key={i}
                className="option-btn"
                onClick={() => setStage(6)}
              >{q}</button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 6 – READY SCREEN ==================== */}
      {stage === 6 && (
        <div className="stage center ready-stage">
          <h1 className="ready-title">Are you ready? 💖</h1>
          <p className="ready-subtitle">Let the love story begin…</p>
          <button className="btn-primary" onClick={() => setStage(7)}>
            Start Slideshow
          </button>
        </div>
      )}

      {/* ==================== 7 – SLIDESHOW ==================== */}
      {stage === 7 && (
        <div className="slideshow">

          {/* hidden YouTube player (autoplay from chorus) */}
          <iframe
            className="audio-player"
            src={`https://www.youtube.com/embed/${song?.id ?? SONGS[0].id}?autoplay=1&loop=1&playlist=${song?.id ?? SONGS[0].id}&start=${song?.start ?? SONGS[0].start}`}
            allow="autoplay"
            title="Music Player"
          />

          {/* floating hearts */}
          <div className="hearts-container">
            {[...Array(20)].map((_, i) => (
              <span
                key={i}
                className="heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                  fontSize: `${1 + Math.random() * 2}rem`
                }}
              >{HEARTS[i % HEARTS.length]}</span>
            ))}
          </div>

          {/* floating flowers */}
          <div className="flowers-container">
            {[...Array(15)].map((_, i) => (
              <span
                key={i}
                className="flower"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 7}s`,
                  animationDuration: `${8 + Math.random() * 4}s`,
                  fontSize: `${1 + Math.random() * 1.2}rem`
                }}
              >{FLOWERS[i % FLOWERS.length]}</span>
            ))}
          </div>

          {/* floating words */}
          <div className="floating-words-container">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="floating-word"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`
                }}
              >{WORDS[i % WORDS.length]}</span>
            ))}
          </div>

          {/* clickable layer – tilt + click‑hearts */}
          <div
            className="clickable-layer"
            onMouseMove={onMouseMove}
            onClick={spawnHeart}
            ref={slideRef}
          >

            {/* hearts generated by clicks */}
            {clickHearts.map(h => (
              <span
                key={h.id}
                className="heart-click"
                style={{
                  left: `${h.x}%`,
                  top: `${h.y}%`,
                  animationDuration: "3s"
                }}
              >❤️</span>
            ))}

            {/* ---------- CENTERED PHOTO WRAPPER ---------- */}
            <div className="photo-wrapper">
              <div
                className="photo-frame"
                style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
              >
                <div className="frame-inner">
                  <div className="frame-shine"></div>
                  <img
                    src={PHOTOS[photoIdx]}
                    alt="Us"
                    className="slide-img"
                    key={photoIdx}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* main romantic message (changes with each picture) */}
          <div className="main-message" key={photoIdx}>
            <h1>{MAIN_MSG[photoIdx % MAIN_MSG.length]}</h1>
          </div>

          {/* progress dots */}
          <div className="dots-container">
            {PHOTOS.map((_, i) => (
              <span
                key={i}
                className={`dot ${i === photoIdx ? "active" : ""}`}></span>
            ))}
          </div>

          {/* music bar fixed at the bottom */}
          <div className="music-bar">
            <span className="music-icon">🎧</span>
            <span className="music-title">{song?.title ?? SONGS[0].title}</span>
          </div>
        </div>
      )}
    </div>
  );
}
