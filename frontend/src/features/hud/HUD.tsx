import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../stores/useGameStore';
import { motion } from 'framer-motion';

export const HUD = () => {
  const { t } = useTranslation('hud');
  const { gas, energy, turns, faction, level, events } = useGameStore();

  return (
    <div className="grid md:grid-cols-5 gap-4">
      {[{ label: t('gas'), value: gas.toLocaleString() }, { label: t('energy'), value: energy }, { label: t('turns'), value: turns }, { label: t('faction'), value: faction }, { label: t('level'), value: level }].map((item) => (
        <motion.div
          key={item.label}
          className="p-4 rounded-xl border border-neon-cyan/20 bg-black/40 shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">{item.label}</p>
          <p className="text-xl font-display text-neon-cyan">{item.value}</p>
        </motion.div>
      ))}
      {events.slice(0, 1).map((event) => (
        <motion.div
          key={event.id}
          className="md:col-span-5 p-4 rounded-xl border border-neon-magenta/30 bg-neon-magenta/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-neon-magenta">{event.name}</p>
          <p className="text-sm text-white/70">{event.description}</p>
        </motion.div>
      ))}
    </div>
  );
};
