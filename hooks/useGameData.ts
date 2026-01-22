"use client";
import { useState, useEffect } from 'react';

export const ITEM_DB: any = {
  WATER:  { name: "Purified Water", size: [1, 2], img: "https://cdn-icons-png.flaticon.com/512/3105/3105807.png", price: 1200, sol: 0.01, type: 'consumable', stats: { water: 30 } },
  LUNCH:  { name: "Military Ration", size: [2, 2], img: "https://cdn-icons-png.flaticon.com/512/3014/3014535.png", price: 4500, sol: 0.05, type: 'consumable', stats: { energy: 40, water: -10 } },
  VEST:   { name: "Scav Vest", size: [2, 2], img: "https://cdn-icons-png.flaticon.com/512/3012/3012423.png", price: 8000, sol: 0.08, type: 'armor', stats: { armor: 10 } },
  CPU:    { name: "CPU Unit", size: [1, 1], img: "https://cdn-icons-png.flaticon.com/512/908/908424.png", price: 25000, sol: 0.25, type: 'loot', stats: {} },
};

export function useGameData() {
  const [rubles, setRubles] = useState(50000);
  const [sol, setSol] = useState(2.5);
  const [stash, setStash] = useState<any[]>([]);
  const [p2pListings, setP2pListings] = useState<any[]>([]);
  const [stats, setStats] = useState({ hp: 100, water: 80, energy: 70 });
  const [equipment, setEquipment] = useState<{ [key: string]: any | null }>({ head: null, body: null });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = (k: string) => localStorage.getItem(k);
    if (load('v7_stash')) setStash(JSON.parse(load('v7_stash')!));
    if (load('v7_rub')) setRubles(parseInt(load('v7_rub')!));
    if (load('v7_sol')) setSol(parseFloat(load('v7_sol')!));
    if (load('v7_stats')) setStats(JSON.parse(load('v7_stats')!));
    if (load('v7_equip')) setEquipment(JSON.parse(load('v7_equip')!));
    if (load('v7_p2p')) setP2pListings(JSON.parse(load('v7_p2p')!));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('v7_stash', JSON.stringify(stash));
      localStorage.setItem('v7_rub', rubles.toString());
      localStorage.setItem('v7_sol', sol.toString());
      localStorage.setItem('v7_stats', JSON.stringify(stats));
      localStorage.setItem('v7_equip', JSON.stringify(equipment));
      localStorage.setItem('v7_p2p', JSON.stringify(p2pListings));
    }
  }, [stash, rubles, sol, stats, equipment, p2pListings, isLoaded]);

  return { rubles, setRubles, sol, setSol, stash, setStash, stats, setStats, equipment, setEquipment, p2pListings, setP2pListings, isLoaded };
}