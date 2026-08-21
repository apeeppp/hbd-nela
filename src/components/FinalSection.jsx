import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function FinalSection() {
  const { final } = birthdayData;

  return (
    <section style={{ backgroundColor: 'var(--background)' }}>
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '3rem' }}
        >
          <img 
            src={final.image} 
            alt="Final Memory"
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#fff',
              border: '2px dashed var(--accent)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
              transform: 'rotate(1deg)'
            }}
          />
        </motion.div>
      </div>

      <div style={{ 
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem 10rem 2rem',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          style={{ maxWidth: '400px', marginBottom: '2rem' }}
        >
          <img 
            src={final.lastImage} 
            alt="Last Photo"
            style={{ 
              width: '100%', 
              borderRadius: '100px 100px 8px 8px',
              padding: '12px',
              backgroundColor: '#fff',
              border: '2px dashed var(--accent)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
            }}
          />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--accent)' }}
        >
          {final.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          style={{ fontSize: '1.2rem', color: 'var(--muted)', marginBottom: '3rem' }}
        >
          {final.message}
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            padding: '12px 32px',
            backgroundColor: 'transparent',
            border: '1px solid var(--text)',
            color: 'var(--text)',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to the Beginning
        </motion.button>
      </div>
    </section>
  );
}
