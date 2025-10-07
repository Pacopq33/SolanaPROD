import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NeonPanel } from '../components/NeonPanel';

export const Landing = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es').catch(console.error);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-16">
      <motion.h1
        className="font-display text-5xl md:text-7xl tracking-[0.35em] text-neon-cyan"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {t('landing.title')}
      </motion.h1>
      <motion.p
        className="mt-6 max-w-2xl text-lg text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {t('landing.subtitle')}
      </motion.p>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <NeonPanel onClick={() => navigate('/game')}>
          {t('landing.cta')}
        </NeonPanel>
        <NeonPanel variant="outline">{t('nav.whitepaper')}</NeonPanel>
        <NeonPanel variant="outline">{t('nav.market')}</NeonPanel>
        <NeonPanel variant="outline">{t('nav.mint')}</NeonPanel>
      </div>
      <button
        onClick={toggleLang}
        className="mt-16 text-xs uppercase tracking-[0.4em] text-white/60 hover:text-neon-magenta transition"
      >
        {i18n.language === 'es' ? 'ENGLISH' : 'ESPAÑOL'}
      </button>
    </div>
  );
};
