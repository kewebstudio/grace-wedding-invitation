
import { useEffect, useRef, useState } from "react";

import ClosedDoors from "./components/ClosedDoors";
import IntroScene from "./components/IntroScene";
import CoupleSection from "./components/CoupleSection";
import DateSection from "./components/DateSection";
import VenueSection from "./components/VenueSection";
import ReceptionSection from "./components/ReceptionSection";
import RSVP from "./components/RSVP";
import MusicToggle from "./components/MusicToggle";

function WeddingScene({ children, sceneRef, className = "" }) {
  return (
    <section
      ref={sceneRef}
      className={`wedding-scene ${className}`}
    >
      {children}
    </section>
  );
}

export default function App() {
  const [openingComplete, setOpeningComplete] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [dateUnlocked, setDateUnlocked] = useState(false);

  const musicRef = useRef(null);
  const dateRef = useRef(null);
  const lockRef = useRef(false);
  const dateTopRef = useRef(0);

  const handleDoorsOpen = () => {
    musicRef.current?.play();
    setOpeningComplete(true);
  };

  // Keep the date scene locked until the scratch card is revealed.
  useEffect(() => {
    if (!introComplete || dateUnlocked) return;

    const dateElement = dateRef.current;
    if (!dateElement) return;

    const updateDatePosition = () => {
      dateTopRef.current =
        dateElement.getBoundingClientRect().top + window.scrollY;
    };

    updateDatePosition();

    const handleScroll = () => {
      const dateTop = dateTopRef.current;

      if (window.scrollY >= dateTop - 2) {
        lockRef.current = true;

        if (window.scrollY > dateTop + 2) {
          window.scrollTo({
            top: dateTop,
            behavior: "auto",
          });
        }
      }
    };

    const handleWheel = (event) => {
      if (lockRef.current && event.deltaY > 0) {
        event.preventDefault();
      }
    };

    const handleTouchMove = (event) => {
      if (lockRef.current) {
        event.preventDefault();
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    window.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [introComplete, dateUnlocked]);

  const handleDateReveal = () => {
    lockRef.current = false;
    setDateUnlocked(true);
  };

  return (
    <main className="wedding-app">
      <MusicToggle ref={musicRef} />

      {/* OPENING DOORS */}
      {!openingComplete && (
        <ClosedDoors
          onStartMusic={() => musicRef.current?.play()}
          onContinue={handleDoorsOpen}
        />
      )}

      {/* INTRODUCTION */}
      {openingComplete && !introComplete && (
        <IntroScene
          onContinue={() => setIntroComplete(true)}
        />
      )}

      {/* CONTINUOUS WEDDING INVITATION */}
      {introComplete && (
        <div className="wedding-scroll-content">

          <WeddingScene>
            <CoupleSection />
          </WeddingScene>

          <WeddingScene sceneRef={dateRef}>
            <DateSection onReveal={handleDateReveal} />
          </WeddingScene>

          <WeddingScene>
            <VenueSection />
          </WeddingScene>

          <WeddingScene>
            <ReceptionSection />
          </WeddingScene>

          <WeddingScene>
            <RSVP />
          </WeddingScene>

        </div>
      )}

      <style>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html {
          width: 100%;
          min-height: 100%;
          margin: 0;
          padding: 0;
          scroll-behavior: smooth;
          scroll-padding: 0;
          background: #fff0dc;
        }

        body {
          width: 100%;
          min-height: 100%;
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          overflow-y: auto;
          background: #fff0dc;
          -webkit-overflow-scrolling: touch;
        }

        #root {
          display: block;
          width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          overflow: visible;
          background: #fff0dc;
        }

        .wedding-app {
          display: block;
          width: 100%;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          overflow: visible;
          background: #fff0dc;
        }

        .wedding-scroll-content {
          display: block;
          width: 100%;
          margin: 0;
          padding: 0;
          overflow: visible;
          background: #fff0dc;
        }

        .wedding-scene {
          position: relative;
          display: block;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 0;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #fff0dc;
          scroll-margin: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
      `}</style>
    </main>
  );
}
