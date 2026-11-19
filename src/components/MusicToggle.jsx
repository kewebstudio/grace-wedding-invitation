
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Music2, VolumeX } from "lucide-react";

const MusicToggle = forwardRef(function MusicToggle(_, ref) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.warn("Music playback could not start:", error);
      setIsPlaying(false);
    }
  };

  const pauseMusic = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  useImperativeHandle(ref, () => ({
    play: playMusic,
    pause: pauseMusic,
  }));

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/wedding-music.mp3"
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <button
        type="button"
        className={`music-toggle ${isPlaying ? "music-playing" : ""}`}
        onClick={toggleMusic}
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        <span className="music-icon">
          {isPlaying ? (
            <Music2 size={19} />
          ) : (
            <VolumeX size={19} />
          )}
        </span>

        <span className="music-label">
          {isPlaying ? "Music On" : "Music Off"}
        </span>
      </button>

      <style>{`
        .music-toggle {
          position: fixed;
          right: 17px;
          bottom: 20px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border: 1px solid rgba(184, 139, 75, 0.65);
          border-radius: 30px;
          background: rgba(255, 248, 236, 0.96);
          color: #76502c;
          box-shadow: 0 4px 15px rgba(87, 57, 25, 0.15);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .music-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .music-label {
          font-family: "Montserrat", sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.8px;
        }

        .music-playing .music-icon {
          animation: musicPulse 1.5s ease-in-out infinite;
        }

        @keyframes musicPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }

        @media (max-width: 380px) {
          .music-toggle {
            right: 12px;
            bottom: 14px;
            padding: 9px 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .music-playing .music-icon {
            animation: none;
          }
        }
      `}</style>
    </>
  );
});

export default MusicToggle;
