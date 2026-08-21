import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function Reasons() {
  const { reasons } = birthdayData;

  return (
    <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--surface)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ fontSize: '2rem', marginBottom: '3rem', color: 'var(--text)' }}
        >
          Things I Love About You
        </motion.h2>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {reasons.map((reason, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              style={{
                fontSize: '1.2rem',
                fontFamily: 'var(--font-serif)',
                padding: '1rem',
                borderBottom: index !== reasons.length - 1 ? '1px solid var(--border)' : 'none',
                color: 'var(--muted)'
              }}
            >
              {reason}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
