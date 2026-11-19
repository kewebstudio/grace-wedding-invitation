
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WEDDING_DATE = new Date("2027-02-18T10:30:00+05:30").getTime();

const burstParticles = Array.from({ length: 48 }, (_, index) => {
  const angle = (index / 48) * Math.PI * 2;
  const distance = 95 + (index % 5) * 22;

  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: (index % 8) * 0.035,
    symbol:
      index % 5 === 0
        ? "♥"
        : index % 3 === 0
        ? "✧"
        : "✦",
    size: index % 4 === 0 ? 21 : index % 3 === 0 ? 17 : 13,
  };
});

const extraGlitter = Array.from({ length: 28 }, (_, index) => {
  const angle = (index / 28) * Math.PI * 2;
  const distance = 65 + (index % 5) * 23;

  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: (index % 6) * 0.045,
  };
});

function getTimeLeft() {
  const difference = Math.max(0, WEDDING_DATE - Date.now());

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

/* SCRATCH CARD */

function ScratchCard({ onReveal }) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const revealedRef = useRef(false);
  const lastCheckRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawSurface = () => {
      const rect = canvas.getBoundingClientRect();

      if (!rect.width || !rect.height || revealedRef.current) return;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);

      const ctx = canvas.getContext("2d", {
        willReadFrequently: true,
      });

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const width = rect.width;
      const height = rect.height;

      const gradient = ctx.createLinearGradient(0, 0, width, height);

      gradient.addColorStop(0, "#d7b77f");
      gradient.addColorStop(0.45, "#f8e8c9");
      gradient.addColorStop(0.75, "#c99b59");
      gradient.addColorStop(1, "#f5e2bc");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 100; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * width,
          Math.random() * height,
          Math.random() * 1.3 + 0.4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();
      }

      ctx.save();
      ctx.translate(width / 2, height * 0.36);
      ctx.scale(1.35, 1.35);

      ctx.beginPath();
      ctx.moveTo(0, 13);
      ctx.bezierCurveTo(-18, 1, -17, -12, -7, -12);
      ctx.bezierCurveTo(-2, -12, 0, -8, 0, -5);
      ctx.bezierCurveTo(0, -8, 2, -12, 7, -12);
      ctx.bezierCurveTo(17, -12, 18, 1, 0, 13);
      ctx.closePath();

      ctx.strokeStyle = "#95662f";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      ctx.textAlign = "center";
      ctx.fillStyle = "#684724";
      ctx.font = "700 10px Montserrat, sans-serif";
      ctx.fillText("A LITTLE SURPRISE", width / 2, height * 0.70);

      ctx.font = "11px Georgia, serif";
      ctx.fillStyle = "#76552f";
      ctx.fillText(
        "Scratch the heart to reveal",
        width / 2,
        height * 0.84
      );

      ctx.font = "13px Georgia, serif";
      ctx.fillStyle = "#956b38";
      ctx.fillText("✦", width / 2, height * 0.95);
    };

    drawSurface();

    const observer = new ResizeObserver(drawSurface);
    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  const checkProgress = () => {
    const canvas = canvasRef.current;

    if (!canvas || revealedRef.current) return;

    const now = Date.now();
    if (now - lastCheckRef.current < 150) return;

    lastCheckRef.current = now;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });

    const pixels = ctx.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;

    let transparent = 0;
    let sampled = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      sampled++;
      if (pixels[i] < 80) transparent++;
    }

    if (sampled && transparent / sampled > 0.38) {
      revealedRef.current = true;
      onReveal();
    }
  };

  const scratch = (event) => {
    const canvas = canvasRef.current;

    if (!canvas || revealedRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ctx = canvas.getContext("2d");

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  };

  return (
    <canvas
      ref={canvasRef}
      className="date-scratch-canvas"
      onPointerDown={(event) => {
        drawingRef.current = true;
        canvasRef.current?.setPointerCapture(event.pointerId);
        scratch(event);
      }}
      onPointerMove={(event) => {
        if (drawingRef.current) scratch(event);
      }}
      onPointerUp={() => {
        drawingRef.current = false;
        checkProgress();
      }}
      onPointerCancel={() => {
        drawingRef.current = false;
      }}
      aria-label="Scratch to reveal the wedding date"
    />
  );
}

