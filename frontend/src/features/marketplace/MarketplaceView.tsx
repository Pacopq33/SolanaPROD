import { useTranslation } from 'react-i18next';
import { useGameStore } from '../../stores/useGameStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/api';

export const MarketplaceView = () => {
  const { t } = useTranslation('marketplace');
  const { listings } = useGameStore();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (listingId: string) => {
      await api.post(`/market/buy`, { listingId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summary'] }).catch(console.error);
    }
  });

  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-display tracking-[0.3em] text-neon-cyan uppercase">{t('title')}</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="p-4 border border-white/10 rounded-xl bg-black/40 space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{listing.asset.type}</p>
            <p className="font-display text-lg text-neon-magenta">Tier {listing.asset.tier}</p>
            <p className="text-white/60">Energía: {listing.asset.energy}</p>
            <p className="text-white/60">Precio: {listing.priceGas} GAS</p>
            <button
              onClick={() => mutate(listing.id)}
              className="mt-2 px-4 py-2 rounded-lg bg-neon-magenta/30 border border-neon-magenta/40 text-sm uppercase tracking-[0.3em]"
            >
              {t('listings')}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
