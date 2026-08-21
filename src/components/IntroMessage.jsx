import { motion } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function IntroMessage() {
  return (
    <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--surface)', textAlign: 'center' }}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{
          fontSize: '1.5rem',
          fontFamily: 'var(--font-serif)',
          maxWidth: '700px',
          margin: '0 auto',
          color: 'var(--text)',
          lineHeight: '1.8'
        }}
      >
        "{birthdayData.intro}"
      </motion.p>
    </section>
  );
}
