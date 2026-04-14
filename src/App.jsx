/* -------------------------------------------------------------
   LOVE‑GIFT APP
   Stages:
     0  Splash (flowers + 3 love boxes)
     1  Landing (gift)
     2  Cards
     3  Food
     4  Drink
     5  Song
     6  Quality
     7  Lock Screen
     8  Love Letter
     9  Slideshow Intro
    10  Slideshow
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

/* ── OUR PHOTOS ── */
const PHOTOS = [
  "https://www.image2url.com/r2/default/images/1776159385541-d0ad1c35-dd04-4298-b852-599ed595be46.jpg",
  "https://www.image2url.com/r2/default/images/1776159464477-3e081f9f-1798-4a00-b747-cd0283a854d9.jpg",
  "https://www.image2url.com/r2/default/images/1776159508436-fdf78732-a6d5-40a7-9e43-1d26899854ad.jpg",
  "https://www.image2url.com/r2/default/images/1776159537543-801cc70e-a856-42ce-baff-36b3128fce0f.jpg",
  "https://www.image2url.com/r2/default/images/1776159577715-248c04d1-cf0b-41fc-953e-00f554ce4360.jpg",
  "https://www.image2url.com/r2/default/images/1776159604966-220fb4c0-05f5-4318-bd99-63f5dfabc051.jpg",
  "https://www.image2url.com/r2/default/images/1776159663027-d989cd84-8146-46d9-b6cf-0d9792b18680.jpg",
  "https://www.image2url.com/r2/default/images/1776159692586-fcec53e7-f71d-453c-8d58-cac29e30dbab.jpg",
  "https://www.image2url.com/r2/default/images/1776159723560-0bd877be-0c1b-4e4b-afe0-36aab6b0ba75.jpg",
  "https://www.image2url.com/r2/default/images/1776159750536-a11216d7-c35f-4a7b-8af8-9f922edbe358.jpg",
  "https://www.image2url.com/r2/default/images/1776161987231-49950032-539c-483e-94e5-561b368fde0b.jpg",
  "https://www.image2url.com/r2/default/images/1776162019860-61a641e6-1c8a-4932-b24e-bc97b21dcb59.jpg",
  "https://www.image2url.com/r2/default/images/1776162193822-ee21e333-12e9-4b05-a485-3c68530dc2b5.jpg",
  "https://www.image2url.com/r2/default/images/1776162220936-64a9c543-7b2f-4a95-82eb-374ae0010752.jpg",
  "https://www.image2url.com/r2/default/images/1776162249907-916fe1ca-eaca-4ad7-8df6-de34c702fbc6.jpg",
  "https://www.image2url.com/r2/default/images/1776162345597-93bc78e0-1a7f-4693-814c-5718bdb140a6.jpg",
  "https://www.image2url.com/r2/default/images/1776162375299-ea298a24-1efd-4ca6-817b-3832ced1bdea.jpg",
];

const CAPTIONS = [
  "Every photo with you is my favourite memory.",
  "You are my sunshine on the cloudiest days.",
  "I fall more in love with you in every single moment.",
  "In a world full of people, I'd always find you.",
  "Your smile is the most beautiful thing I've ever seen.",
  "Together is my favourite place to be.",
  "You make ordinary moments extraordinary.",
  "My heart found its home the moment it found you.",
  "I choose you  today, tomorrow, forever.",
  "Every second with you is worth a thousand without.",
  "You are everything I never knew I needed.",
  "My love for you grows deeper with every breath.",
  "You are my peace, my joy, my everything.",
  "I'm so grateful the universe gave me you.",
  "You and me  always and forever.",
  "No one else makes me feel the way you do.",
  "You are my greatest adventure.",
];

