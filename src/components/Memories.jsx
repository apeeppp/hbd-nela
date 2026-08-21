import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function Memories({ onImageClick }) {
  const { memories } = birthdayData;

  return (
    <section style={{
      padding: '4rem 2rem',
      backgroundColor: 'var(--surface)',
      textAlign: 'center'
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ fontSize: '2rem', marginBottom: '3rem', color: 'var(--text)' }}
      >
        Our Little Memories
      </motion.h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {memories.map((memory, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              flexDirection: index % 2 === 0 ? 'column' : 'column-reverse',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <img 
              src={memory.image} 
              alt={`Memory ${index + 1}`}
              onClick={() => onImageClick && onImageClick(memory.image)}
              style={{
                width: '100%',
                maxWidth: '400px',
                borderRadius: '8px',
                objectFit: 'cover',
                cursor: 'zoom-in',
                padding: '12px',
                backgroundColor: '#fff',
                border: '2px dashed var(--accent)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                transform: index % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)'
              }}
            />
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              color: 'var(--muted)',
              fontStyle: 'italic'
            }}>
              "{memory.caption}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
