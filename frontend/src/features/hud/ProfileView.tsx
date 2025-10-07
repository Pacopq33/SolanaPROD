import { useGameStore } from '../../stores/useGameStore';

export const ProfileView = () => {
  const { faction, level } = useGameStore();

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-display tracking-[0.3em] text-neon-cyan uppercase">Perfil</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 border border-white/10 rounded-xl bg-black/40">
          <p className="uppercase text-xs tracking-[0.3em] text-white/50">Facción</p>
          <p className="text-lg font-display text-neon-magenta">{faction}</p>
        </div>
        <div className="p-4 border border-white/10 rounded-xl bg-black/40">
          <p className="uppercase text-xs tracking-[0.3em] text-white/50">Nivel</p>
          <p className="text-lg font-display text-neon-magenta">{level}</p>
        </div>
      </div>
    </section>
  );
};