/* DATE SECTION */

export default function DateSection({ onReveal }) {
  const [revealed, setRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [burst, setBurst] = useState(false);

  const burstTimerRef = useRef(null);

  useEffect(() => {
    if (!revealed) return;

    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, [revealed]);

  useEffect(() => {
    return () => {
      if (burstTimerRef.current) {
        window.clearTimeout(burstTimerRef.current);
      }
    };
  }, []);

  const handleReveal = () => {
    if (revealed) return;

    setRevealed(true);
    setBurst(true);

    // Unlock scrolling automatically after the scratch reveal.
    onReveal?.();

    if (burstTimerRef.current) {
      window.clearTimeout(burstTimerRef.current);
    }

    burstTimerRef.current = window.setTimeout(() => {
      setBurst(false);
    }, 2600);
  };

  const countdownItems = [
    { value: timeLeft.days, label: "DAYS" },
    { value: timeLeft.hours, label: "HOURS" },
    { value: timeLeft.minutes, label: "MINS" },
    { value: timeLeft.seconds, label: "SECS" },
  ];

  const revealViewport = {
    once: false,
    amount: 0.15,
  };

  return (
    <section className="date-scene">
      <div className="date-frame">
        <img
          src="/images/date.jpg"
          alt="Wedding date invitation"
          className="date-background"
        />

        {/* SCRATCH CARD */}
        <AnimatePresence>
          {!revealed && (
            <motion.div
              className="scratch-card-position"
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                scale: 1.08,
                filter: "blur(5px)",
              }}
              transition={{ duration: 0.65 }}
            >
              <ScratchCard onReveal={handleReveal} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* DATE REVEAL */}
        <AnimatePresence>
          {revealed && (
            <>
              {/* SOFT GOLDEN GLOW */}
              <motion.div
                className="date-reveal-glow"
                initial={{ opacity: 0, scale: 0.65 }}
                animate={{
                  opacity: [0, 0.85, 0.35],
                  scale: [0.65, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
              />

              {/* TEXT ANIMATIONS — COUPLE SECTION STYLE */}
              <motion.div
                className="revealed-date"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{
                  duration: 1.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.span
                  className="revealed-eyebrow"
                  initial={{ opacity: 0, letterSpacing: "5px" }}
                  whileInView={{
                    opacity: 1,
                    letterSpacing: "2px",
                  }}
                  viewport={revealViewport}
                  transition={{ duration: 1.2, delay: 0.2 }}
                >
                  OUR WEDDING DAY
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{ duration: 0.9, delay: 0.35 }}
                >
                  18 February 2027
                </motion.h1>

                <motion.div
                  className="revealed-divider"
                  initial={{ opacity: 0, scaleX: 0.2 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={revealViewport}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <span />
                  <i>✧</i>
                  <span />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{ duration: 0.9, delay: 0.65 }}
                >
                  Thursday · 10:30 AM onwards
                </motion.p>

                <motion.span
                  className="revealed-script"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  The beginning of forever
                </motion.span>
              </motion.div>

              {/* COUNTDOWN */}
              <motion.div
                className="countdown-overlay"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ duration: 0.9, delay: 0.65 }}
              >
                {countdownItems.map((item, index) => (
                  <motion.div
                    className="countdown-number"
                    key={item.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={{
                      duration: 0.8,
                      delay: 0.75 + index * 0.12,
                    }}
                  >
                    <span>{String(item.value).padStart(2, "0")}</span>
                    <small>{item.label}</small>
                  </motion.div>
                ))}
              </motion.div>

              <motion.p
                className="countdown-caption"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ duration: 0.9, delay: 1.15 }}
              >
                COUNTING DOWN TO OUR FOREVER
              </motion.p>

              {/* SCROLL HINT */}
              <motion.div
                className="date-scroll-hint"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{ duration: 0.9, delay: 1.3 }}
              >
                <span>SCROLL TO CONTINUE</span>

                <motion.span
                  className="scroll-arrow"
                  animate={{ y: [0, 7, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ↓
                </motion.span>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* BIG CELEBRATION BLAST */}
        <AnimatePresence>
          {burst && (
            <motion.div
              className="date-burst"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                duration: 2.6,
                ease: "easeOut",
              }}
            >
              {/* CENTRAL FLASH */}
              <motion.div
                className="burst-flash"
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.2, 2.8, 4.5],
                }}
                transition={{
                  duration: 1.25,
                  ease: "easeOut",
                }}
              />

              {/* THREE EXPANDING GOLDEN RINGS */}
              {[0, 1, 2].map((ring) => (
                <motion.div
                  key={ring}
                  className="burst-ring"
                  initial={{
                    opacity: 0.9,
                    scale: 0.1,
                  }}
                  animate={{
                    opacity: 0,
                    scale: [0.1, 2.8 + ring * 0.9],
                  }}
                  transition={{
                    duration: 1.8,
                    delay: ring * 0.18,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* HEARTS AND GOLDEN STARS */}
              {burstParticles.map((particle, index) => (
                <motion.span
                  key={`particle-${index}`}
                  className="burst-particle"
                  style={{ fontSize: particle.size }}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0.1,
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: particle.x,
                    y: particle.y,
                    scale: [0.1, 1.4, 0.7],
                    opacity: [0, 1, 0],
                    rotate: index % 2 === 0 ? 120 : -120,
                  }}
                  transition={{
                    duration: 1.9,
                    delay: particle.delay,
                    ease: "easeOut",
                  }}
                >
                  {particle.symbol}
                </motion.span>
              ))}

              {/* EXTRA GLITTER */}
              {extraGlitter.map((particle, index) => (
                <motion.span
                  key={`glitter-${index}`}
                  className="burst-glitter"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: particle.x,
                    y: particle.y,
                    opacity: [0, 1, 0],
                    scale: [0, 1.6, 0],
                    rotate: 180,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.1 + particle.delay,
                    ease: "easeOut",
                  }}
                >
                  ✧
                </motion.span>
              ))}

              {/* FALLING GOLDEN CONFETTI */}
              {Array.from({ length: 22 }).map((_, index) => (
                <motion.span
                  key={`confetti-${index}`}
                  className="burst-confetti"
                  style={{
                    left: `${(index % 11) * 10 - 50}px`,
                    top: `${(index % 4) * -12}px`,
                  }}
                  initial={{
                    opacity: 0,
                    y: -10,
                    x: 0,
                    rotate: 0,
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, 100 + (index % 5) * 20],
                    x: index % 2 === 0 ? 45 : -45,
                    rotate: index % 2 === 0 ? 220 : -220,
                    scale: [0.5, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.8,
                    delay: 0.15 + (index % 6) * 0.08,
                    ease: "easeOut",
                  }}
                >
                  ✦
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .date-scene {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background: #fff3e2;
        }

        .date-frame {
          position: relative;
          width: 100%;
          max-width: 540px;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          isolation: isolate;
          background: #fff0dc;
        }

        .date-background {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
          z-index: -1;
          pointer-events: none;
        }

        /* SCRATCH CARD */

        .scratch-card-position {
          position: absolute;
          top: 33%;
          left: 0;
          right: 0;
          width: 68%;
          height: 13%;
          margin: 0 auto;
          border: 1px solid rgba(174, 125, 59, 0.75);
          border-radius: 18px;
          overflow: hidden;
          background: #e8d0a7;
          box-shadow: 0 7px 20px rgba(116, 76, 32, 0.17);
          z-index: 4;
        }

        .date-scratch-canvas {
          display: block;
          width: 100%;
          height: 100%;
          touch-action: none;
          cursor: grab;
        }

        .date-scratch-canvas:active {
          cursor: grabbing;
        }

        /* REVEAL GLOW */

        .date-reveal-glow {
          position: absolute;
          top: 27%;
          left: 10%;
          width: 80%;
          height: 28%;
          border-radius: 50%;
          background: radial-gradient(
            ellipse,
            rgba(255, 226, 169, 0.38) 0%,
            rgba(255, 226, 169, 0.15) 45%,
            transparent 75%
          );
          filter: blur(12px);
          pointer-events: none;
          z-index: 1;
        }

        /* REVEALED DATE */

        .revealed-date {
          position: absolute;
          top: 30.5%;
          left: 8%;
          width: 84%;
          text-align: center;
          color: #654323;
          z-index: 3;
        }

        .revealed-eyebrow {
          font-family: "Montserrat", sans-serif;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #a47740;
        }

        .revealed-date h1 {
          margin: 11px 0 8px;
          font-family: "Italiana", serif;
          font-size: clamp(25px, 7vw, 36px);
          font-weight: 700;
          line-height: 1.15;
          white-space: nowrap;
          color: #59371f;
        }

        .revealed-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 7px 0;
        }

        .revealed-divider span {
          width: 30px;
          height: 1px;
          background: #bd914e;
        }

        .revealed-divider i {
          font-style: normal;
          color: #b58a4c;
        }

        .revealed-date p {
          margin: 8px 0;
          font-family: "Cormorant Garamond", serif;
          font-size: 17px;
          font-weight: 600;
          color: #795536;
        }

        .revealed-script {
          display: block;
          margin-top: 7px;
          font-family: "Great Vibes", cursive;
          font-size: 24px;
          color: #a77a3f;
        }

        /* COUNTDOWN */

        .countdown-overlay {
          position: absolute;
          top: 76.5%;
          left: 14.2%;
          width: 71.6%;
          height: 8%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          align-items: center;
          text-align: center;
          z-index: 3;
          pointer-events: none;
        }

        .countdown-number {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-width: 0;
          height: 100%;
          color: #654323;
          line-height: 1;
        }

        .countdown-number span {
          font-family: "Italiana", serif;
          font-size: clamp(19px, 5.2vw, 25px);
          font-weight: 700;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        .countdown-number small {
          display: block;
          margin-top: 3px;
          font-family: "Montserrat", sans-serif;
          font-size: 5px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #9b7040;
        }

        .countdown-caption {
          position: absolute;
          top: 85.5%;
          left: 10%;
          width: 80%;
          margin: 0;
          text-align: center;
          font-family: "Montserrat", sans-serif;
          font-size: 6px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #9b7040;
          z-index: 3;
        }

        /* SCROLL HINT */

        .date-scroll-hint {
          position: absolute;
          top: 92%;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
          color: #98703d;
          font-family: "Montserrat", sans-serif;
          font-size: 7px;
          font-weight: 700;
          letter-spacing: 1.2px;
          z-index: 4;
          pointer-events: none;
        }

        .scroll-arrow {
          display: block;
          font-size: 17px;
          line-height: 1;
        }

        /* CELEBRATION BLAST */

        .date-burst {
          position: absolute;
          top: 42%;
          left: 50%;
          width: 1px;
          height: 1px;
          z-index: 10;
          pointer-events: none;
        }

        .burst-flash {
          position: absolute;
          width: 90px;
          height: 90px;
          left: -45px;
          top: -45px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 250, 224, 1) 0%,
            rgba(255, 226, 169, 0.75) 25%,
            rgba(238, 197, 125, 0.4) 48%,
            transparent 75%
          );
          filter: blur(3px);
        }

        .burst-ring {
          position: absolute;
          width: 70px;
          height: 70px;
          left: -35px;
          top: -35px;
          border: 1px solid rgba(196, 151, 78, 0.85);
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(211, 171, 105, 0.4);
        }

        .burst-particle {
          position: absolute;
          left: 0;
          top: 0;
          color: #bd914e;
          text-shadow: 0 0 9px rgba(238, 207, 151, 0.9);
          transform-origin: center;
          white-space: nowrap;
        }

        .burst-particle:nth-child(3n) {
          color: #d5ad68;
        }

        .burst-particle:nth-child(4n) {
          color: #a77a3f;
        }

        .burst-glitter {
          position: absolute;
          left: 0;
          top: 0;
          color: #e4c58d;
          font-size: 13px;
          text-shadow: 0 0 9px rgba(255, 229, 181, 1);
        }

        .burst-confetti {
          position: absolute;
          color: #c99b59;
          font-size: 12px;
          text-shadow: 0 0 7px rgba(255, 229, 181, 0.9);
        }

        @media (max-width: 380px) {
          .revealed-date h1 {
            font-size: 25px;
          }

          .countdown-number span {
            font-size: 19px;
          }

          .countdown-number small {
            font-size: 4.5px;
          }
        }

        @media (max-height: 700px) {
          .revealed-date {
            top: 29%;
          }

          .countdown-overlay {
            top: 76%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .date-reveal-glow {
            filter: none;
          }
        }
      `}</style>
    </section>
  );
}
