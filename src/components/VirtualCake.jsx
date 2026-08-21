import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function VirtualCake({ onBlown }) {
  const [isBlown, setIsBlown] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;
    setIsBlown(true);
    if (onBlown) onBlown();
    
    // Trigger confetti explosion
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--surface)', textAlign: 'center' }}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--accent)' }}
      >
        Make a Wish!
      </motion.h2>

      <div style={{ position: 'relative', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
        
        {/* Candle */}
        <motion.div 
          onClick={handleBlowCandle}
          style={{ 
            width: '20px', 
            height: '60px', 
            backgroundColor: '#ffcc80', 
            borderRadius: '4px',
            position: 'relative',
            cursor: isBlown ? 'default' : 'pointer',
            zIndex: 3
          }}
          whileHover={!isBlown ? { scale: 1.1 } : {}}
        >
          {/* Flame */}
          {!isBlown && (
            <motion.div
              animate={{ 
                scale: [1, 1.1, 0.9, 1.2, 1],
                rotate: [-2, 2, -3, 3, 0],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ repeat: Infinity, duration: 0.5 }}
              style={{
                position: 'absolute',
                top: '-35px',
                left: '50%',
                x: '-50%',
                width: '20px',
                height: '35px',
                backgroundColor: '#ff9800',
                borderRadius: '50% 50% 20% 20%',
                boxShadow: '0 0 20px #ff9800, 0 0 40px #ffeb3b, inset 0 0 10px #ffeb3b',
                transformOrigin: 'bottom center'
              }}
            />
          )}
          {/* Wick */}
          <div style={{
            position: 'absolute',
            top: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '4px',
            height: '10px',
            backgroundColor: '#333'
          }} />
        </motion.div>

        {/* Cake Layers */}
        <div style={{
          width: '200px',
          height: '60px',
          backgroundColor: '#ff8a80',
          borderRadius: '10px 10px 0 0',
          position: 'relative',
          zIndex: 2,
          boxShadow: 'inset 0 -10px 0 rgba(0,0,0,0.1)'
        }} />
        <div style={{
          width: '240px',
          height: '70px',
          backgroundColor: '#ff5252',
          borderRadius: '10px',
          position: 'relative',
          zIndex: 1,
          boxShadow: 'inset 0 -10px 0 rgba(0,0,0,0.1), 0 10px 20px rgba(0,0,0,0.2)'
        }} />
        
        {/* Plate */}
        <div style={{
          width: '300px',
          height: '20px',
          backgroundColor: '#cfd8dc',
          borderRadius: '50%',
          marginTop: '-10px',
          zIndex: 0,
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }} />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isBlown ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        style={{ marginTop: '3rem', fontSize: '1.5rem', color: 'var(--text)', fontWeight: 'bold' }}
      >
        Yay! Semoga semua doamu terkabul ❤️
      </motion.p>
      
      {!isBlown && (
        <p style={{ marginTop: '2rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
          Tap lilinnya buat tiup!
        </p>
      )}
    </section>
  );
}
