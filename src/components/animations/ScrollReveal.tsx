import { motion, Variants, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  once?: boolean;
}

const getVariants = (direction: string, distance: number): Variants => {
  const directions: Record<string, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
};

export const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 40,
  once = true,
}: ScrollRevealProps) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={getVariants(direction, distance)}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export const StaggerContainer = ({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.1,
}: StaggerContainerProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
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
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className = '' }: StaggerItemProps) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            damping: 20,
            stiffness: 100,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

interface ScaleRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const ScaleReveal = ({ 
  children, 
  className = '', 
  delay = 0 
}: ScaleRevealProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.68, -0.55, 0.265, 1.55],
      }}
    >
      {children}
    </motion.div>
  );
};

interface BlurRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const BlurReveal = ({ 
  children, 
  className = '', 
  delay = 0 
}: BlurRevealProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
};

interface FloatingProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
}

export const Floating = ({ 
  children, 
  className = '', 
  duration = 6,
  distance = 20,
}: FloatingProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxWrapperProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxWrapper = ({ 
  children, 
  className = '', 
  speed = 0.5,
}: ParallaxWrapperProps) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      style={{
        willChange: 'transform',
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 30,
      }}
    >
      {children}
    </motion.div>
  );
};
