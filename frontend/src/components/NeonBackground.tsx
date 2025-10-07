import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

export const NeonBackground = ({ children }: PropsWithChildren) => (
  <div className="min-h-screen bg-background text-white relative overflow-hidden">
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{
        background: [
          'radial-gradient(circle at 20% 20%, rgba(0,245,255,0.15), transparent 55%)',
          'radial-gradient(circle at 80% 30%, rgba(255,0,245,0.2), transparent 55%)',
          'radial-gradient(circle at 50% 80%, rgba(245,166,35,0.18), transparent 55%)'
        ]
      }}
      transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror' }}
    />
    <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 min-h-screen">
      {children}
    </div>
  </div>
);
