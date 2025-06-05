export interface GameNode {
  id: string;
  text: string;
  options: GameOptionNode[];
}

export interface GameOptionNode {
  text: string;
  nextNode: GameNode;
}
