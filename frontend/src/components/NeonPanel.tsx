import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type Variant = 'solid' | 'outline';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export const NeonPanel = ({ children, variant = 'solid', className, ...props }: PropsWithChildren<Props>) => (
  <motion.button
    {...props}
    className={clsx(
      'px-6 py-3 uppercase tracking-[0.3em] font-display text-sm backdrop-blur border transition shadow-lg',
      variant === 'solid'
        ? 'bg-neon-magenta/20 hover:bg-neon-magenta/40 border-neon-magenta/60 text-white'
        : 'bg-white/5 hover:bg-white/10 border-white/20 text-white/80',
      className
    )}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
  >
    {children}
  </motion.button>
);
