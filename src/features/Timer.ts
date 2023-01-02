import { Text } from 'pixi.js';
import { BOARD, BOARD_START_Y, BOARD_STEP } from '../constants';

export class Timer {
  private timerText = new Text(`120`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'right',
  });

  // TODO: gameStateを変更する方が良さそう
  isEnd = false;

  constructor(private readonly resetBlockFrame: () => void) {
    this.timerText.x = 640;
    this.timerText.y = BOARD_START_Y + BOARD_STEP * BOARD.Y + 40;
  }

  setTimer() {
    const endTime = Date.now() + 120 * 1000;

    const timer = setInterval(() => {
      const now = Date.now();
      const rest = endTime - now;
      if (rest <= 0) {
        clearInterval(timer);
        this.isEnd = true;
        this.resetBlockFrame();
        return;
      }
      this.timerText.text = `${Math.floor(rest / 1000)}`;
    }, 100);
  }

  public get textRef(): Text {
    return this.timerText;
  }
}
