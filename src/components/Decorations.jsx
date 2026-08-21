import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import { useMemo, useEffect, useState } from 'react';

export default function Decorations() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const decorations = useMemo(() => {
    const icons = [Heart, Sparkles, Star];
    const colors = ['var(--accent)', '#e5b95c', '#dca9af'];
    
    // Generate 40 random decorations
    return Array.from({ length: 40 }).map((_, i) => {
      const Icon = icons[Math.floor(Math.random() * icons.length)];
      return {
        id: i,
        Icon,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 20 + 12, // 12 to 32px
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 3, // 3s to 6s
      };
    });
  }, []);

  if (!mounted) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden'
    }}>
      {decorations.map((deco) => (
        <motion.div
          key={deco.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: deco.duration,
            repeat: Infinity,
            delay: deco.delay,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            top: deco.top,
            left: deco.left,
            color: deco.color
          }}
        >
          <deco.Icon size={deco.size} fill={deco.Icon === Heart ? deco.color : 'none'} />
        </motion.div>
      ))}
    </div>
  );
}
