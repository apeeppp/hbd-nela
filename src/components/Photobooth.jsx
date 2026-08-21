import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function Photobooth() {
  const { photobooth } = birthdayData;

  return (
    <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--surface)' }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        {photobooth.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
            transition={{ type: "spring", stiffness: 100, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            style={{
              padding: '16px',
              paddingBottom: '48px',
              backgroundColor: 'white',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              border: '1px solid var(--border)',
              width: '100%',
              maxWidth: '350px',
              textAlign: 'center'
            }}
          >
            <img 
              src={item.image} 
              alt={`Photobooth ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                marginBottom: '1rem',
                objectFit: 'cover'
              }}
            />
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              color: 'var(--text)'
            }}>
              {item.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
