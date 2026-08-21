import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export default function Opening({ onOpen }) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Make it "RAME BANGET" with continuous confetti fireworks
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Prepare floating background elements
    const newElements = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      emoji: ['✨', '🎉', '💖', '🎂', '🎈', '🎊', '🎁', '🎀'][Math.floor(Math.random() * 8)],
      size: Math.random() * 30 + 20,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5
    }));
    setElements(newElements);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="opening-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--background)',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        overflow: 'hidden'
      }}
    >
      {/* Floating Elements */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0],
            y: [0, -150], // Float upwards by 150 pixels
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            left: el.left,
            top: el.top,
            fontSize: `${el.size}px`,
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {el.emoji}
        </motion.div>
      ))}

      <motion.h1 
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
        style={{ 
          fontSize: 'clamp(2.5rem, 8vw, 4rem)', 
          marginBottom: '1rem', 
          color: 'var(--accent)', 
          zIndex: 20, 
          textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center',
          padding: '0 20px'
        }}
      >
        Happy Birthday!
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.6, type: "spring", bounce: 0.5 }}
        style={{ 
          fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
          marginBottom: '3rem', 
          zIndex: 20, 
          textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
          textAlign: 'center',
          padding: '0 20px'
        }}
      >
        {birthdayData.name} 🎉
      </motion.h2>
      
      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring", bounce: 0.6 }}
        whileHover={{ scale: 1.1, rotate: 2, boxShadow: '0px 10px 20px rgba(0,0,0,0.15)' }}
        whileTap={{ scale: 0.9 }}
        onClick={onOpen}
        style={{
          padding: '16px 40px',
          backgroundColor: 'var(--text)',
          color: 'var(--surface)',
          borderRadius: '50px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          border: 'none',
          cursor: 'pointer',
          zIndex: 20,
          boxShadow: '0px 4px 10px rgba(0,0,0,0.1)'
        }}
      >
        Open Your Gift 🎁
      </motion.button>
    </motion.div>
  );
}
