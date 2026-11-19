
import { motion } from "framer-motion";
import { Navigation } from "lucide-react";

const reveal = {
  hidden: {
    opacity: 0,
    y: 25,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function VenueSection() {
  const openDirections = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=St+Mary%27s+Church+Banjara+Hills+Hyderabad",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className="venue-scene">
      <div className="venue-frame">
        <img
          src="/images/venue.jpg"
          alt="Wedding venue"
          className="venue-background"
        />

        {/* Magical floating sparkles */}
        <div className="venue-sparkles">
          {[...Array(8)].map((_, index) => (
            <motion.span
              key={index}
              className="venue-sparkle"
              style={{
                left: `${10 + ((index * 17) % 80)}%`,
                top: `${15 + ((index * 13) % 70)}%`,
              }}
              animate={{
                opacity: [0.15, 0.9, 0.15],
                scale: [0.7, 1.25, 0.7],
                y: [0, -9, 0],
                rotate: [0, 90, 180],
              }}
              transition={{
                duration: 3 + (index % 3) * 0.6,
                delay: index * 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ✧
            </motion.span>
          ))}
        </div>

        <div className="venue-content">

          <motion.p
            className="venue-label"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            THE WEDDING CEREMONY
          </motion.p>

          <motion.h1
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 1.1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            St. Mary's Church
          </motion.h1>

          <motion.p
            className="venue-address"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 1,
              delay: 0.3,
            }}
          >
            Banjara Hills, Hyderabad, Telangana
          </motion.p>

          <motion.div
            className="venue-details"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 1,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p>Thursday, 18 February 2027</p>
            <p>10:30 AM onwards</p>
          </motion.div>

          <motion.button
            type="button"
            className="venue-directions"
            onClick={openDirections}
            initial={{ opacity: 0, y: 15, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{
              duration: 0.8,
              delay: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.045 }}
            whileTap={{ scale: 0.96 }}
          >
            <Navigation size={15} />
            Get Directions
          </motion.button>

        </div>
      </div>

      <style>{`
        .venue-scene {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 0;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: stretch;
          overflow: hidden;
          background: #fff2e2;
        }

        .venue-frame {
          position: relative;
          width: 100%;
          max-width: 540px;
          height: 100%;
          overflow: hidden;
          isolation: isolate;
          background: #fff2e2;
        }

        .venue-background {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
          z-index: -2;
          pointer-events: none;
          display: block;
        }

        .venue-sparkles {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          pointer-events: none;
        }

        .venue-sparkle {
          position: absolute;
          color: #c39751;
          font-size: 15px;
          text-shadow: 0 0 10px rgba(206, 158, 83, 0.6);
        }

        .venue-content {
          position: absolute;
          top: 24%;
          left: 10%;
          width: 80%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: #624326;
        }

        .venue-label {
          margin: 0 0 20px;
          font-family: "Montserrat", sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #a47740;
        }

        .venue-content h1 {
          margin: 0;
          font-family: "Cormorant Garamond", serif;
          font-size: clamp(29px, 8vw, 38px);
          font-weight: 700;
          line-height: 1.1;
          color: #59391f;
        }

        .venue-address {
          max-width: 280px;
          margin: 12px 0 0;
          font-family: "Cormorant Garamond", serif;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.35;
          color: #80603f;
        }

        .venue-details {
          margin-top: 22px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .venue-details p {
          margin: 0;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #795633;
        }

        .venue-directions {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          margin-top: 22px;
          padding: 11px 21px;
          border: 1px solid #bd9459;
          border-radius: 30px;
          background: #fff9ef;
          color: #654522;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .venue-directions:hover {
          background: #f8ead5;
        }

        @media (max-width: 380px) {
          .venue-content {
            top: 23%;
          }

          .venue-content h1 {
            font-size: 29px;
          }

          .venue-address {
            font-size: 16px;
          }

          .venue-details {
            margin-top: 18px;
          }
        }

        @media (max-height: 700px) {
          .venue-content {
            top: 20%;
          }

          .venue-label {
            margin-bottom: 12px;
          }

          .venue-details {
            margin-top: 14px;
          }

          .venue-directions {
            margin-top: 15px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .venue-sparkle {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
