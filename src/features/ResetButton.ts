import { BOARD } from './../constants';
import { Container, Graphics, Text } from 'pixi.js';
import { BOARD_START_Y, BOARD_STEP } from '../constants';

export class ResetButton {
  elements = new Container();

  constructor() {
    const button = new Graphics();
    button.lineStyle(2, 0xffffff, 1);
    button.beginFill(0x000000);
    button.drawRect(100, BOARD_START_Y + BOARD_STEP * BOARD.Y + 80, 60, 30);
    button.endFill();
    this.elements.addChild(button);
    const text = new Text('reset', {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff,
      align: 'center',
    });
    text.x = 108;
    text.y = BOARD_START_Y + BOARD_STEP * BOARD.Y + 82;
    this.elements.addChild(text);
    this.elements.interactive = true;
  }

  public get elementRef(): Container {
    return this.elements;
  }
}
