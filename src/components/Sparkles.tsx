import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'motion/react';

const COUNT = 32;
const COLORS = ['var(--color-brand-gold)', 'rgba(255,255,255,0.6)'];

function useSparklePositions() {
  return useMemo(() => {
    return Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
    }));
  }, []);
}

export default function Sparkles() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const sparkles = useSparklePositions();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reduceMotion) return null;

  return (
    <div
      className="absolute inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden
    >
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            opacity: 0.15,
          }}
          animate={{
            opacity: [0.15, 0.4, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
