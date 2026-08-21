import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function FullScreenMemory() {
  const { fullScreenMemory } = birthdayData;

  return (
    <section style={{
      position: 'relative',
      height: '80vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1
        }}
      >
        <img 
          src={fullScreenMemory.image} 
          alt="Full Screen Memory"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7)'
          }}
        />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        style={{
          color: 'var(--surface)',
          fontSize: '2rem',
          maxWidth: '600px',
          textAlign: 'center',
          padding: '0 2rem',
          textShadow: '0px 2px 10px rgba(0,0,0,0.5)'
        }}
      >
        "{fullScreenMemory.caption}"
      </motion.h3>
    </section>
  );
}
