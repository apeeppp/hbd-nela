import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../data/birthdayData';

export default function MiniQuiz({ onComplete }) {
  const { quiz } = birthdayData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  if (!quiz || quiz.length === 0) return null;

  const currentQuestion = quiz[currentQuestionIndex];
  const isFinished = currentQuestionIndex >= quiz.length;

  const handleOptionClick = (index) => {
    if (showResult) return;
    
    setSelectedOption(index);
    const correct = index === currentQuestion.correctAnswer;
    
    setShowResult(true);
    setIsWrong(!correct);

    setTimeout(() => {
      setShowResult(false);
      setSelectedOption(null);
      setIsWrong(false);
      if (correct) {
        if (currentQuestionIndex + 1 >= quiz.length) {
          setCurrentQuestionIndex(prev => prev + 1);
          if (onComplete) onComplete();
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
        }
      }
    }, 1500);
  };

  return (
    <section style={{ padding: '6rem 2rem', backgroundColor: 'var(--background)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--accent)' }}
        >
          Seberapa Tahu Kamu?
        </motion.h2>

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              style={{
                backgroundColor: 'var(--surface)',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
                border: '1px solid var(--border)'
              }}
            >
              <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>
                Question {currentQuestionIndex + 1} of {quiz.length}
              </p>

              <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem', color: 'var(--text)' }}>
                {currentQuestion.question}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {currentQuestion.options.map((option, index) => {
                  let btnStyle = {
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '2px solid var(--border)',
                    backgroundColor: 'transparent',
                    color: 'var(--text)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    textAlign: 'left'
                  };

                  if (showResult && selectedOption === index) {
                    if (index === currentQuestion.correctAnswer) {
                      btnStyle.backgroundColor = '#4CAF50';
                      btnStyle.color = 'white';
                      btnStyle.borderColor = '#4CAF50';
                    } else {
                      btnStyle.backgroundColor = '#f44336';
                      btnStyle.color = 'white';
                      btnStyle.borderColor = '#f44336';
                    }
                  }

                  return (
                    <motion.button
                      key={index}
                      whileHover={!showResult ? { scale: 1.02, borderColor: 'var(--accent)' } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      onClick={() => handleOptionClick(index)}
                      style={btnStyle}
                      disabled={showResult}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>

              <div style={{ minHeight: '80px', marginTop: '2rem' }}>
                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{
                        padding: '1rem',
                        borderRadius: '8px',
                        backgroundColor: isWrong ? '#ffebee' : '#e8f5e9',
                        color: isWrong ? '#c62828' : '#2e7d32',
                        fontWeight: 'bold'
                      }}
                    >
                      {isWrong ? currentQuestion.wrongMessage : currentQuestion.successMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              style={{
                backgroundColor: 'var(--surface)',
                padding: '3rem 2rem',
                borderRadius: '16px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
                border: '1px solid var(--border)'
              }}
            >
              <h3 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                Quiz Selesai! 🎉
              </h3>
              <p style={{ color: 'var(--text)', fontSize: '1.2rem' }}>
                Kamu berhasil menjawab semuanya. Lanjut scroll ke bawah ya!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
