import { GameCharacter } from './types';

export class Character implements GameCharacter {
  public name: string;
  public hp: number;
  public damage: number;

  constructor(name: string, hp: number, damage: number) {
    this.name = name;
    this.hp = hp;
    this.damage = damage;
  }

  attack(enemy: Character) {
    enemy.hp -= this.damage;
  }

  isAlive() {
    return this.hp > 0;
  }
}
