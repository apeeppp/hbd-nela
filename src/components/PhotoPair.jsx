import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function PhotoPair() {
  const { photoPair } = birthdayData;

  return (
    <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--background)' }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        alignItems: 'center'
      }}>
        {photoPair.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 2 : -2 }}
            transition={{ duration: 0.8, type: 'spring' }}
            viewport={{ once: true }}
            style={{ textAlign: 'center' }}
          >
            <img 
              src={item.image} 
              alt={`Pair ${index + 1}`}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '1rem',
                padding: '12px',
                backgroundColor: '#fff',
                border: '2px dashed var(--accent)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                transform: index % 2 === 0 ? 'rotate(2deg)' : 'rotate(-2deg)'
              }}
            />
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              color: 'var(--muted)',
              fontStyle: 'italic'
            }}>
              "{item.caption}"
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
