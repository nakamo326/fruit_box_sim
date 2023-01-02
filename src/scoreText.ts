import { Text } from 'pixi.js';
import { BOARD, BOARD_START_Y, BOARD_STEP } from './constants';

let scoreText: Text | null = null;

export const initScoreText = () => {
  scoreText = new Text('0', {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'right',
  });
  scoreText.x = 200;
  scoreText.y = BOARD_START_Y + BOARD_STEP * BOARD.Y + 40;
  return scoreText;
};

export const updateScoreText = (score: number) => {
  if (!scoreText) {
    return;
  }
  scoreText.text = `${score}`;
};
