import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';
import { useGameStore } from '../../stores/useGameStore';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ExplorationResponse {
  success: boolean;
  rewardGas: number;
  narrative: string;
  loot?: {
    id: string;
    type: string;
    tier: number;
  };
}

export const ExplorationView = () => {
  const { t } = useTranslation('exploration');
  const queryClient = useQueryClient();
  const { maps, turns, setLastExploration, lastExploration } = useGameStore();
  const [selectedMap, setSelectedMap] = useState<string | undefined>(maps[0]?.id);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await api.post<ExplorationResponse>('/exploration/start', { mapId: selectedMap });
      return data;
    },
    onSuccess: (data) => {
      setLastExploration(data);
      queryClient.invalidateQueries({ queryKey: ['summary'] }).catch(console.error);
    }
  });

  return (
    <section className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display tracking-[0.3em] text-neon-cyan uppercase">{t('title')}</h2>
          <p className="text-white/60 uppercase text-xs tracking-[0.3em]">
            {t('dailyTurns')}: {turns}
          </p>
        </div>
        <div className="flex gap-3">
          {maps.map((map) => (
            <button
              key={map.id}
              onClick={() => setSelectedMap(map.id)}
              className={`px-4 py-2 rounded-lg border text-sm uppercase tracking-[0.2em] transition ${
                selectedMap === map.id ? 'border-neon-cyan text-neon-cyan' : 'border-white/10 text-white/60'
              }`}
            >
              {map.name}
            </button>
          ))}
        </div>
      </header>
      <motion.button
        onClick={() => mutate()}
        disabled={!selectedMap || isPending}
        className="px-6 py-3 rounded-xl bg-neon-cyan/20 border border-neon-cyan/40 text-neon-cyan uppercase tracking-[0.3em] hover:bg-neon-cyan/30 disabled:opacity-50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isPending ? '...' : t('start')}
      </motion.button>
      {lastExploration && (
        <div className="p-6 rounded-xl border border-white/10 bg-black/50 space-y-4">
          <p className={`font-display text-xl ${lastExploration.success ? 'text-neon-cyan' : 'text-neon-magenta'}`}>
            {lastExploration.success ? 'Operación exitosa' : 'Operación fallida'} — {lastExploration.rewardGas} GAS
          </p>
          <p className="text-white/70">{lastExploration.narrative}</p>
          {lastExploration.loot && (
            <p className="text-white/60">
              Loot: {lastExploration.loot.type} Tier {lastExploration.loot.tier}
            </p>
          )}
        </div>
      )}
    </section>
  );
};
