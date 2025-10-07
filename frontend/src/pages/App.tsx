import { Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Landing } from './Landing';
import { Dashboard } from './Dashboard';
import { useGameData } from '../hooks/useGameData';
import { NeonBackground } from '../components/NeonBackground';

const LoadingScreen = () => {
  const { t } = useTranslation('common');
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2 text-neon-cyan">
      <div className="w-12 h-12 border-4 border-neon-cyan/40 border-t-neon-magenta rounded-full animate-spin" />
      <p className="font-display tracking-[0.25em] uppercase">{t('loading')}</p>
    </div>
  );
};

const App = () => {
  const { isLoading } = useGameData();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NeonBackground>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game/*" element={<Dashboard />} />
      </Routes>
    </NeonBackground>
  );
};

export default App;
