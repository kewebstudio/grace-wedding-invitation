
import { motion } from "framer-motion";

export default function IntroScene({ onContinue }) {
  const handleContinue = () => {
    onContinue?.();

    setTimeout(() => {
      document.getElementById("couple-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 250);
  };

  return (
    <main className="intro-scene">
      <img
        src="/images/intro.jpg"
        alt="Daniel and Grace wedding invitation"
        className="intro-background"
      />

      <div className="intro-content">
        <motion.div
          className="intro-copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <motion.p
            className="intro-eyebrow"
            initial={{ opacity: 0, letterSpacing: "5px" }}
            animate={{ opacity: 1, letterSpacing: "2.5px" }}
            transition={{ delay: 0.3, duration: 1.2 }}
          >
            A CELEBRATION OF LOVE
          </motion.p>

          <motion.div
            className="intro-ornament"
            initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            ✧
          </motion.div>

          <motion.p
            className="intro-invitation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            Together with their families,
            <br />
            we invite you to celebrate
          </motion.p>

          <div className="intro-names">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.2 }}
            >
              Daniel Martin
            </motion.h1>

            <motion.span
              className="intro-ampersand"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              &
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1.2 }}
            >
              Grace Mary
            </motion.h1>
          </div>

          <motion.div
            className="intro-divider"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <span />
            <i>✦</i>
            <span />
          </motion.div>

          <motion.p
            className="intro-closing"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 1 }}
          >
            A beautiful beginning,
            <br />
            a lifetime of love.
          </motion.p>

          <motion.button
            type="button"
            className="intro-continue"
            onClick={handleContinue}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            Discover Their Story
            <span>→</span>
          </motion.button>
        </motion.div>

        <div className="intro-sparkles" aria-hidden="true">
          {[
            ["12%", "25%", 0],
            ["88%", "30%", 0.8],
            ["17%", "68%", 1.3],
            ["83%", "65%", 0.5],
            ["50%", "12%", 1.7],
            ["8%", "48%", 1],
            ["92%", "48%", 0.3],
          ].map(([left, top, delay], index) => (
            <motion.span
              key={index}
              className="intro-sparkle"
              style={{ left, top }}
              animate={{
                opacity: [0.1, 0.9, 0.1],
                scale: [0.6, 1.3, 0.6],
              }}
              transition={{
                duration: 2.8,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        .intro-scene {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 560px;
          overflow: hidden;
          isolation: isolate;
          background: #f8eddb;
        }

        .intro-background {
          position: absolute;
          inset: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          pointer-events: none;
        }

        .intro-content {
          position: absolute;
          left: 13%;
          right: 13%;
          top: 24%;
          bottom: 29%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .intro-copy {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #49301c;
        }

        .intro-eyebrow {
          margin: 0 0 8px;
          color: #987447;
          font-family: "Montserrat", sans-serif;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 2.5px;
        }

        .intro-ornament {
          margin: 3px 0 8px;
          color: #b58a4c;
          font-family: "Cormorant Garamond", serif;
          font-size: 22px;
        }

        .intro-invitation {
          margin: 0;
          color: #755638;
          font-family: "Cormorant Garamond", serif;
          font-size: 17px;
          font-weight: 500;
          line-height: 1.45;
        }

        .intro-names {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 12px 0 8px;
        }

        .intro-names h1 {
          margin: 0;
          color: #49301c;
          font-family: "Bodoni Moda", serif;
          font-size: clamp(32px, 9vw, 42px);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: 0.3px;
        }

        .intro-ampersand {
          margin: 1px 0 3px;
          color: #b58a4c;
          font-family: "Great Vibes", cursive;
          font-size: 36px;
          line-height: 1;
        }

        .intro-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          margin: 5px 0 10px;
        }

        .intro-divider span {
          width: 29px;
          height: 1px;
          background: #bd995e;
        }

        .intro-divider i {
          color: #b58a4c;
          font-size: 13px;
          font-style: normal;
        }

        .intro-closing {
          margin: 0;
          color: #806344;
          font-family: "Cormorant Garamond", serif;
          font-size: 17px;
          font-style: italic;
          font-weight: 500;
          line-height: 1.4;
        }

        .intro-continue {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
          margin-top: 17px;
          padding: 10px 23px;
          border: 1px solid #b58a4c;
          border-radius: 30px;
          background: rgba(255, 250, 240, 0.96);
          color: #513820;
          font-family: "Montserrat", sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.3px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(87, 57, 25, 0.1);
          -webkit-appearance: none;
          appearance: none;
        }

        .intro-continue span {
          color: #a77d42;
          font-size: 17px;
          transition: transform 0.3s ease;
        }

        .intro-continue:hover span {
          transform: translateX(4px);
        }

        .intro-sparkles {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .intro-sparkle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #d4a85e;
          box-shadow:
            0 0 5px 2px rgba(219, 177, 107, 0.55),
            0 0 10px rgba(219, 177, 107, 0.3);
        }

        @media (max-width: 600px) {
          .intro-content {
            left: 13%;
            right: 13%;
            top: 24%;
            bottom: 29%;
          }

          .intro-eyebrow {
            font-size: 7px;
          }

          .intro-invitation {
            font-size: 16px;
          }

          .intro-names h1 {
            font-size: 35px;
          }

          .intro-ampersand {
            font-size: 33px;
          }

          .intro-closing {
            font-size: 16px;
          }

          .intro-continue {
            margin-top: 14px;
            padding: 9px 20px;
          }
        }

        @media (max-height: 650px) {
          .intro-content {
            top: 22%;
            bottom: 27%;
          }

          .intro-names {
            margin: 7px 0 5px;
          }

          .intro-names h1 {
            font-size: 29px;
          }

          .intro-continue {
            margin-top: 10px;
          }
        }
      `}</style>
    </main>
  );
}
