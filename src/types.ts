export interface GameNode {
  id: string;
  text: string;
  enemy?: EnemyTypes;
  options: GameOptionNode[];
}

export interface GameOptionNode {
  text: string;
  nextNode: GameNode;
}

export interface GameCharacter {
  name: string;
  hp: number;
  damage: number;
  attack(enemy: GameCharacter): void;
  isAlive(): boolean;
}

export type EnemyTypes = 'Thief' | 'Troll' | 'Wizard' | 'Guardian' | 'Dragon';
