import { create } from 'zustand';
import { Asset, EconomyEvent, ExplorationResult, Fleet, MapInfo, MarketplaceListing } from '../types/game';

interface GameState {
  gas: number;
  energy: number;
  turns: number;
  faction: string;
  level: number;
  assets: Asset[];
  fleets: Fleet[];
  maps: MapInfo[];
  listings: MarketplaceListing[];
  events: EconomyEvent[];
  lastExploration?: ExplorationResult;
  setResources: (gas: number, energy: number, turns: number) => void;
  setProfile: (faction: string, level: number) => void;
  setGameData: (payload: Partial<Pick<GameState, 'assets' | 'fleets' | 'maps' | 'listings' | 'events'>>) => void;
  setLastExploration: (result: ExplorationResult | undefined) => void;
}

export const useGameStore = create<GameState>((set) => ({
  gas: 0,
  energy: 100,
  turns: 0,
  faction: 'Sable Syndicate',
  level: 1,
  assets: [],
  fleets: [],
  maps: [],
  listings: [],
  events: [],
  setResources: (gas, energy, turns) => set({ gas, energy, turns }),
  setProfile: (faction, level) => set({ faction, level }),
  setGameData: (payload) => set(payload),
  setLastExploration: (result) => set({ lastExploration: result })
}));
