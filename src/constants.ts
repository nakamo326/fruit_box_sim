import { Assets } from 'pixi.js';

export const BOARD = {
  X: 17,
  Y: 10,
};

export type Coordinate = {
  x: number;
  y: number;
};

export const WIDTH = 800;
export const HEIGHT = 600;

export const BOARD_STEP = 40;
export const BOARD_START_X = 64;
export const BOARD_START_Y = 64;

export type GameState = 'title' | 'game' | 'result';

// load texture
export const nums = await Promise.all(
  Array(9)
    .fill(0)
    .map(async (_, i) => {
      return await Assets.load(`0${i + 1}.png`);
    })
);

export const frame = await Assets.load('frame.png');

export const volumeUp = await Assets.load('volumeUp.png');
export const volumeDown = await Assets.load('volumeDown.png');
