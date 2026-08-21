import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function MemoryTimeline() {
  const { timeline } = birthdayData;

  if (!timeline || timeline.length === 0) return null;

  return (
    <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--surface)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ fontSize: '2.5rem', marginBottom: '4rem', color: 'var(--accent)' }}
        >
          Our Journey
        </motion.h2>

        <div style={{ position: 'relative' }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '4px',
            backgroundColor: 'var(--border)',
            transform: 'translateX(-50%)',
            borderRadius: '4px'
          }} />

          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index} 
                style={{
                  display: 'flex',
                  justifyContent: isEven ? 'flex-start' : 'flex-end',
                  marginBottom: '3rem',
                  position: 'relative',
                  width: '100%'
                }}
              >
                {/* Node Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '20px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'var(--accent)',
                    borderRadius: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 2,
                    boxShadow: '0 0 0 4px var(--surface)'
                  }}
                />

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  style={{
                    width: '45%',
                    backgroundColor: 'var(--background)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    textAlign: isEven ? 'right' : 'left',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    border: '1px solid var(--border)'
                  }}
                >
                  <span style={{ 
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: 'var(--surface)',
                    color: 'var(--accent)',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    marginBottom: '12px',
                    border: '1px solid var(--border)'
                  }}>
                    {item.date}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--text)' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
