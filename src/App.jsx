/* -------------------------------------------------------------
   LOVE‑GIFT APP
   Stages: 0 Landing → 1 Cards → 2 Food → 3 Drink → 4 Song
           → 5 Quality → 6 Lock Screen → 7 Love Letter
           → 8 Slideshow Intro → 9 Slideshow
   ------------------------------------------------------------- */

import React, { useState, useEffect, useRef } from "react";
import "./App.css";

/* ----------------------------------------------------------------
   DATA
---------------------------------------------------------------- */
const SONGS = [
  { title: "Panaginip – Nicole",   id: "k20L76PJ_0g", start: 45 },
  { title: "Mundo – IV of Spades", id: "gE0HabpmW0c", start: 92 },
  { title: "Araw Araw – Ben&Ben",  id: "V4qjAyb4lNI", start: 68 },
  { title: "El Manu Tahanan",      id: "BxPJRAbGOKQ", start: 60 },
];

const FOOD_OPTIONS    = ["Pizza", "Sushi", "Pasta", "Burger", "Salad"];
const DRINK_OPTIONS   = ["Coke", "Pepsi", "Water", "Lemonade", "Coffee"];
const QUALITY_OPTIONS = ["Kind", "Funny", "Smart", "Ambitious", "Caring"];

const LOVE_CARDS = [
  { message: "You are my first thought every morning" },
  { message: "You are my last thought every night" },
  { message: "Your smile brightens my darkest days" },
  { message: "I love you more than words can say" },
  { message: "You are my person, my soulmate" },
  { message: "Forever isn't enough time with you" },
  { message: "I love you more each day 💕" },
];

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
  "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800",
];

const CAPTIONS = [
  "Since the first time I saw you, my heart has been yours forever.",
  "Every moment with you feels like a beautiful dream I never want to wake from.",
  "You are my everything, my inspiration, and the reason I wake up smiling.",
  "In a world full of people, my eyes will always search for you.",
  "Your love is the greatest adventure I have ever known.",
  "Together is my favourite place to be — always and forever.",
  "I fall in love with you a little more with every passing day.",
  "You make ordinary moments feel like the most magical memories.",
  "My heart found its home the moment it found you.",
  "I choose you — today, tomorrow, and every day after that.",
];

const FLOWERS = ["🌸","💗","🌺","💐","🌷","🌹","💮","🩷","🏵️","❣️"];
const HEARTS  = ["❤️","💕","💖","💗","💘","💝","🧡","💛"];
const WORDS   = ["My Love","Forever","Soulmate","Baby","I Love You","Always","Together","My Heart","You & Me","Beloved"];

/* Spark colours */
const SPARK_COLORS = ["#ff9eb5","#b8b3d2","#d4af37","#ff7a9b","#ffc0cb","#e6b3ff"];

/* Hint messages per stage */
const STAGE_HINTS = {
  1: "Shhh… each card holds a secret 🤫",
  2: "Your choices say a lot about you 👀",
  3: "Almost like I already know… 😏",
  4: "The right song says what words never could 🎵",
  5: "This one might just surprise you 😉",
};

/* ----------------------------------------------------------------
   HELPERS
---------------------------------------------------------------- */
function HintBadge({ text }) {
  return <div className="hint-badge">✨ {text}</div>;
}