const SPLASH_FLOWERS = ["🌸","🌺","🌷","🌹","💐","🏵️","🌼","🌻","💮","🪷"];
const FLOWERS        = ["🌸","💗","🌺","💐","🌷","🌹","💮","🩷","🏵️","❣️"];
const HEARTS         = ["❤️","💕","💖","💗","💘","💝","🧡","💛"];
const WORDS          = ["My Love","Forever","Soulmate","Baby","I Love You","Always","Together","My Heart","You & Me","Beloved"];

const SPARK_COLORS = ["#ff9eb5","#b8b3d2","#d4af37","#ff7a9b","#ffc0cb","#e6b3ff"];

const STAGE_HINTS = {
  2: "Shhh… each card holds a secret 🤫",
  3: "Your choices say a lot about you 👀",
  4: "Almost like I already know… 😏",
  5: "The right song says what words never could 🎵",
  6: "This one might just surprise you 😉",
};

/* ── 3 LOVE BOXES shown on splash ── */
const LOVE_BOXES = [
  {
    icon: "🌹",
    label: "I'm so thankful for you",
    desc: "Having you in my life is the greatest gift I never thought I deserved. You showed me what real love feels like.",
  },
  {
    icon: "💫",
    label: "You make me a better person",
    desc: "Every day with you inspires me to be kinder, braver, and more loving. You bring out the best in me.",
  },
  {
    icon: "💌",
    label: "My love for you has no end",
    desc: "No distance, no argument, no bad day could ever change how deeply and completely I love you.",
  },
];

const LETTER_TITLE = "My Dearest Babii,";
const LETTER_PARA1 =
  "I want you to know how deeply I love you. From the moment we met during my first year, every day with you has become a cherished memory that only grows stronger. Your laughter, your smile, the way you understand me without words — these are the things that make my heart race. I promise to treasure every moment we share and to keep building our future together.";
