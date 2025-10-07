import { Link, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HUD } from '../features/hud/HUD';
import { ExplorationView } from '../features/exploration/ExplorationView';
import { MarketplaceView } from '../features/marketplace/MarketplaceView';
import { MintView } from '../features/mint/MintView';
import { InventoryView } from '../features/hud/InventoryView';
import { ProfileView } from '../features/hud/ProfileView';

const menuItems = [
  { path: 'hangar', labelKey: 'Hangar' },
  { path: 'barracks', labelKey: 'Barracones' },
  { path: 'exploration', labelKey: 'Exploración' },
  { path: 'gas', labelKey: 'Estación de Gas' },
  { path: 'marketplace', labelKey: 'nav.market' },
  { path: 'mint', labelKey: 'nav.mint' },
  { path: 'inventory', labelKey: 'Inventario' },
  { path: 'profile', labelKey: 'Perfil' }
];

export const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="grid lg:grid-cols-[280px_1fr] min-h-screen">
      <aside className="border-r border-white/10 bg-black/30 p-6 space-y-6">
        <Link to="/" className="block font-display text-xl tracking-[0.4em] text-neon-magenta">
          NEON
          <span className="text-neon-cyan"> DRIFTERS</span>
        </Link>
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-2 rounded-md bg-white/5 hover:bg-neon-cyan/20 transition text-sm uppercase tracking-[0.25em]"
            >
              {item.labelKey.includes('.') ? t(item.labelKey) : item.labelKey}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="p-8 space-y-8">
        <HUD />
        <Routes>
          <Route path="exploration" element={<ExplorationView />} />
          <Route path="marketplace" element={<MarketplaceView />} />
          <Route path="mint" element={<MintView />} />
          <Route path="inventory" element={<InventoryView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route index element={<ExplorationView />} />
        </Routes>
      </main>
    </div>
  );
};
