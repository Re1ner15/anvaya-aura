import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  type?: 'words' | 'chars' | 'lines';
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const wordVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    rotateX: -90,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
};

const charVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
};

export const AnimatedWords = ({ 
  children, 
  className = '',
  delay = 0,
  staggerDelay = 0.1,
}: AnimatedTextProps) => {
  const words = children.split(' ');

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          variants={wordVariants}
          style={{ perspective: 1000 }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export const AnimatedChars = ({ 
  children, 
  className = '',
  delay = 0,
  staggerDelay = 0.03,
}: AnimatedTextProps) => {
  const chars = children.split('');

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={charVariants}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

interface TypewriterProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  showCursor?: boolean;
}

export const Typewriter = ({ 
  text, 
  className = '', 
  delay = 0,
  speed = 50,
  showCursor = true,
}: TypewriterProps) => {
  return (
    <motion.span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + index * (speed / 1000),
            duration: 0,
          }}
        >
          {char}
        </motion.span>
      ))}
      {showCursor && (
        <motion.span
          className="inline-block w-[2px] h-[1em] bg-current ml-1 animate-cursor-blink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + text.length * (speed / 1000) }}
        />
      )}
    </motion.span>
  );
};

interface GradientWipeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const GradientWipe = ({ 
  children, 
  className = '', 
  delay = 0,
  duration = 1,
}: GradientWipeProps) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

interface ScrambleTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export const ScrambleText = ({ 
  children, 
  className = '',
  delay = 0,
}: ScrambleTextProps) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * 0.05 }}
        >
          <motion.span
            animate={{
              content: [
                chars[Math.floor(Math.random() * chars.length)],
                chars[Math.floor(Math.random() * chars.length)],
                char,
              ],
            }}
            transition={{
              duration: 0.3,
              delay: delay + index * 0.05,
              times: [0, 0.5, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </motion.span>
      ))}
    </motion.span>
  );
};

interface SplitRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export const SplitReveal = ({ 
  children, 
  className = '',
  delay = 0,
}: SplitRevealProps) => {
  const words = children.split(' ');
  
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          initial={{ 
            opacity: 0, 
            x: index % 2 === 0 ? -30 : 30,
            rotateY: index % 2 === 0 ? -10 : 10,
          }}
          whileInView={{ 
            opacity: 1, 
            x: 0,
            rotateY: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
