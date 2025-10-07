import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { useGameStore } from '../stores/useGameStore';

interface SummaryResponse {
  gas: number;
  energy: number;
  turns: number;
  faction: string;
  level: number;
  assets: any[];
  fleets: any[];
  maps: any[];
  listings: any[];
  events: any[];
}

export const useGameData = () => {
  const setResources = useGameStore((state) => state.setResources);
  const setProfile = useGameStore((state) => state.setProfile);
  const setGameData = useGameStore((state) => state.setGameData);

  const query = useQuery<SummaryResponse>({
    queryKey: ['summary'],
    queryFn: async () => {
      const { data } = await api.get<SummaryResponse>('/user/summary');
      return data;
    }
  });

  useEffect(() => {
    if (query.data) {
      setResources(query.data.gas, query.data.energy, query.data.turns);
      setProfile(query.data.faction, query.data.level);
      setGameData({
        assets: query.data.assets,
        fleets: query.data.fleets,
        maps: query.data.maps,
        listings: query.data.listings,
        events: query.data.events
      });
    }
  }, [query.data, setGameData, setProfile, setResources]);

  return query;
};
