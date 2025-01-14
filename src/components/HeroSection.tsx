import { useHero } from '@/contexts/HeroContext';
import { motion } from 'framer-motion';

export function HeroSection() {
  const { hero } = useHero();

  if (!hero) return null;

  return (
    <div 
      className="relative h-[600px] bg-cover bg-center"
      style={{ backgroundImage: `url(${hero.backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/50">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <motion.h1 
            className="text-5xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {hero.title}
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.button 
            className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {hero.buttonText}
          </motion.button>
        </div>
      </div>
    </div>
  );
} 