/* ----------------------------------------------------------------
   APP
---------------------------------------------------------------- */
export default function App() {
  /* ---- Stage ---- */
  const [stage, setStage] = useState(0);

  /* ---- Landing confirm overlay ---- */
  const [confirmOpen, setConfirmOpen] = useState(false);

  /* ---- Cards ---- */
  const [flipped, setFlipped]   = useState([]);
  const [showNext, setShowNext] = useState(false);

  /* ---- Selections ---- */
  const [song, setSong]       = useState(null);

  /* ---- Lock screen ---- */
  const [locking, setLocking]   = useState(false);   // shake animation
  const [sparks, setSparks]     = useState([]);
  const [showFlash, setShowFlash] = useState(false);
  const lockOriginRef             = useRef({ x: "50%", y: "50%" });

  /* ---- Love letter typewriter ---- */
  const LETTER_TITLE = "My Dearest Babii,";
  const LETTER_PARA1 = "I want you to know how deeply I love you. From the moment we met during my first year, every day with you has become a cherished memory that only grows stronger. Your laughter, your smile, the way you understand me without words — these are the things that make my heart race. I promise to treasure every moment we share and to keep building our future together.";
  const LETTER_PARA2 = "I'm also truly sorry for the hurt I caused you these last weeks. I regret every painful word and action, and I'm especially ashamed of how that may have affected your friends. I promise you, and myself, that I will never repeat those mistakes. I'm committed to being the best version of me for you, to love you more fully, and to show you the respect and care you deserve every single day.";

  const [typedTitle, setTypedTitle]       = useState("");
  const [titleDone, setTitleDone]         = useState(false);
  const [showPara1, setShowPara1]         = useState(false);
  const [showPara2, setShowPara2]         = useState(false);
  const [showLetterBtn, setShowLetterBtn] = useState(false);

  /* ---- Slideshow ---- */
  const [photoIdx, setPhotoIdx]       = useState(0);
  const [clickHearts, setClickHearts] = useState([]);
  const [tilt, setTilt]               = useState({ x: 0, y: 0 });
  const frameRef                      = useRef(null);

  /* ================================================================
     EFFECTS
  ================================================================ */

  /* Auto-advance slideshow intro → slideshow */
  useEffect(() => {
    if (stage !== 8) return;
    const t = setTimeout(() => setStage(9), 7200);
    return () => clearTimeout(t);
  }, [stage]);

  /* Slideshow photo rotation */
  useEffect(() => {
    if (stage !== 9) return;
    const id = setInterval(() => setPhotoIdx((p) => (p + 1) % PHOTOS.length), 3500);
    return () => clearInterval(id);
  }, [stage]);

  /* Typewriter effect for love letter */
  useEffect(() => {
    if (stage !== 7) return;
    setTypedTitle(""); setTitleDone(false);
    setShowPara1(false); setShowPara2(false); setShowLetterBtn(false);

    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTypedTitle(LETTER_TITLE.slice(0, i));
      if (i >= LETTER_TITLE.length) {
        clearInterval(timer);
        setTitleDone(true);
        setTimeout(() => setShowPara1(true), 500);
        setTimeout(() => setShowPara2(true), 1900);
        setTimeout(() => setShowLetterBtn(true), 3400);
      }
    }, 60);

    return () => clearInterval(timer);
  }, [stage]);

  /* ================================================================
     HANDLERS
  ================================================================ */

  /* Card flip */
  const flipCard = (i) => {
    if (flipped.includes(i)) return;
    const next = [...flipped, i];
    setFlipped(next);
    if (next.length === LOVE_CARDS.length) setTimeout(() => setShowNext(true), 500);
  };

  /* Lock — generate sparks from the centre of the lock icon */
  const handleUnlock = (e) => {
    if (locking) return;

    /* record click origin for spark centre */
    const rect = e.currentTarget.getBoundingClientRect();
    lockOriginRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top  + rect.height / 2,
    };

    setLocking(true);

    /* build spark particles */
    const newSparks = Array.from({ length: 40 }, (_, idx) => {
      const angle    = (idx / 40) * 360;
      const distance = 80 + Math.random() * 140;
      const rad      = (angle * Math.PI) / 180;
      return {
        id:    idx,
        tx:    `${Math.cos(rad) * distance}px`,
        ty:    `${Math.sin(rad) * distance}px`,
        color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        size:  4 + Math.random() * 10,
        emoji: Math.random() > 0.7
          ? ["✨","💖","🌸","⭐","💫"][Math.floor(Math.random() * 5)]
          : null,
      };
    });

    setSparks(newSparks);
    setShowFlash(true);

    setTimeout(() => setSparks([]),           1100);
    setTimeout(() => setShowFlash(false),     700);
    setTimeout(() => {
      setLocking(false);
      setStage(7);
    }, 950);
  };

  /* Photo frame tilt */
  const onFrameMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 14,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 14,
    });
  };
  const onFrameMouseLeave = () => setTilt({ x: 0, y: 0 });

  /* Click hearts on photo */
  const spawnHeart = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const id   = Date.now();
    setClickHearts((prev) => [
      ...prev,
      {
        id,
        x: ((e.clientX - rect.left) / rect.width)  * 100,
        y: ((e.clientY - rect.top)  / rect.height) * 100,
      },
    ]);
    setTimeout(() => setClickHearts((prev) => prev.filter((h) => h.id !== id)), 700);
  };

  /* ================================================================
     RENDER
  ================================================================ */
  return (
    <div className="app">

      {/* Background */}
      <div className="bg-aurora" />
      <div className="stars">
        {[...Array(60)].map((_, i) => (
          <div
            key={i} className="star"
            style={{
              left:           `${Math.random() * 100}%`,
              top:            `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              width:          `${Math.random() * 2 + 1}px`,
              height:         `${Math.random() * 2 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* ── SPARK PARTICLES (global overlay) ── */}
      {sparks.length > 0 && (
        <div className="spark-container">
          {sparks.map((s) =>
            s.emoji ? (
              <span
                key={s.id}
                className="star-particle"
                style={{
                  left:   lockOriginRef.current.x,
                  top:    lockOriginRef.current.y,
                  "--tx": s.tx, "--ty": s.ty,
                  fontSize: `${s.size * 1.6}px`,
                }}
              >
                {s.emoji}
              </span>
            ) : (
              <div
                key={s.id}
                className="spark-particle"
                style={{
                  left:             lockOriginRef.current.x,
                  top:              lockOriginRef.current.y,
                  width:            s.size,
                  height:           s.size,
                  background:       s.color,
                  "--tx":           s.tx,
                  "--ty":           s.ty,
                  animationDuration:`${0.7 + Math.random() * 0.4}s`,
                }}
              />
            )
          )}
        </div>
      )}

      {/* White flash */}
      {showFlash && <div className="unlock-flash" />}

      {/* ── CONFIRM OVERLAY (Landing "are you sure?") ── */}
      {confirmOpen && (
        <div className="confirm-overlay">
          <div className="confirm-bubble">
            <span className="confirm-emoji">🎁</span>
            <p className="confirm-title">Are you sure you're ready?</p>
            <p className="confirm-sub">
              Once you open this, your heart might just melt a little…
              <br />No pressure though 😊
            </p>
            <div className="confirm-btns">
              <button
                className="btn-yes"
                onClick={() => { setConfirmOpen(false); setStage(1); }}
              >
                Yes, I'm ready 💕
              </button>
              <button
                className="btn-no"
                onClick={() => setConfirmOpen(false)}
              >
                Not yet…
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 0 – LANDING ==================== */}
      {stage === 0 && (
        <div className="stage center">
          <div className="landing">
            <p className="landing-hint">✨ Something precious is waiting for you…</p>

            <div className="gift-frame" onClick={() => setConfirmOpen(true)}>
              <div className="gift-lid" />
              <div className="gift-body">
                <span className="heart-emoji">❤️</span>
              </div>
            </div>

            <h1 className="main-title">Just For You</h1>
            <p className="subtitle">Tap the gift to open…</p>

            <button className="btn-primary" onClick={() => setConfirmOpen(true)}>
              <span>Open Gift</span>
              <span className="btn-icon">🎁</span>
            </button>
          </div>
        </div>
      )}

      {/* ==================== 1 – LOVE CARDS ==================== */}
      {stage === 1 && (
        <div className="stage center">
          <HintBadge text={STAGE_HINTS[1]} />
          <h2 className="section-title">Tap each card 💕</h2>
          <p className="stage-hint">
            {flipped.length === 0
              ? "Go ahead… don't be shy 😊"
              : flipped.length < LOVE_CARDS.length
              ? `${LOVE_CARDS.length - flipped.length} more secrets left…`
              : "You found them all 🥹"}
          </p>

          <div className="cards-grid">
            {LOVE_CARDS.map((c, i) => (
              <div
                key={i}
                className={`card ${flipped.includes(i) ? "flipped" : ""}`}
                onClick={() => flipCard(i)}
              >
                <div className="card-inner">
                  <div className="card-front">
                    <span className="card-emoji">❤️</span>
                  </div>
                  <div className="card-back">
                    <p>{c.message}</p>
                  </div>
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
          <HintBadge text={STAGE_HINTS[2]} />
          <h2 className="section-title">Pick a food you love 🍕</h2>
          <p className="stage-hint">I bet I already know which one…</p>
          <div className="option-list">
            {FOOD_OPTIONS.map((item, i) => (
              <button
                key={i} className="option-btn"
                onClick={() => setStage(3)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 3 – DRINK ==================== */}
      {stage === 3 && (
        <div className="stage center">
          <HintBadge text={STAGE_HINTS[3]} />
          <h2 className="section-title">Pick a drink you love 🥤</h2>
          <p className="stage-hint">Your favourite, always 🫶</p>
          <div className="option-list">
            {DRINK_OPTIONS.map((item, i) => (
              <button
                key={i} className="option-btn"
                onClick={() => setStage(4)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 4 – SONG ==================== */}
      {stage === 4 && (
        <div className="stage center">
          <HintBadge text={STAGE_HINTS[4]} />
          <h2 className="section-title">Pick a song for our story 🎵</h2>
          <p className="stage-hint">This one will play just for you…</p>
          <div className="option-list">
            {SONGS.map((s, i) => (
              <button
                key={i} className="option-btn"
                onClick={() => { setSong(s); setStage(5); }}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 5 – QUALITY ==================== */}
      {stage === 5 && (
        <div className="stage center">
          <HintBadge text={STAGE_HINTS[5]} />
          <h2 className="section-title">A quality you'd love in a man 🌟</h2>
          <p className="stage-hint">Almost there… something special is waiting 💌</p>
          <div className="option-list">
            {QUALITY_OPTIONS.map((q, i) => (
              <button
                key={i} className="option-btn"
                onClick={() => setStage(6)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 6 – LOCK SCREEN ==================== */}
      {stage === 6 && (
        <div className="lock-screen">
          <HintBadge text="Something precious lies beyond this door…" />

          <div className="lock-glow" onClick={handleUnlock}>
            <span className={`lock-emoji ${locking ? "shaking" : ""}`}>
              🔒
            </span>
          </div>

          <h2 className="lock-title">Click to Unlock</h2>
          <p className="lock-sub">
            Behind this lock is a message written straight from the heart.
            <br />Are you ready to receive it?
          </p>
          <p className="lock-tap-hint">tap the lock to open ✨</p>
        </div>
      )}

      {/* ==================== 7 – LOVE LETTER ==================== */}
      {stage === 7 && (
        <div className="stage center">
          <div className="letter-wrapper">
            {/* Typewriter title */}
            <div className="typed-title">
              <span>{typedTitle}</span>
              {!titleDone && <span className="cursor-blink" />}
            </div>

            {/* Paragraph 1 */}
            <p className={`letter-para ${showPara1 ? "visible" : ""}`}>
              {LETTER_PARA1}
            </p>

            {/* Paragraph 2 */}
            <p className={`letter-para ${showPara2 ? "visible" : ""}`}>
              {LETTER_PARA2}
            </p>

            {/* CTA */}
            <div className={`letter-cta ${showLetterBtn ? "visible" : ""}`}>
              <button className="btn-primary" onClick={() => setStage(8)}>
                <span>See what's next</span>
                <span className="btn-icon">💌</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 8 – SLIDESHOW INTRO ==================== */}
      {stage === 8 && (
        <div className="slideshow-intro">

          {/* floating hearts in background */}
          <div className="intro-heart-bg">
            {[...Array(18)].map((_, i) => (
              <span
                key={i} className="intro-bg-heart"
                style={{
                  left:              `${Math.random() * 100}%`,
                  fontSize:          `${1 + Math.random() * 1.5}rem`,
                  animationDelay:    `${Math.random() * 6}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                }}
              >
                {HEARTS[i % HEARTS.length]}
              </span>
            ))}
          </div>

          {/* Sequential text reveal */}
          <div className="intro-lines-wrap">
            <p className="intro-line l1">Before you see this…</p>
            <p className="intro-line l2">I want you to know…</p>
            <p className="intro-line l3">You are my whole world. 🌍</p>
            <p className="intro-line l4">💕</p>
          </div>

          {/* Progress bar */}
          <div className="intro-progress-wrap">
            <div className="intro-progress">
              <div className="intro-progress-bar" />
            </div>
            <span className="intro-progress-label">preparing something beautiful for you…</span>
          </div>

          {/* Skip button */}
          <button className="intro-skip" onClick={() => setStage(9)}>
            skip intro →
          </button>
        </div>
      )}

      {/* ==================== 9 – SLIDESHOW ==================== */}
      {stage === 9 && (
        <div className="slideshow">

          {/* Hidden YouTube player */}
          <iframe
            className="audio-player"
            src={`https://www.youtube.com/embed/${song?.id ?? SONGS[0].id}?autoplay=1&loop=1&playlist=${song?.id ?? SONGS[0].id}&start=${song?.start ?? SONGS[0].start}`}
            allow="autoplay"
            title="Music Player"
          />

          {/* TOP: animated song pills */}
          <div className="song-ticker">
            {SONGS.map((s, i) => {
              const isActive = (song?.id ?? SONGS[0].id) === s.id;
              return (
                <div key={i} className={`song-pill ${isActive ? "active-song" : ""}`}>
                  {isActive && <span className="pill-note">🎵</span>}
                  {s.title}
                </div>
              );
            })}
          </div>

          {/* MIDDLE: caption (left) + photo (center) */}
          <div className="slideshow-main">

            {/* Caption — LEFT, changes per slide */}
            <div className="slideshow-caption" key={photoIdx}>
              <span className="caption-icon">💌</span>
              <p className="caption-text">
                {CAPTIONS[photoIdx % CAPTIONS.length]}
              </p>
            </div>

            {/* Photo — CENTER */}
            <div className="photo-wrapper">
              <div
                ref={frameRef}
                className="photo-frame"
                onMouseMove={onFrameMouseMove}
                onMouseLeave={onFrameMouseLeave}
                onClick={spawnHeart}
                style={{
                  transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                  transition: "transform 0.1s ease",
                }}
              >
                <div className="frame-inner">
                  <div className="frame-shine" />
                  <img
                    key={photoIdx}
                    src={PHOTOS[photoIdx]}
                    alt="Us"
                    className="slide-img"
                  />
                </div>

                {/* click hearts */}
                {clickHearts.map((h) => (
                  <span
                    key={h.id} className="heart-click"
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  >
                    ❤️
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM: progress dots */}
          <div className="dots-container">
            {PHOTOS.map((_, i) => (
              <span key={i} className={`dot ${i === photoIdx ? "active" : ""}`} />
            ))}
          </div>

          {/* Floating hearts */}
          <div className="hearts-container">
            {[...Array(20)].map((_, i) => (
              <span
                key={i} className="heart"
                style={{
                  left:              `${Math.random() * 100}%`,
                  animationDelay:    `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 4}s`,
                  fontSize:          `${1 + Math.random() * 2}rem`,
                }}
              >
                {HEARTS[i % HEARTS.length]}
              </span>
            ))}
          </div>

          {/* Floating flowers */}
          <div className="flowers-container">
            {[...Array(15)].map((_, i) => (
              <span
                key={i} className="flower"
                style={{
                  left:              `${Math.random() * 100}%`,
                  animationDelay:    `${Math.random() * 7}s`,
                  animationDuration: `${8 + Math.random() * 4}s`,
                  fontSize:          `${1 + Math.random() * 1.2}rem`,
                }}
              >
                {FLOWERS[i % FLOWERS.length]}
              </span>
            ))}
          </div>

          {/* Floating words */}
          <div className="floating-words-container">
            {[...Array(12)].map((_, i) => (
              <span
                key={i} className="floating-word"
                style={{
                  left:              `${Math.random() * 90}%`,
                  top:               `${Math.random() * 90}%`,
                  animationDelay:    `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`,
                }}
              >
                {WORDS[i % WORDS.length]}
              </span>
            ))}
          </div>

          {/* Fixed music bar */}
          <div className="music-bar">
            <span className="music-icon">🎧</span>
            <span>{song?.title ?? SONGS[0].title}</span>
          </div>
        </div>
      )}

    </div>
  );
}