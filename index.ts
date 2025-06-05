const data = require('./gameData.json');
import { GameTree } from './src/treeBuilder';
import { GameEngine } from './src/gameEngine';

const gameTree = new GameTree(data);
const gameEngine = new GameEngine(gameTree);

gameEngine.start();
