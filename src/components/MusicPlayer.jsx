import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MusicPlayer({ isOpened }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const targetVolume = 0.5;

  // Auto-play when the gift is opened
  useEffect(() => {
    if (isOpened && audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        let vol = 0;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = setInterval(() => {
          if (vol < targetVolume - 0.02) {
            vol += 0.02;
            audioRef.current.volume = vol;
          } else {
            audioRef.current.volume = targetVolume;
            clearInterval(fadeIntervalRef.current);
          }
        }, 50); // Slower, smoother fade in
      }).catch(err => {
        console.log("Audio autoplay was prevented:", err);
      });
    }
    
    return () => {
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [isOpened]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    if (isPlaying) {
      setIsPlaying(false);
      let vol = audioRef.current.volume;
      fadeIntervalRef.current = setInterval(() => {
        if (vol > 0.02) {
          vol -= 0.02;
          audioRef.current.volume = vol;
        } else {
          audioRef.current.volume = 0;
          audioRef.current.pause();
          clearInterval(fadeIntervalRef.current);
        }
      }, 30); // Fade out slightly faster
    } else {
      setIsPlaying(true);
      audioRef.current.volume = 0; // Ensure it starts from 0 for smooth fade in
      audioRef.current.play().catch(console.error);
      let vol = 0;
      fadeIntervalRef.current = setInterval(() => {
        if (vol < targetVolume - 0.02) {
          vol += 0.02;
          audioRef.current.volume = vol;
        } else {
          audioRef.current.volume = targetVolume;
          clearInterval(fadeIntervalRef.current);
        }
      }, 50); // Smooth fade in
    }
  };

  return (
    <>
      {/* You can replace the src with your actual music file in public folder later */}
      <audio ref={audioRef} src="/music/Ah - Nadin Amizah lyrics.mp3" loop />
      
      {isOpened && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            position: 'fixed',
            bottom: 'calc(30px + env(safe-area-inset-bottom, 0px))',
            right: 'calc(30px + env(safe-area-inset-right, 0px))',
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: 'var(--surface)',
            padding: '8px 8px 8px 20px',
            borderRadius: '50px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: '1px solid var(--border)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
            <span style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--accent)', marginBottom: '2px' }}>
              {isPlaying ? 'Now Playing' : 'Paused'}
            </span>
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text)', lineHeight: '1.2' }}>
              Ah
            </span>
            <span style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: '1.2' }}>
              Nadin Amizah
            </span>
          </div>
          
          <button
            onClick={togglePlay}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'transform 0.2s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" style={{ marginLeft: '2px' }} />}
          </button>
        </motion.div>
      )}
    </>
  );
}
