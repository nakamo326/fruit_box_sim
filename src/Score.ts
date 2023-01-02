import { Text } from 'pixi.js';
import { BOARD, BOARD_START_Y, BOARD_STEP } from './constants';

export class Score {
  private scoreText = new Text('0', {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'right',
  });

  constructor() {
    this.scoreText.x = 200;
    this.scoreText.y = BOARD_START_Y + BOARD_STEP * BOARD.Y + 40;
  }

  update(newScore: number) {
    this.scoreText.text = `${newScore}`;
  }

  public get textRef(): Text {
    return this.scoreText;
  }
}
