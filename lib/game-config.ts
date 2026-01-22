import { Shield, Zap, Crosshair, Box, Tag } from 'lucide-react';

export const GRID_COLS = 10;
export const GRID_ROWS = 10;
export const SLOT_SIZE = 60;

export type ItemRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type ItemType = 'Weapon' | 'Ammo' | 'Meds' | 'Resource' | 'Gear';

export interface ItemBase {
  id: string;
  name: string;
  shortName: string;
  type: ItemType;
  rarity: ItemRarity;
  icon: string;
  description: string;
  weight: number;
  w: number;
  h: number;
}

export interface InventoryItem extends ItemBase {
  instanceId: string;
  gridX: number;
  gridY: number;
  quantity: number;
}

export interface MarketItem extends ItemBase {
  instanceId: string;
  price: number;
  seller: string;
  sellerRep: number;
  expiresIn: string;
}

export const ITEM_DB: Record<string, ItemBase> = {
  'm4a1': { id: 'm4a1', name: 'Colt M4A1 Assault Rifle', shortName: 'M4A1', type: 'Weapon', rarity: 'Epic', icon: '🔫', description: 'Fully automatic carbine.', weight: 2.8, w: 4, h: 2 },
  'ak47': { id: 'ak47', name: 'Kalashnikov AK-47', shortName: 'AK-47', type: 'Weapon', rarity: 'Rare', icon: '☠️', description: 'Reliable 7.62mm assault rifle.', weight: 3.5, w: 4, h: 2 },
  'ammo': { id: 'ammo', name: '5.56x45mm Ammo Pack', shortName: '5.56', type: 'Ammo', rarity: 'Common', icon: '📐', description: 'Standard ammunition.', weight: 0.5, w: 1, h: 1 },
  'medkit': { id: 'medkit', name: 'AI-2 Medkit', shortName: 'AI-2', type: 'Meds', rarity: 'Common', icon: '💊', description: 'Basic medical kit.', weight: 0.2, w: 1, h: 1 },
  'armor': { id: 'armor', name: 'Slick Plate Carrier', shortName: 'Slick', type: 'Gear', rarity: 'Legendary', icon: '🛡️', description: 'High mobility armor plate.', weight: 6.0, w: 3, h: 3 },
  'backpack': { id: 'backpack', name: 'Tri-Zip Backpack', shortName: 'Tri-Zip', type: 'Gear', rarity: 'Rare', icon: '🎒', description: 'Large capacity backpack.', weight: 1.2, w: 3, h: 4 },
  'keycard': { id: 'keycard', name: 'Lab. Red Keycard', shortName: 'Key', type: 'Resource', rarity: 'Legendary', icon: '💳', description: 'Access to high security area.', weight: 0.01, w: 1, h: 1 },
};

export const getRarityStyle = (r: ItemRarity) => {
  switch (r) {
    case 'Legendary': return 'border-amber-500/50 bg-amber-500/10 shadow-[inset_0_0_15px_rgba(245,158,11,0.2)] text-amber-100';
    case 'Epic': return 'border-purple-500/50 bg-purple-500/10 shadow-[inset_0_0_15px_rgba(168,85,247,0.2)] text-purple-100';
    case 'Rare': return 'border-blue-500/50 bg-blue-500/10 shadow-[inset_0_0_15px_rgba(59,130,246,0.2)] text-blue-100';
    default: return 'border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300';
  }
};

export const getRarityTextColor = (r: ItemRarity) => {
  switch (r) {
    case 'Legendary': return 'text-amber-400';
    case 'Epic': return 'text-purple-400';
    case 'Rare': return 'text-blue-400';
    default: return 'text-zinc-400';
  }
};