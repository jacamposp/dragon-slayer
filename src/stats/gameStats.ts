import { EnemyTypes } from '../types';

export const enemyStats: Record<EnemyTypes, { hp: number; damage: number }> = {
  Thief: { hp: 20, damage: 5 },
  Troll: { hp: 40, damage: 10 },
  Wizard: { hp: 25, damage: 8 },
  Guardian: { hp: 45, damage: 12 },
  Dragon: { hp: 100, damage: 15 },
};
