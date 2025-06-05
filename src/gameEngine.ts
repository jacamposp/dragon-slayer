import inquirer from 'inquirer';

import { GameNode } from './types';
import { GameTree } from './treeBuilder';
const data: GameNode = require('./gameData.json');

export class GameEngine {
  public tree: GameTree;
  public currentNode: GameNode;

  constructor(tree: GameTree) {
    this.tree = tree;
    this.currentNode = tree.root;
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

    let { text, id, options } = data;

    console.log('\n' + text + '\n');

    if (data.options.length === 0) return;

    let choices = [
      { name: options[0].text, value: { text: options[0].text, id: options[0].nextNode.id } },
      { name: options[1].text, value: { text: options[1].text, id: options[1].nextNode.id } },
    ];

    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: id,
        message: 'Que decides hacer?',
        choices: choices,
      },
    ]);

    return answer;
  }
}
