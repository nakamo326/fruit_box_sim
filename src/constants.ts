import { Assets } from 'pixi.js';

export const WIDTH = 800;
export const HEIGHT = 600;

export type GameState = 'title' | 'game' | 'result';

// load texture
export const nums = await Promise.all(
  Array(9)
    .fill(0)
    .map(async (_, i) => {
      return await Assets.load(`assets/0${i + 1}.png`);
    })
);
