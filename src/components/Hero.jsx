import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function Hero() {
  return (
    <section style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{ width: '100%', maxWidth: '600px', marginBottom: '3rem' }}
      >
        <img 
          src={birthdayData.hero.image} 
          alt="Hero" 
          style={{ 
            width: '100%', 
            height: 'auto', 
            borderRadius: '12px',
            objectFit: 'cover',
            padding: '12px',
            backgroundColor: '#fff',
            border: '2px dashed var(--accent)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.05)'
          }} 
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--accent)' }}
      >
        {birthdayData.hero.title}, {birthdayData.name}
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        style={{ fontSize: '1.2rem', color: 'var(--muted)' }}
      >
        {birthdayData.hero.subtitle}
      </motion.p>
    </section>
  );
}
