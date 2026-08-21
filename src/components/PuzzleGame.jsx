import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { birthdayData } from '../data/birthdayData';

// Helper to check if array is sorted
const isSorted = (arr) => arr.every((val, index) => val === index);

export default function PuzzleGame({ onSolved }) {
  const [tiles, setTiles] = useState([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1); // Default square

  const gridSize = 3;
  const image = "/src/assets/images/a.jpg";

  // Initialize and shuffle
  useEffect(() => {
    let initialTiles = Array.from({ length: 9 }, (_, i) => i);
    // Simple shuffle ensuring it's not already sorted
    do {
      initialTiles.sort(() => Math.random() - 0.5);
    } while (isSorted(initialTiles));
    
    setTiles(initialTiles);
  }, []);

  const handleTileClick = (index) => {
    if (isSolved) return;
    if (!hasStarted) setHasStarted(true);

    if (selectedTileIndex === null) {
      // Select first tile
      setSelectedTileIndex(index);
    } else {
      // Swap tiles
      const newTiles = [...tiles];
      const temp = newTiles[index];
      newTiles[index] = newTiles[selectedTileIndex];
      newTiles[selectedTileIndex] = temp;
      
      setTiles(newTiles);
      setSelectedTileIndex(null);

      if (isSorted(newTiles)) {
        setIsSolved(true);
        if (onSolved) onSolved();
        fireConfetti();
      }
    }
  };

  const fireConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
    }, 250);
  };

  return (
    <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--surface)', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <h2 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>
          Unlock the Letter
        </h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
          {isSolved 
            ? "You did it! Perfect match. ❤️" 
            : "Solve this mini puzzle before you can read your birthday letter! Click two pieces to swap them."}
        </p>

        <img 
          src={image} 
          alt="hidden" 
          style={{ display: 'none' }} 
          onLoad={(e) => setAspectRatio(e.target.naturalWidth / e.target.naturalHeight)} 
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: '2px',
          width: '100%',
          maxWidth: '400px',
          aspectRatio: aspectRatio,
          margin: '0 auto',
          backgroundColor: 'var(--border)',
          border: '4px solid #fff',
          borderRadius: '8px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {tiles.map((tileValue, index) => {
            const row = Math.floor(tileValue / gridSize);
            const col = tileValue % gridSize;
            const isSelected = selectedTileIndex === index;

            return (
              <motion.div
                key={index}
                onClick={() => handleTileClick(index)}
                initial={{ opacity: 0, scale: 0.3, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20 
                }}
                whileHover={!isSolved ? { scale: 0.95 } : {}}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${image})`,
                  backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                  backgroundPosition: `${(col * 100) / (gridSize - 1)}% ${(row * 100) / (gridSize - 1)}%`,
                  cursor: isSolved ? 'default' : 'pointer',
                  opacity: isSelected ? 0.6 : 1,
                  border: isSelected ? '2px solid var(--accent)' : 'none',
                  transition: 'opacity 0.2s',
                  boxSizing: 'border-box'
                }}
              />
            );
          })}
        </div>

        {isSolved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            style={{ marginTop: '2rem' }}
          >
            <p style={{ fontSize: '1.2rem', color: 'var(--text)', fontWeight: 'bold' }}>
              Scroll down to continue to the next gift! 💌
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
