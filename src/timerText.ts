import { Text } from 'pixi.js';
import { BOARD, BOARD_START_Y, BOARD_STEP } from './constants';

let timerText: Text | null = null;

export const initTimerText = () => {
  timerText = new Text(`120`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'right',
  });
  timerText.x = 700;
  timerText.y = BOARD_START_Y + BOARD_STEP * BOARD.Y + 40;
  return timerText;
};

export const setTimer = () => {
  const endTime = Date.now() + 120 * 1000;

  const timer = setInterval(() => {
    const now = Date.now();
    const rest = endTime - now;
    if (rest <= 0) {
      clearInterval(timer);
      return;
    }
    if (timerText) {
      timerText.text = `${Math.floor(rest / 1000)}`;
    }
  }, 100);
};
