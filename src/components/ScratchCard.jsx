import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';
import confetti from 'canvas-confetti';

export default function ScratchCard({ onScratched }) {
  const { coupons } = birthdayData;
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!coupons || coupons.length === 0) return;
    
    // Pick a random coupon
    const randomCoupon = coupons[Math.floor(Math.random() * coupons.length)];
    setSelectedCoupon(randomCoupon.text);

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Fill canvas with silver scratch layer
    ctx.fillStyle = '#b0bec5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some text on top of the scratch layer
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = '#78909c';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Gosok Di Sini!', canvas.width / 2, canvas.height / 2);

  }, [coupons]);

  const handlePointerDown = (e) => {
    setIsDrawing(true);
    scratch(e);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    checkScratchPercentage();
  };

  const handlePointerMove = (e) => {
    if (!isDrawing || isScratched) return;
    scratch(e);
  };

  const scratch = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Handle both touch and mouse events
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    
    if (percentage > 50 && !isScratched) {
      setIsScratched(true);
      if (onScratched) onScratched();
      // Clear the rest
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 100
      });
    }
  };

  if (!coupons || coupons.length === 0) return null;

  return (
    <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--background)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--accent)' }}
        >
          Hadiah Spesial!
        </motion.h2>
        <p style={{ color: 'var(--muted)', marginBottom: '3rem' }}>
          Gosok kartunya untuk dapetin kupon rahasia dari aku.
        </p>

        <div style={{ 
          position: 'relative', 
          width: '300px', 
          height: '150px', 
          margin: '0 auto',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          border: '2px dashed var(--accent)',
          backgroundColor: 'var(--surface)'
        }}>
          {/* The Hidden Coupon */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            color: 'var(--text)',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            zIndex: 1
          }}>
            {selectedCoupon}
          </div>

          {/* The Scratchable Canvas */}
          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              cursor: isScratched ? 'default' : 'pointer',
              touchAction: 'none' // Prevent scrolling while scratching on mobile
            }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
            onPointerOut={handlePointerUp}
          />
        </div>
        
        {isScratched && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ marginTop: '2rem', color: 'var(--accent)', fontWeight: 'bold' }}
          >
            Jangan lupa di-screenshot ya buat dituker! 📸
          </motion.p>
        )}
      </div>
    </section>
  );
}
