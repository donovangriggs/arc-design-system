import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const COUNTER_DURATION_MS = 2000;
const COUNTER_STEPS = 60;

export function CounterStat({
  value,
  label,
  delay,
}: {
  readonly value: string;
  readonly label: string;
  readonly delay: number;
}) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isNaN(numericValue)) return;

    const increment = numericValue / COUNTER_STEPS;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, COUNTER_DURATION_MS / COUNTER_STEPS);

    return () => clearInterval(timer);
  }, [numericValue]);

  const displayValue = isNaN(numericValue)
    ? value
    : value.replace(/[0-9]+/, count.toString());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-purple-500 via-teal-500 to-purple-500 bg-clip-text text-transparent mb-2">
        {displayValue}
      </div>
      <div className="hero-status-text text-sm text-zinc-400">{label}</div>
    </motion.div>
  );
}
