import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Opening from './components/Opening';
import Hero from './components/Hero';
import IntroMessage from './components/IntroMessage';
import Memories from './components/Memories';
import FullScreenMemory from './components/FullScreenMemory';
import PhotoPair from './components/PhotoPair';
import Photobooth from './components/Photobooth';
import MemoryTimeline from './components/MemoryTimeline';
import Reasons from './components/Reasons';
import MiniQuiz from './components/MiniQuiz';
import PuzzleGame from './components/PuzzleGame';
import BirthdayLetter from './components/BirthdayLetter';
import VirtualCake from './components/VirtualCake';
import ScratchCard from './components/ScratchCard';
import FinalSection from './components/FinalSection';
import Lightbox from './components/Lightbox';
import MusicPlayer from './components/MusicPlayer';
import Decorations from './components/Decorations';
import './index.css';

function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [isQuizSolved, setIsQuizSolved] = useState(false);
  const [isCakeBlown, setIsCakeBlown] = useState(false);
  const [isCardScratched, setIsCardScratched] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    // document.documentElement.requestFullscreen().catch((e) => console.log(e));
  };

  return (
    <>
      <AnimatePresence>
        {!isOpened && <Opening onOpen={handleOpen} />}
      </AnimatePresence>

      <MusicPlayer isOpened={isOpened} />
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />

      {isOpened && (
        <main style={{ position: 'relative', zIndex: 10 }}>
          <Decorations />
          <Hero />
          <IntroMessage />
          <Memories onImageClick={setLightboxImage} />
          <FullScreenMemory />
          <PhotoPair onImageClick={setLightboxImage} />
          <Photobooth onImageClick={setLightboxImage} />
          <MemoryTimeline />
          <Reasons />
          <PuzzleGame onSolved={() => setIsPuzzleSolved(true)} />
          
          {isPuzzleSolved && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MiniQuiz onComplete={() => setIsQuizSolved(true)} />
            </motion.div>
          )}

          {isQuizSolved && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <VirtualCake onBlown={() => setIsCakeBlown(true)} />
            </motion.div>
          )}

          {isCakeBlown && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <ScratchCard onScratched={() => setIsCardScratched(true)} />
            </motion.div>
          )}

          {isCardScratched && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <BirthdayLetter />
              <FinalSection />
            </motion.div>
          )}
        </main>
      )}
    </>
  );
}

export default App;
