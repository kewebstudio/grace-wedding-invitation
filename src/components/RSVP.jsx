
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Download,
  Heart,
  Send,
  X,
} from "lucide-react";
import weddingData from "../data/weddingData";

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

const smoothTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

export default function RSVP() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);

  const { rsvp, invitation } = weddingData;
  const invitationImage = invitation?.image || "/images/wedding.jpg";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    setSubmitted(true);
  };

  const downloadInvitation = () => {
    const link = document.createElement("a");
    link.href = invitationImage;
    link.download = "Daniel-and-Grace-Wedding-Invitation.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="rsvp-scene">

      <div className="rsvp-background" />

      {/* FLOATING GOLDEN SPARKLES */}
      <div className="rsvp-sparkles" aria-hidden="true">
        {sparkles.map(({ left, top, delay }, index) => (
          <motion.span
            key={index}
            className="rsvp-sparkle"
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

      {/* RSVP CONTENT */}
      <motion.div
        className="rsvp-content"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportSettings}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* HEADING */}
        <motion.div
          className="rsvp-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ ...smoothTransition, delay: 0.15 }}
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "5px" }}
            whileInView={{ opacity: 1, letterSpacing: "1.6px" }}
            viewport={viewportSettings}
            transition={{ duration: 1.2 }}
          >
            WITH LOVE AND GRATITUDE
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            Share Your Love
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportSettings}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            Your prayers and blessings mean so much
            as we begin this beautiful journey.
          </motion.p>
        </motion.div>

        {/* FORM / SUCCESS MESSAGE */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="rsvp-success"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7 }}
            >
              <Heart size={27} />

              <h3>Thank You, {name}!</h3>

              <p>
                Your love and blessings are truly treasured.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              className="rsvp-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportSettings}
              transition={{ duration: 0.9, delay: 0.35 }}
            >
              <motion.div
                className="rsvp-field"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportSettings}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <label htmlFor="rsvp-name">
                  Your Name
                </label>

                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </motion.div>

              <motion.div
                className="rsvp-field"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportSettings}
                transition={{ duration: 0.8, delay: 0.35 }}
              >
                <label htmlFor="rsvp-message">
                  Your Wishes & Blessings
                </label>

                <textarea
                  id="rsvp-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your wishes for Daniel & Grace..."
                  rows={2}
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                className="rsvp-submit"
                whileHover={{ scale: 1.035 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportSettings}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Send size={14} />
                {rsvp?.buttonText || "Send Your Blessings ❤️"}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* INVITATION ACTIONS */}
        <motion.div
          className="rsvp-actions"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ duration: 0.9, delay: 0.65 }}
        >
          <motion.button
            type="button"
            onClick={() => setShowInvitation(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Eye size={14} />
            View Invitation
          </motion.button>

          <motion.button
            type="button"
            onClick={downloadInvitation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download size={14} />
            Download Invitation
          </motion.button>
        </motion.div>

      </motion.div>

      {/* INVITATION PREVIEW POPUP */}
      <AnimatePresence>
        {showInvitation && (
          <motion.div
            className="invitation-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInvitation(false)}
          >
            <motion.div
              className="invitation-modal"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="invitation-close"
                type="button"
                aria-label="Close invitation"
                onClick={() => setShowInvitation(false)}
              >
                <X size={21} />
              </button>

              <div className="invitation-preview">
                <img
                  src={invitationImage}
                  alt="Daniel and Grace Wedding Invitation"
                />
              </div>

              <button
                type="button"
                className="invitation-download"
                onClick={downloadInvitation}
              >
                <Download size={16} />
                Download Invitation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .rsvp-scene {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 0;
          margin: 0;
          padding: 0;
          overflow: hidden;
          isolation: isolate;
          background: #fff2df;
          color: #684426;
          font-family: "Cormorant Garamond", serif;
        }

        .rsvp-background {
          position: absolute;
          inset: 0;
          z-index: -1;
          background-image: url("/images/rsvp.jpg");
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        .rsvp-sparkles {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .rsvp-sparkle {
          position: absolute;
          color: #c39751;
          font-size: 15px;
          text-shadow: 0 0 9px rgba(206, 158, 83, 0.55);
        }

        .rsvp-content {
          position: absolute;
          top: 34%;
          left: 9%;
          width: 82%;
          max-width: 390px;
          margin: 0 auto;
          padding: 0;
          text-align: center;
          overflow: visible;
          z-index: 2;
        }

        /* HEADING */

        .rsvp-heading {
          margin-bottom: 11px;
        }

        .rsvp-heading > span {
          display: block;
          margin-bottom: 5px;
          color: #a87536;
          font-family: "Montserrat", sans-serif;
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 1.6px;
        }

        .rsvp-heading h2 {
          margin: 0;
          color: #59391f;
          font-size: clamp(25px, 7vw, 33px);
          font-weight: 500;
          line-height: 1.1;
        }

        .rsvp-heading p {
          max-width: 270px;
          margin: 5px auto 0;
          color: #936d4c;
          font-size: 14px;
          line-height: 1.3;
        }

        /* FORM */

        .rsvp-form {
          display: flex;
          flex-direction: column;
          gap: 7px;
          width: 100%;
          text-align: left;
        }

        .rsvp-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 100%;
        }

        .rsvp-form label {
          margin-top: 3px;
          color: #80552d;
          font-family: "Montserrat", sans-serif;
          font-size: 9px;
          font-weight: 600;
        }

        .rsvp-form input,
        .rsvp-form textarea {
          display: block;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          padding: 8px 11px;
          border: 1px solid rgba(181, 128, 64, 0.48);
          border-radius: 8px;
          outline: none;
          background: rgba(255, 251, 244, 0.95);
          color: #59391f;
          font-family: "Cormorant Garamond", serif;
          font-size: 14px;
        }

        .rsvp-form textarea {
          min-height: 55px;
          height: 55px;
          resize: none;
        }

        .rsvp-form input:focus,
        .rsvp-form textarea:focus {
          border-color: #b47a32;
        }

        .rsvp-form input::placeholder,
        .rsvp-form textarea::placeholder {
          color: #b49a7e;
        }

        /* SUBMIT BUTTON */

        .rsvp-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-self: center;
          gap: 7px;
          margin-top: 7px;
          padding: 9px 18px;
          border: 1px solid #b8874b;
          border-radius: 30px;
          background: rgba(255, 250, 241, 0.97);
          color: #704821;
          font-family: "Montserrat", sans-serif;
          font-size: 9px;
          font-weight: 600;
          cursor: pointer;
        }

        /* INVITATION ACTIONS */

        .rsvp-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 12px;
          padding-bottom: 0;
        }

        .rsvp-actions button {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #896039;
          font-family: "Montserrat", sans-serif;
          font-size: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .rsvp-actions button:hover {
          color: #bd842f;
        }

        /* SUCCESS MESSAGE */

        .rsvp-success {
          padding: 10px 5px;
          text-align: center;
        }

        .rsvp-success svg {
          color: #b7833e;
        }

        .rsvp-success h3 {
          margin: 7px 0 4px;
          font-size: 24px;
          font-weight: 500;
        }

        .rsvp-success p {
          margin: 0;
          color: #936d4c;
          font-size: 14px;
        }

        /* INVITATION MODAL */

        .invitation-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          box-sizing: border-box;
          background: rgba(32, 22, 14, 0.76);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .invitation-modal {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: min(100%, 440px);
          max-height: 94%;
          padding: 12px;
          box-sizing: border-box;
          border: 1px solid rgba(206, 165, 103, 0.65);
          border-radius: 12px;
          background: #fffaf1;
          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.3);
        }

        .invitation-close {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border: 1px solid rgba(153, 108, 53, 0.35);
          border-radius: 50%;
          background: rgba(255, 250, 241, 0.96);
          color: #684426;
          cursor: pointer;
        }

        .invitation-preview {
          display: flex;
          justify-content: center;
          width: 100%;
          min-height: 0;
          overflow: auto;
        }

        .invitation-preview img {
          display: block;
          width: 100%;
          height: auto;
          max-height: calc(94svh - 100px);
          object-fit: contain;
          border-radius: 5px;
        }

        .invitation-download {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 10px;
          padding: 10px 20px;
          border: 1px solid #b8874b;
          border-radius: 25px;
          background: #fffaf1;
          color: #704821;
          font-family: "Montserrat", sans-serif;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 380px) {
          .rsvp-content {
            top: 34%;
            left: 8%;
            width: 84%;
          }

          .rsvp-heading h2 {
            font-size: 26px;
          }

          .rsvp-heading p {
            font-size: 13px;
          }

          .rsvp-actions {
            gap: 12px;
          }
        }

        @media (max-height: 600px) {
          .rsvp-content {
            top: 29%;
          }

          .rsvp-heading {
            margin-bottom: 7px;
          }

          .rsvp-form textarea {
            height: 45px;
            min-height: 45px;
          }

          .rsvp-actions {
            margin-top: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .rsvp-sparkle {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
