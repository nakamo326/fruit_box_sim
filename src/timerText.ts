import { resetBlockFrame } from './blockFrame';
import { Text } from 'pixi.js';
import { BOARD, BOARD_START_Y, BOARD_STEP } from './constants';

let timerText: Text | null = null;
// TODO: gameStateを変更する方が良さそう
export let isEnd = false;

export const initTimerText = () => {
  timerText = new Text(`120`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'right',
  });
  timerText.x = 640;
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
      isEnd = true;
      resetBlockFrame();
      return;
    }
    if (timerText) {
      timerText.text = `${Math.floor(rest / 1000)}`;
    }
  }, 100);
};
