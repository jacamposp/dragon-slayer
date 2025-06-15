import { enemyStats } from '../stats/gameStats';
import { EnemyTypes } from '../types';

export function generateEnemy(type: EnemyTypes) {
  const stats = enemyStats[type];

  return {
    type,
    ...stats,
  };
}
