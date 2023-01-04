import { Container, Graphics } from 'pixi.js';
import { BOARD, BOARD_START_X, BOARD_START_Y, BOARD_STEP } from '../constants';

export class BackGround {
  elements = new Container();

  constructor() {
    const backGround = new Graphics();
    backGround.beginFill(0x000000);
    backGround.drawRect(
      BOARD_START_X,
      BOARD_START_Y,
      BOARD_STEP * BOARD.X,
      BOARD_STEP * BOARD.Y
    );
    backGround.endFill();
    backGround.interactive = true;
    this.elements.addChild(backGround);
  }

  public get elementRef(): Container {
    return this.elements;
  }
}