const LETTER_PARA2 =
  "I'm also truly sorry for the hurt I caused you these last weeks. I regret every painful word and action, and I'm especially ashamed of how that may have affected your friends. I promise you, and myself, that I will never repeat those mistakes. I'm committed to being the best version of me for you, to love you more fully, and to show you the respect and care you deserve every single day.";

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
  const [stage, setStage]           = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  /* Cards */
  const [flipped, setFlipped]   = useState([]);
  const [showNext, setShowNext] = useState(false);

  /* Selections */
  const [song, setSong] = useState(null);

  /* Lock / sparks */
  const [locking, setLocking]     = useState(false);
  const [sparks, setSparks]       = useState([]);
  const [showFlash, setShowFlash] = useState(false);
  const lockOriginRef             = useRef({ x: "50%", y: "50%" });

  /* Love letter typewriter */
  const [typedTitle, setTypedTitle]       = useState("");
  const [titleDone, setTitleDone]         = useState(false);
  const [showPara1, setShowPara1]         = useState(false);
  const [showPara2, setShowPara2]         = useState(false);
  const [showLetterBtn, setShowLetterBtn] = useState(false);

  /* Slideshow */
  const [photoIdx, setPhotoIdx]       = useState(0);
  const [clickHearts, setClickHearts] = useState([]);
  const [tilt, setTilt]               = useState({ x: 0, y: 0 });
  const frameRef                      = useRef(null);

  /* YouTube player ref for programmatic play */
  const ytRef = useRef(null);

  /* ── Effects ── */

  /* Slideshow intro → slideshow */
  useEffect(() => {
    if (stage !== 9) return;
    const t = setTimeout(() => setStage(10), 7200);
    return () => clearTimeout(t);
  }, [stage]);

  /* Photo rotation */
  useEffect(() => {
    if (stage !== 10) return;
    const id = setInterval(() => setPhotoIdx((p) => (p + 1) % PHOTOS.length), 3500);
    return () => clearInterval(id);
  }, [stage]);

  /* Typewriter */
  useEffect(() => {
    if (stage !== 8) return;
    setTypedTitle(""); setTitleDone(false);
    setShowPara1(false); setShowPara2(false); setShowLetterBtn(false);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTypedTitle(LETTER_TITLE.slice(0, i));
      if (i >= LETTER_TITLE.length) {
        clearInterval(t);
        setTitleDone(true);
        setTimeout(() => setShowPara1(true), 500);
        setTimeout(() => setShowPara2(true), 1900);
        setTimeout(() => setShowLetterBtn(true), 3400);
      }
    }, 60);
    return () => clearInterval(t);
  }, [stage]);

  /* ── Handlers ── */

  const flipCard = (i) => {
    if (flipped.includes(i)) return;
    const next = [...flipped, i];
    setFlipped(next);
    if (next.length === LOVE_CARDS.length) setTimeout(() => setShowNext(true), 500);
  };

  const handleUnlock = (e) => {
    if (locking) return;
    const rect = e.currentTarget.getBoundingClientRect();
    lockOriginRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    setLocking(true);

    const newSparks = Array.from({ length: 44 }, (_, idx) => {
      const angle    = (idx / 44) * 360;
      const distance = 80 + Math.random() * 150;
      const rad      = (angle * Math.PI) / 180;
      return {
        id:    idx,
        tx:    `${Math.cos(rad) * distance}px`,
        ty:    `${Math.sin(rad) * distance}px`,
        color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
        size:  4 + Math.random() * 10,
        emoji: Math.random() > 0.65
          ? ["✨","💖","🌸","⭐","💫","🩷"][Math.floor(Math.random() * 6)]
          : null,
      };
    });

    setSparks(newSparks);
    setShowFlash(true);
    setTimeout(() => setSparks([]),      1100);
    setTimeout(() => setShowFlash(false), 700);
    setTimeout(() => { setLocking(false); setStage(8); }, 950);
  };

  const onFrameMouseMove = (e) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - rect.left) / rect.width  - 0.5) * 14,
      y: ((e.clientY - rect.top)  / rect.height - 0.5) * 14,
    });
  };
  const onFrameMouseLeave = () => setTilt({ x: 0, y: 0 });

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
    setTimeout(() => setClickHearts((p) => p.filter((h) => h.id !== id)), 700);
  };

  /* ── RENDER ── */
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

      {/* Global sparks */}
      {sparks.length > 0 && (
        <div className="spark-container">
          {sparks.map((s) =>
            s.emoji ? (
              <span
                key={s.id} className="star-particle"
                style={{
                  left: lockOriginRef.current.x, top: lockOriginRef.current.y,
                  "--tx": s.tx, "--ty": s.ty, fontSize: `${s.size * 1.6}px`,
                }}
              >{s.emoji}</span>
            ) : (
              <div
                key={s.id} className="spark-particle"
                style={{
                  left: lockOriginRef.current.x, top: lockOriginRef.current.y,
                  width: s.size, height: s.size, background: s.color,
                  "--tx": s.tx, "--ty": s.ty,
                  animationDuration: `${0.7 + Math.random() * 0.4}s`,
                }}
              />
            )
          )}
        </div>
      )}
      {showFlash && <div className="unlock-flash" />}

      {/* Confirm overlay */}
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
              <button className="btn-yes" onClick={() => { setConfirmOpen(false); setStage(2); }}>
                Yes, I'm ready 💕
              </button>
              <button className="btn-no" onClick={() => setConfirmOpen(false)}>
                Not yet…
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 0 – SPLASH ==================== */}
      {stage === 0 && (
        <div className="splash">

          {/* Floating flowers */}
          <div className="splash-flowers">
            {[...Array(28)].map((_, i) => (
              <span
                key={i} className="splash-flower"
                style={{
                  left:              `${Math.random() * 100}%`,
                  fontSize:          `${1.2 + Math.random() * 2}rem`,
                  animationDelay:    `${Math.random() * 8}s`,
                  animationDuration: `${7 + Math.random() * 6}s`,
                }}
              >
                {SPLASH_FLOWERS[i % SPLASH_FLOWERS.length]}
              </span>
            ))}
          </div>

          {/* Surprise title */}
          <div className="splash-surprise">
            <p className="splash-surprise-pre">⸻ a message from the heart ⸻</p>
            <h1 className="splash-surprise-title">You are my everything</h1>
            <p className="splash-surprise-sub">
              Before anything else… I just want you to know this.
            </p>
          </div>

          {/* 3 Love boxes */}
          <div className="splash-boxes">
            {LOVE_BOXES.map((box, i) => (
              <div key={i} className="splash-box">
                <span className="splash-box-icon">{box.icon}</span>
                <div className="splash-box-text">
                  <p className="splash-box-label">{box.label}</p>
                  <p className="splash-box-desc">{box.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Enter button */}
          <div className="splash-enter-wrap">
            <button className="splash-enter" onClick={() => setStage(1)}>
              Open your gift 🎁
            </button>
            <span className="splash-enter-hint">something special is waiting for you…</span>
          </div>
        </div>
      )}

      {/* ==================== 1 – LANDING ==================== */}
      {stage === 1 && (
        <div className="stage center">
          <div className="landing">
            <p className="landing-hint">✨ Something precious is waiting for you…</p>
            <div className="gift-frame" onClick={() => setConfirmOpen(true)}>
              <div className="gift-lid" />
              <div className="gift-body"><span className="heart-emoji">❤️</span></div>
            </div>
            <h1 className="main-title">Just For You</h1>
            <p className="subtitle">Tap the gift to open…</p>
            <button className="btn-primary" onClick={() => setConfirmOpen(true)}>
              <span>Open Gift</span><span className="btn-icon">🎁</span>
            </button>
          </div>
        </div>
      )}

      {/* ==================== 2 – LOVE CARDS ==================== */}
      {stage === 2 && (
        <div className="stage center">
          <HintBadge text={STAGE_HINTS[2]} />
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
                  <div className="card-front"><span className="card-emoji">❤️</span></div>
                  <div className="card-back"><p>{c.message}</p></div>
                </div>
              </div>
            ))}
          </div>
          {showNext && (
            <button className="btn-next" onClick={() => setStage(3)}>Next ❤️</button>
          )}
        </div>
      )}

      {/* ==================== 3 – FOOD ==================== */}
      {stage === 3 && (
        <div className="stage center">
          <HintBadge text={STAGE_HINTS[3]} />
          <h2 className="section-title">Pick a food you love 🍕</h2>
          <p className="stage-hint">I bet I already know which one…</p>
          <div className="option-list">
            {FOOD_OPTIONS.map((item, i) => (
              <button key={i} className="option-btn" onClick={() => setStage(4)}>{item}</button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 4 – DRINK ==================== */}
      {stage === 4 && (
        <div className="stage center">
          <HintBadge text={STAGE_HINTS[4]} />
          <h2 className="section-title">Pick a drink you love 🥤</h2>
          <p className="stage-hint">Your favourite, always 🫶</p>
          <div className="option-list">
            {DRINK_OPTIONS.map((item, i) => (
              <button key={i} className="option-btn" onClick={() => setStage(5)}>{item}</button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 5 – SONG ==================== */}
      {stage === 5 && (
        <div className="stage center">
          <HintBadge text={STAGE_HINTS[5]} />
          <h2 className="section-title">Pick a song for our story 🎵</h2>
          <p className="stage-hint">This one will play just for you…</p>
          <div className="option-list">
            {SONGS.map((s, i) => (
              <button key={i} className="option-btn" onClick={() => { setSong(s); setStage(6); }}>
                {s.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 6 – QUALITY ==================== */}
      {stage === 6 && (
        <div className="stage center">
          <HintBadge text={STAGE_HINTS[6]} />
          <h2 className="section-title">A quality you'd love in a man 🌟</h2>
          <p className="stage-hint">Almost there… something special is waiting 💌</p>
          <div className="option-list">
            {QUALITY_OPTIONS.map((q, i) => (
              <button key={i} className="option-btn" onClick={() => setStage(7)}>{q}</button>
            ))}
          </div>
        </div>
      )}

      {/* ==================== 7 – LOCK SCREEN ==================== */}
      {stage === 7 && (
        <div className="lock-screen">
          <HintBadge text="Something precious lies beyond this door…" />
          <div className="lock-glow" onClick={handleUnlock}>
            <span className={`lock-emoji ${locking ? "shaking" : ""}`}>🔒</span>
          </div>
          <h2 className="lock-title">Click to Unlock</h2>
          <p className="lock-sub">
            Behind this lock is a message written straight from the heart.
            <br />Are you ready to receive it?
          </p>
          <p className="lock-tap-hint">tap the lock to open ✨</p>
        </div>
      )}

      {/* ==================== 8 – LOVE LETTER ==================== */}
      {stage === 8 && (
        <div className="stage center">
          <div className="letter-wrapper">
            <div className="typed-title">
              <span>{typedTitle}</span>
              {!titleDone && <span className="cursor-blink" />}
            </div>
            <p className={`letter-para ${showPara1 ? "visible" : ""}`}>{LETTER_PARA1}</p>
            <p className={`letter-para ${showPara2 ? "visible" : ""}`}>{LETTER_PARA2}</p>
            <div className={`letter-cta ${showLetterBtn ? "visible" : ""}`}>
              <button className="btn-primary" onClick={() => setStage(9)}>
                <span>See what's next</span>
                <span className="btn-icon">💌</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 9 – SLIDESHOW INTRO ==================== */}
      {stage === 9 && (
        <div className="slideshow-intro">
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

          <div className="intro-lines-wrap">
            <p className="intro-line l1">Before you see this…</p>
            <p className="intro-line l2">I want you to know…</p>
            <p className="intro-line l3">You are my whole world. 🌍</p>
            <p className="intro-line l4">💕</p>
          </div>

          <div className="intro-progress-wrap">
            <div className="intro-progress">
              <div className="intro-progress-bar" />
            </div>
            <span className="intro-progress-label">preparing something beautiful for you…</span>
          </div>

          <button className="intro-skip" onClick={() => setStage(10)}>skip intro →</button>
        </div>
      )}

      {/* ==================== 10 – SLIDESHOW ==================== */}
      {stage === 10 && (
        <div className="slideshow">

          {/*
            autoplay=1 plays as soon as the iframe loads.
            The transition to this stage is triggered by a user
            click (on the intro skip or after the progress bar),
            which satisfies the browser's autoplay gesture policy.
          */}
          <iframe
            ref={ytRef}
            className="audio-player"
            src={`https://www.youtube.com/embed/${song?.id ?? SONGS[0].id}?autoplay=1&mute=0&loop=1&playlist=${song?.id ?? SONGS[0].id}&start=${song?.start ?? SONGS[0].start}&enablejsapi=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Music Player"
          />

          {/* TOP: song pills */}
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
            <div className="slideshow-caption" key={`cap-${photoIdx}`}>
              <span className="caption-icon">💌</span>
              <p className="caption-text">{CAPTIONS[photoIdx % CAPTIONS.length]}</p>
            </div>

            <div className="photo-wrapper">
              <div
                ref={frameRef}
                className="photo-frame"
                onMouseMove={onFrameMouseMove}
                onMouseLeave={onFrameMouseLeave}
                onClick={spawnHeart}
                style={{
                  transform:  `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
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
                {clickHearts.map((h) => (
                  <span
                    key={h.id} className="heart-click"
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  >❤️</span>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM: dots */}
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
              >{HEARTS[i % HEARTS.length]}</span>
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
              >{FLOWERS[i % FLOWERS.length]}</span>
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
              >{WORDS[i % WORDS.length]}</span>
            ))}
          </div>

          {/* Music bar */}
          <div className="music-bar">
            <span className="music-icon">🎧</span>
            <span>{song?.title ?? SONGS[0].title}</span>
          </div>
        </div>
      )}

    </div>
  );
}