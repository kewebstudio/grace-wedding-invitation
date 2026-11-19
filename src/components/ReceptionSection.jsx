
import { motion } from "framer-motion";
import { Navigation } from "lucide-react";

const sparkles = [
  { left: "8%", top: "12%", delay: 0 },
  { left: "88%", top: "20%", delay: 0.8 },
  { left: "16%", top: "58%", delay: 1.2 },
  { left: "83%", top: "66%", delay: 0.5 },
  { left: "25%", top: "85%", delay: 1.5 },
  { left: "75%", top: "88%", delay: 0.3 },
];

const viewportSettings = {
  once: false,
  amount: 0.15,
};

const transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

export default function ReceptionSection() {
  const openDirections = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=The+Grand+Palace+Jubilee+Hills+Hyderabad",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="reception-scene">
      <div className="reception-frame">

        {/* ORIGINAL BLANK RECEPTION TEMPLATE */}
        <img
          src="/images/reception.jpg"
          alt="Wedding reception"
          className="reception-background"
        />

        {/* FLOATING GOLDEN SPARKLES */}
        <div className="reception-sparkles" aria-hidden="true">
          {sparkles.map(({ left, top, delay }, index) => (
            <motion.span
              key={index}
              className="reception-sparkle"
              style={{ left, top }}
              animate={{
                opacity: [0.2, 1, 0.25],
                scale: [0.7, 1.25, 0.7],
                rotate: [0, 90, 180],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3 + index * 0.25,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✧
            </motion.span>
          ))}
        </div>

        {/* HEADING — UPPER EMPTY SPACE */}
        <motion.div
          className="reception-heading"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ ...transition, duration: 1.1 }}
        >
          <motion.span
            className="reception-eyebrow"
            initial={{ opacity: 0, letterSpacing: "5px" }}
            whileInView={{ opacity: 1, letterSpacing: "2.5px" }}
            viewport={viewportSettings}
            transition={{ duration: 1.2 }}
          >
            THE CELEBRATION CONTINUES
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            Wedding Reception
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            An evening of joy, love
            <br />
            and beautiful memories
          </motion.p>
        </motion.div>

        {/* VENUE — INSIDE THE GOLDEN PLAQUE */}
        <motion.div
          className="reception-plaque"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ ...transition, delay: 0.2 }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            The Grand Palace
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.9, delay: 0.45 }}
          >
            Jubilee Hills, Hyderabad
          </motion.p>
        </motion.div>

        {/* DATE — LOWER EMPTY SPACE */}
        <motion.div
          className="reception-date"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ ...transition, delay: 0.2 }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "5px" }}
            whileInView={{ opacity: 1, letterSpacing: "2px" }}
            viewport={viewportSettings}
            transition={{ duration: 1.1, delay: 0.2 }}
          >
            THURSDAY
          </motion.span>

          <motion.strong
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.9, delay: 0.35 }}
          >
            18 February 2027
          </motion.strong>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            1:00 PM onwards
          </motion.p>

          <motion.button
            type="button"
            className="reception-directions"
            onClick={openDirections}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.9, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Navigation size={13} />
            Get Directions
          </motion.button>
        </motion.div>

      </div>

      <style>{`
        .reception-scene {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 0;
          display: flex;
          justify-content: center;
          align-items: stretch;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #fff0dc;
        }

        .reception-frame {
          position: relative;
          width: 100%;
          max-width: 600px;
          height: 100vh;
          height: 100svh;
          margin: 0;
          overflow: hidden;
          isolation: isolate;
          background: #fff0dc;
        }

        .reception-background {
          position: absolute;
          inset: 0;
          z-index: -2;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: fill;
          pointer-events: none;
        }

        .reception-sparkles {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .reception-sparkle {
          position: absolute;
          color: #c39751;
          font-size: 15px;
          text-shadow: 0 0 9px rgba(206, 158, 83, 0.55);
        }

        /* HEADING AREA */
        .reception-heading {
          position: absolute;
          top: 27%;
          left: 7%;
          width: 86%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 2;
        }

        .reception-eyebrow {
          margin: 0 0 10px;
          color: #987447;
          font-family: "Montserrat", sans-serif;
          font-size: 8px;
          font-weight: 700;
          line-height: 1.5;
        }

        .reception-heading h1 {
          margin: 0;
          color: #49301c;
          font-family: "Italiana", serif;
          font-size: clamp(28px, 8vw, 38px);
          font-weight: 400;
          line-height: 1.15;
        }

        .reception-heading p {
          margin: 9px 0 0;
          color: #755638;
          font-family: "Cormorant Garamond", serif;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.35;
        }

        /* VENUE PLAQUE */
        .reception-plaque {
          position: absolute;
          top: 51.5%;
          left: 13%;
          width: 74%;
          height: 10%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          z-index: 2;
        }

        .reception-plaque h2 {
          margin: 0;
          color: #59391f;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(22px, 6.5vw, 29px);
          font-weight: 700;
          line-height: 1.1;
        }

        .reception-plaque p {
          margin: 4px 0 0;
          color: #80603f;
          font-family: "Cormorant Garamond", serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
        }

        /* DATE AREA */
        .reception-date {
          position: absolute;
          top: 67.5%;
          left: 8%;
          width: 84%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          z-index: 2;
        }

        .reception-date > span {
          color: #987447;
          font-family: "Montserrat", sans-serif;
          font-size: 8px;
          font-weight: 700;
        }

        .reception-date strong {
          margin-top: 5px;
          color: #59391f;
          font-family: "Cormorant Garamond", serif;
          font-size: 20px;
          font-weight: 700;
          line-height: 1.2;
        }

        .reception-date > p {
          margin: 3px 0 0;
          color: #b18343;
          font-family: "Great Vibes", cursive;
          font-size: 23px;
          line-height: 1.2;
        }

        /* DIRECTIONS */
        .reception-directions {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 7px;
          padding: 7px 16px;
          border: 1px solid #bd9459;
          border-radius: 30px;
          background: rgba(255, 250, 240, 0.96);
          color: #513820;
          font-family: "Montserrat", sans-serif;
          font-size: 8px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(87, 57, 25, 0.1);
          -webkit-appearance: none;
          appearance: none;
        }

        @media (max-width: 380px) {
          .reception-heading {
            top: 27%;
          }

          .reception-heading h1 {
            font-size: 29px;
          }

          .reception-heading p {
            font-size: 15px;
          }

          .reception-plaque h2 {
            font-size: 22px;
          }

          .reception-plaque p {
            font-size: 13px;
          }

          .reception-date strong {
            font-size: 19px;
          }

          .reception-date > p {
            font-size: 21px;
          }
        }

        @media (max-height: 700px) {
          .reception-heading {
            top: 26%;
          }

          .reception-plaque {
            top: 51%;
          }

          .reception-date {
            top: 67%;
          }

          .reception-directions {
            margin-top: 5px;
            padding: 6px 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reception-sparkle {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
