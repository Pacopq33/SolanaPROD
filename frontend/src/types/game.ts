export type AssetType = 'ship' | 'worker';
export type Tier = 1 | 2 | 3 | 4 | 5;

export interface Asset {
  id: string;
  type: AssetType;
  tier: Tier;
  energy: number;
  faction: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface Fleet {
  id: string;
  shipId: string;
  workerIds: string[];
  power: number;
}

export interface MapInfo {
  id: string;
  name: string;
  biome: string;
  difficulty: number;
  rewardMultiplier: number;
  climate: string;
}

export interface ExplorationResult {
  success: boolean;
  rewardGas: number;
  loot?: Asset;
  narrative: string;
}

export interface MarketplaceListing {
  id: string;
  asset: Asset;
  priceGas: number;
  seller: string;
  status: 'active' | 'sold' | 'cancelled';
}

export interface EconomyEvent {
  id: string;
  name: string;
  description: string;
  effect: 'double-reward' | 'storm' | 'prestige-boost';
  expiresAt: string;
}
