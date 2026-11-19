
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ClosedDoors({ onContinue }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (!isOpening) setIsOpening(true);
  };

  const buttonSparkles = Array.from({ length: 12 });
  const doorSparkles = Array.from({ length: 28 });

  return (
    <main className="wedding-opening">

      {/* OPEN CHURCH BACKGROUND */}
      <div className="church-background">
        <img
          src="/images/opened-doors.jpg"
          alt="Wedding church"
        />
      </div>

      {/* COUPLE APPEARS WHILE DOORS ARE OPENING */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="couple-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.25,
              duration: 1.8,
              ease: "easeOut",
            }}
          >
            <img
              src="/images/couple-transparent.png"
              alt="Bride and groom"
              className="couple-image"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEXT SCENE — MINIMAL STORY CUE */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="continue-area"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 3.3,
              duration: 1,
              ease: "easeOut",
            }}
          >
            <div className="button-sparkles" aria-hidden="true">
              {buttonSparkles.map((_, index) => (
                <span
                  key={index}
                  className={`button-sparkle sparkle-${index + 1}`}
                  style={{
                    animationDelay: `${index * 0.22}s`,
                  }}
                />
              ))}
            </div>

            <motion.button
              type="button"
              className="story-link"
              onClick={onContinue}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="story-link-ornament">✧</span>
              <span className="story-link-text">
                Enter Our Story
              </span>
              <motion.span
                className="story-link-arrow"
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CLOSED DOORS */}
      <div
        className={`door-scene ${isOpening ? "opening" : ""}`}
        onClick={handleOpen}
      >
        <div className="door-panel door-left">
          <div className="door-image left-image" />
        </div>

        <div className="door-panel door-right">
          <div className="door-image right-image" />
        </div>

        {/* INITIAL SPARKLE TAP INSTRUCTION */}
        <AnimatePresence>
          {!isOpening && (
            <motion.div
              className="door-instruction"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="instruction-sparkle"
                animate={{
                  opacity: [0.45, 1, 0.45],
                  scale: [0.85, 1.15, 0.85],
                  rotate: [0, 45, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✧
              </motion.span>

              <motion.div
                className="tap-to-open"
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span>Tap to open</span>
                <span className="tap-arrow">↓</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GOLDEN DOOR SPARKLES */}
        <div className="sparkle-layer">
          {doorSparkles.map((_, index) => (
            <span
              key={index}
              className="sparkle"
              style={{
                left: `${(index * 37) % 100}%`,
                top: `${(index * 53) % 100}%`,
                animationDelay: `${(index % 8) * 0.4}s`,
                animationDuration: `${2.5 + (index % 4) * 0.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          overflow-x: hidden;
        }

        .wedding-opening {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          min-height: 0;
          overflow: hidden;
          overscroll-behavior: none;
          touch-action: pan-x pan-y;
          background: #1c130c;
          perspective: 1800px;
          isolation: isolate;
        }

        /* CHURCH BACKGROUND */

        .church-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .church-background img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* COUPLE IMAGE */

        .couple-stage {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0 10px 17%;
          pointer-events: none;
        }

        .couple-image {
          display: block;
          width: auto;
          height: 38%;
          max-width: 86%;
          object-fit: contain;
          object-position: center bottom;
          filter: drop-shadow(
            0 7px 13px rgba(35, 20, 8, 0.16)
          );
        }

        /* MINIMAL NEXT-SCENE CUE */

        .continue-area {
          position: absolute;
          z-index: 10;
          left: 0;
          right: 0;
          bottom: 5%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }

        .story-link {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 18px;
          border: none;
          outline: none;
          background: transparent;
          color: #654522;
          font-family: "Montserrat", sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2.2px;
          text-shadow: 0 1px 5px rgba(255, 239, 210, 0.5);
          cursor: pointer;
          pointer-events: auto;
          -webkit-tap-highlight-color: transparent;
        }

        .story-link-ornament {
          color: #9b713c;
          font-size: 18px;
          text-shadow: 0 0 8px rgba(218, 177, 105, 0.6);
        }

        .story-link-text {
          white-space: nowrap;
        }

        .story-link-arrow {
          color: #9b713c;
          font-size: 19px;
          font-weight: 600;
        }

        .story-link:focus-visible {
          outline: 1px solid #9b713c;
          outline-offset: 5px;
          border-radius: 20px;
        }

        /* SPARKLES AROUND STORY LINK */

        .button-sparkles {
          position: absolute;
          z-index: 1;
          width: 230px;
          height: 85px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .button-sparkle {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ffe7a6;
          box-shadow:
            0 0 5px 2px rgba(255, 224, 153, 0.85),
            0 0 12px rgba(255, 209, 113, 0.65);
          opacity: 0;
          animation: buttonTwinkle 2.4s ease-in-out infinite;
        }

        .sparkle-1  { left: 9%; top: 35%; }
        .sparkle-2  { left: 19%; top: 12%; width: 3px; height: 3px; }
        .sparkle-3  { left: 30%; top: 85%; }
        .sparkle-4  { left: 40%; top: 5%; width: 3px; height: 3px; }
        .sparkle-5  { left: 51%; top: 90%; }
        .sparkle-6  { left: 62%; top: 8%; width: 3px; height: 3px; }
        .sparkle-7  { left: 72%; top: 78%; }
        .sparkle-8  { left: 83%; top: 18%; width: 3px; height: 3px; }
        .sparkle-9  { left: 92%; top: 45%; }
        .sparkle-10 { left: 25%; top: 52%; width: 3px; height: 3px; }
        .sparkle-11 { left: 76%; top: 45%; width: 3px; height: 3px; }
        .sparkle-12 { left: 50%; top: 0%; }

        @keyframes buttonTwinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0.4);
          }

          45% {
            opacity: 1;
            transform: scale(1.25);
          }

          70% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }

        /* DOOR PANELS */

        .door-scene {
          position: absolute;
          inset: 0;
          z-index: 3;
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .door-panel {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          overflow: hidden;
          background: #ead6b8;
          transform-style: preserve-3d;
          transition: transform 3.2s cubic-bezier(
            0.65, 0, 0.25, 1
          );
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .door-left {
          left: 0;
          transform-origin: left center;
        }

        .door-right {
          right: 0;
          transform-origin: right center;
        }

        .door-image {
          position: absolute;
          top: 0;
          width: 200%;
          height: 100%;
          background-image: url("/images/closed-doors.jpg");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        .left-image {
          left: 0;
          background-position: left center;
        }

        .right-image {
          right: 0;
          background-position: right center;
        }

        /* SLOW INWARD DOOR OPENING */

        .door-scene.opening .door-left {
          transform: rotateY(110deg);
        }

        .door-scene.opening .door-right {
          transform: rotateY(-110deg);
        }

        /* INITIAL TAP INSTRUCTION */

        .door-instruction {
          position: absolute;
          z-index: 5;
          left: 0;
          right: 0;
          bottom: 8%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-align: center;
          pointer-events: none;
        }

        .instruction-sparkle {
          display: block;
          color: #f6dba7;
          font-family: "Cormorant Garamond", serif;
          font-size: 27px;
          line-height: 1;
          text-shadow:
            0 0 7px rgba(255, 232, 183, 0.9),
            0 0 15px rgba(255, 209, 113, 0.6);
        }

        .door-instruction p {
          margin: 0;
          color: #513820;
          font-family: "Italiana", serif;
          font-size: 21px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-shadow: 0 1px 3px rgba(255, 248, 230, 0.7);
        }

        .tap-to-open {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
          color: #8c693e;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .tap-arrow {
          font-size: 14px;
        }

        /* GOLDEN SPARKLES ACROSS THE DOORS */

        .sparkle-layer {
          position: absolute;
          z-index: 6;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #fff4c9;
          box-shadow:
            0 0 6px 2px rgba(255, 221, 145, 0.85),
            0 0 15px rgba(255, 220, 140, 0.7);
          opacity: 0;
          animation: sparkleFloat ease-in-out infinite;
        }

        @keyframes sparkleFloat {
          0%, 100% {
            opacity: 0;
            transform: translateY(12px) scale(0.5);
          }

          45% {
            opacity: 0.9;
            transform: translateY(-8px) scale(1);
          }

          70% {
            opacity: 0.55;
            transform: translateY(-16px) scale(0.8);
          }
        }

        /* MOBILE */

        @media (max-width: 600px) {
          .wedding-opening {
            height: 100vh;
            height: 100dvh;
            min-height: 0;
          }

          .couple-stage {
            padding: 0 8px 17%;
          }

          .couple-image {
            height: 38%;
            max-width: 88%;
          }

          .continue-area {
            bottom: 5%;
          }

          .story-link {
            font-size: 9px;
            letter-spacing: 1.8px;
          }
        }

        /* SHORT SCREENS */

        @media (max-height: 600px) {
          .wedding-opening {
            height: 100vh;
            height: 100dvh;
            min-height: 0;
          }

          .couple-stage {
            padding-bottom: 15%;
          }

          .couple-image {
            height: 34%;
          }

          .continue-area {
            bottom: 2.5%;
          }

          .door-instruction {
            bottom: 7%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sparkle,
          .button-sparkle {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
