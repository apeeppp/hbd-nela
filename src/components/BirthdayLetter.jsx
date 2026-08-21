import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function BirthdayLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const { letter } = birthdayData;

  return (
    <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--background)', textAlign: 'center' }}>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{
              maxWidth: '400px',
              margin: '0 auto',
              padding: '4rem 2rem',
              backgroundColor: 'white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              cursor: 'pointer'
            }}
            onClick={() => setIsOpen(true)}
            whileHover={{ y: -5 }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>
              A Letter for You
            </h3>
            <button style={{
              padding: '8px 24px',
              backgroundColor: 'var(--text)',
              color: 'var(--surface)',
              borderRadius: '4px'
            }}>
              Open Letter
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              padding: '3rem 2rem',
              backgroundColor: 'white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              textAlign: 'left'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--accent)', marginBottom: '2rem', textAlign: 'center' }}>
              {letter.title}
            </h3>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: 'var(--text)',
              fontFamily: 'var(--font-serif)',
              whiteSpace: 'pre-wrap'
            }}>
              {letter.content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
