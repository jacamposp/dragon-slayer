import { GameNode } from './types';

export class GameTree {
  public root: GameNode;
  constructor(root: GameNode) {
    this.root = root;
  }

  findNodeById(id: string = 'root', node: GameNode): GameNode | undefined {
    if (node.id === id) return node;

    for (let option of node.options) {
      let foundNode = this.findNodeById(id, option.nextNode);
      if (foundNode) return foundNode;
    }
  }
}
