import inquirer from 'inquirer';

import { GameNode, GameCharacter, EnemyTypes } from './types';
import { GameTree } from './gameTree';
import { swordAnimation } from './utils/swordAnimation';
import { generateEnemy } from './utils/generateEnemy';
import { Character } from './character';

export class GameEngine {
  public tree: GameTree;
  public currentNode: GameNode;
  public character: GameCharacter;

  constructor(tree: GameTree) {
    this.tree = tree;
    this.currentNode = tree.root;
    this.character = new Character('Ragnar', 100, 15);
  }

  async start() {
    this.currentNode = this.tree.root;
    let hasMoreStory = true;
    let storyID = 'root';

    while (hasMoreStory) {
      let story = this.tree.findNodeById(storyID, this.currentNode);
      let choice = await this.printStory(story);

      if (!choice || !choice[storyID]) {
        console.log('\nJuego terminado o sin opción válida. ¡Gracias por jugar!');
        hasMoreStory = false;
        break;
      }

      storyID = choice![storyID].id;
    }
  }

  async printStory(data: GameNode | undefined) {
    if (data === undefined) return;

    let { text, enemy } = data;

    if (enemy) {
      await this.fight(enemy);
    }

    console.log('\n' + text + '\n');

    const choice = this.makeChoice(data);

    return choice;
  }

  async makeChoice(data: GameNode) {
    let { id, options } = data; // confirmar que ocupo aqui

    if (data.options.length === 0) return;

    const choices = options.map((opt) => ({
      name: opt.text,
      value: { text: opt.text, id: opt.nextNode.id },
    }));

    const choice = await inquirer.prompt([
      {
        type: 'list',
        name: id,
        message: 'Que decides hacer?',
        choices: choices,
      },
    ]);

    return choice;
  }

  async fight(opponent: EnemyTypes) {
    const character = this.character;

    const getEnemyStats = generateEnemy(opponent);
    const { type, hp, damage } = getEnemyStats;
    const enemy = new Character(type, hp, damage);

    console.log(`⚔️ ¡Comienza la batalla entre ${character.name} y ${enemy.name}! ⚔️\n`);
    await swordAnimation();

    let round = 1;

    while (character.isAlive() && enemy.isAlive()) {
      console.log(`--- RONDA ${round} ---`);

      character.attack(enemy);
      console.log(
        `${character.name} ataca a ${enemy.name} y le quita ${
          character.damage
        } puntos. Vida restante del enemigo: ${Math.max(enemy.hp, 0)}`
      );

      if (!enemy.isAlive()) {
        console.log(`\n🏆 ${character.name} ha derrotado a ${enemy.name} 🩸 \n`);
        break;
      }

      enemy.attack(character);
      console.log(
        `${enemy.name} contraataca y le quita ${enemy.damage} puntos a ${
          character.name
        }. Vida restante del caballero: ${Math.max(character.hp, 0)}\n`
      );

      if (!character.isAlive()) {
        console.log(`\n💀 ${enemy.name} ha derrotado a ${character.name} \n`);
        break;
      }

      round++;
    }
  }
}
