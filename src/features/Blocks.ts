import { Container, Sprite } from 'pixi.js';
import { BOARD_START_X, BOARD_START_Y, BOARD_STEP, nums } from '../constants';

export class Blocks {
  private elements = new Container();
  blocks: Sprite[][];

  constructor(board: number[][]) {
    this.blocks = board.map((line, y) => {
      return line.map((num, x) => {
        const sprite = new Sprite(nums[num - 1]);
        sprite.x = x * BOARD_STEP + BOARD_START_X;
        sprite.y = y * BOARD_STEP + BOARD_START_Y;
        this.elements.addChild(sprite);
        sprite.interactive = true;
        return sprite;
      });
    });
  }

  public get elementRef(): Container {
    return this.elements;
  }
}
