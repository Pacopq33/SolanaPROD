import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';

const mintOptions = [
  { id: 'basic', labelKey: 'mint.basic', price: 50, tiers: 'T1-T2' },
  { id: 'intermediate', labelKey: 'mint.intermediate', price: 120, tiers: 'T2-T4' },
  { id: 'premium', labelKey: 'mint.premium', price: 250, tiers: 'T3-T5' }
];

export const MintView = () => {
  const { t } = useTranslation('mint');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (bundleId: string) => {
      await api.post('/mint', { bundleId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summary'] }).catch(console.error);
    }
  });

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-display tracking-[0.3em] text-neon-cyan uppercase">{t('title')}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {mintOptions.map((option) => (
          <div key={option.id} className="p-4 border border-white/10 rounded-xl bg-black/40 space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{t(option.labelKey)}</p>
            <p className="font-display text-lg text-neon-magenta">{option.price} GAS</p>
            <p className="text-white/60">{option.tiers}</p>
            <button
              onClick={() => mutate(option.id)}
              className="mt-2 px-4 py-2 rounded-lg bg-neon-cyan/30 border border-neon-cyan/40 text-sm uppercase tracking-[0.3em]"
              disabled={isPending}
            >
              {isPending ? '...' : t('common.confirm', { ns: 'common' })}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
