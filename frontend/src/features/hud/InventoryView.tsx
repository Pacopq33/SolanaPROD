import { useGameStore } from '../../stores/useGameStore';
import { motion } from 'framer-motion';

export const InventoryView = () => {
  const { assets } = useGameStore();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-display tracking-[0.3em] text-neon-cyan uppercase">Inventario</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {assets.map((asset) => (
          <motion.div
            key={asset.id}
            className="p-4 border border-white/10 rounded-xl bg-black/50"
            whileHover={{ y: -4 }}
          >
            <p className="uppercase text-xs tracking-[0.3em] text-white/50">{asset.type}</p>
            <p className="font-display text-neon-magenta text-lg">Tier {asset.tier}</p>
            <p className="text-white/60">Energía: {asset.energy}</p>
            <p className="text-white/60">Facción: {asset.faction}</p>
            <p className="text-white/60">Rareza: {asset.rarity}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
