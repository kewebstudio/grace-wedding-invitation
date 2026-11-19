
import { motion } from "framer-motion";

const sparkles = [
  { left: "8%", top: "12%", delay: 0 },
  { left: "88%", top: "20%", delay: 0.8 },
  { left: "16%", top: "58%", delay: 1.2 },
  { left: "83%", top: "66%", delay: 0.5 },
  { left: "25%", top: "85%", delay: 1.5 },
  { left: "75%", top: "88%", delay: 0.3 },
];

export default function CoupleSection() {
  return (
    <section className="couple-section">
      <div className="couple-card">
        <img
          src="/images/couple.jpg"
          alt="Daniel and Grace"
          className="couple-template"
        />

        <div className="couple-sparkles">
          {sparkles.map((sparkle, index) => (
            <motion.span
              key={index}
              className="couple-sparkle"
              style={{
                left: sparkle.left,
                top: sparkle.top,
              }}
              animate={{
                opacity: [0.2, 1, 0.25],
                scale: [0.7, 1.25, 0.7],
                rotate: [0, 90, 180],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3 + index * 0.25,
                delay: sparkle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✧
            </motion.span>
          ))}
        </div>

        <motion.div
          className="couple-information"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.div
            className="family-heading"
            initial={{ opacity: 0, letterSpacing: "5px" }}
            whileInView={{ opacity: 1, letterSpacing: "2.5px" }}
            viewport={{ once: false }}
            transition={{ duration: 1.2 }}
          >
            TWO FAMILIES · ONE BEAUTIFUL BEGINNING
          </motion.div>

          <motion.div
            className="family-block"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <span className="family-label">GROOM</span>
            <h1>Daniel Martin</h1>
            <p className="family-parents">
              Son of
              <strong> Mr. Samuel Martin</strong>
              <span> & </span>
              <strong>Mrs. Elizabeth Thomas</strong>
            </p>
          </motion.div>

          <motion.div
            className="family-ornament"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <span />
            <i>❦</i>
            <span />
          </motion.div>

          <motion.div
            className="family-block bride-block"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.55 }}
          >
            <span className="family-label">BRIDE</span>
            <h1>Grace Mary</h1>
            <p className="family-parents">
              Daughter of
              <strong> Mr. Joseph Mathew</strong>
              <span> & </span>
              <strong>Mrs. Anna Mathew</strong>
            </p>
          </motion.div>

          <motion.div
            className="family-blessing"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            With the love and blessings of their families
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .couple-section {
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          justify-content: center;
          align-items: stretch;
          background: #fff0dc;
          overflow: hidden;
          padding: 0;
          margin: 0;
        }

        .couple-card {
          position: relative;
          width: 100%;
          max-width: 600px;
          height: 100vh;
          height: 100svh;
          min-height: 100vh;
          min-height: 100svh;
          aspect-ratio: auto;
          overflow: hidden;
          isolation: isolate;
          background: #fff0dc;
          margin: 0;
        }

        .couple-template {
          position: absolute;
          inset: 0;
          z-index: -2;
          width: 100%;
          height: 100%;
          object-fit: fill;
          display: block;
          pointer-events: none;
        }

        .couple-sparkles {
          position: absolute;
          top: 47%;
          left: 0;
          width: 100%;
          height: 43%;
          pointer-events: none;
          z-index: -1;
        }

        .couple-sparkle {
          position: absolute;
          color: #c39751;
          font-size: 15px;
          text-shadow: 0 0 9px rgba(206, 158, 83, 0.55);
        }

        .couple-information {
          position: absolute;
          top: 47.5%;
          left: 10%;
          width: 80%;
          height: 43%;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          text-align: center;
          color: #49301d;
        }

        .family-heading {
          font-family: "Montserrat", sans-serif;
          font-size: clamp(7px, 2vw, 10px);
          font-weight: 700;
          line-height: 1.5;
          color: #98703d;
          white-space: nowrap;
        }

        .family-block {
          width: 100%;
        }

        .family-label {
          display: block;
          margin-bottom: 5px;
          font-family: "Montserrat", sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #aa8148;
        }

        .family-block h1 {
          margin: 0;
          font-family: "Italiana", serif;
          font-size: clamp(30px, 8vw, 43px);
          font-weight: 700;
          line-height: 1.15;
          color: #492f1d;
        }

        .family-parents {
          max-width: 300px;
          margin: 7px auto 0;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(14px, 3.9vw, 18px);
          font-weight: 600;
          line-height: 1.35;
          color: #765536;
        }

        .family-parents strong {
          font-weight: 700;
          color: #503820;
        }

        .family-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          color: #b88b4d;
        }

        .family-ornament span {
          width: 45px;
          height: 1px;
          background: #bd985e;
        }

        .family-ornament i {
          font-family: "Cormorant Garamond", serif;
          font-size: 29px;
          font-style: normal;
        }

        .family-blessing {
          max-width: 270px;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(13px, 3.5vw, 17px);
          font-style: italic;
          font-weight: 600;
          color: #8b6842;
          line-height: 1.4;
          text-align: center;
        }

        @media (max-width: 380px) {
          .couple-information {
            top: 47%;
            left: 8%;
            width: 84%;
            height: 44%;
          }

          .family-heading {
            font-size: 7px;
            letter-spacing: 1.6px;
          }

          .family-block h1 {
            font-size: 30px;
          }

          .family-parents {
            font-size: 14px;
          }

          .family-ornament span {
            width: 34px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .couple-section *,
          .couple-section *::before,
          .couple-section *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
