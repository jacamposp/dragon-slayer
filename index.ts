const data = require('./src/data/gameData.json');
import { GameTree } from './src/gameTree';
import { GameEngine } from './src/gameEngine';
import { GameCharacter } from './src/types';
import { Character } from './src/character';
import { generateEnemy } from './src/utils/generateEnemy';

const gameTree = new GameTree(data);
const gameEngine = new GameEngine(gameTree);

gameEngine.start();
// gameEngine.fight('Wizard');

// const ragnar = new Character('Ragnar', 100, 15);
// const thief = new Character('Thief', 25, 5);

// ragnar.attack(thief);
// thief.attack(ragnar);

// console.log(ragnar);
// console.log(thief);
