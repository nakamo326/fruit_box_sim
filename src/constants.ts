import { Assets } from 'pixi.js';

export const WIDTH = 800;
export const HEIGHT = 600;

export const BOARD_STEP = 38;
// TODO: 画面の座標系xy逆になってるので修正すること
export const BOARD_START_X = 77;
export const BOARD_START_Y = 60;

export type GameState = 'title' | 'game' | 'result';

// load texture
export const nums = await Promise.all(
  Array(9)
    .fill(0)
    .map(async (_, i) => {
      return await Assets.load(`assets/0${i + 1}.png`);
    })
);
