import { Container, Sprite } from 'pixi.js';
import {
  BOARD_STEP,
  Coordinate,
  BOARD_START_X,
  BOARD_START_Y,
  frame,
} from './constants';

let frameContainer = new Container();

export const resetBlockFrame = () => {
  frameContainer.destroy();
};

export const updateBlockFrame = (
  first: Coordinate,
  second: Coordinate
): Container => {
  if (!frameContainer.destroyed) {
    frameContainer.destroy();
  }
  frameContainer = new Container();

  // TODO: lastClickedと今の座標を囲むように線を出す
  const minX = first.x < second.x ? first.x : second.x;
  const maxX = first.x > second.x ? first.x : second.x;
  const minY = first.y < second.y ? first.y : second.y;
  const maxY = first.y > second.y ? first.y : second.y;

  // left top frame
  {
    const leftSprite = new Sprite(frame);
    leftSprite.x = minX * BOARD_STEP + BOARD_START_X - 4;
    leftSprite.y = minY * BOARD_STEP + BOARD_START_Y - 4;
    frameContainer.addChild(leftSprite);
    const topSprite = new Sprite(frame);
    topSprite.angle = 270;
    topSprite.scale.set(-1, 1);
    topSprite.x = minX * BOARD_STEP + BOARD_START_X - 4;
    topSprite.y = minY * BOARD_STEP + BOARD_START_Y - 4;
    frameContainer.addChild(topSprite);
  }
  // left bottom frame
  {
    const leftSprite = new Sprite(frame);
    leftSprite.scale.set(1, -1);
    leftSprite.x = minX * BOARD_STEP + BOARD_START_X - 4;
    leftSprite.y = (maxY + 1) * BOARD_STEP + BOARD_START_Y - 4;
    frameContainer.addChild(leftSprite);
    const bottomSprite = new Sprite(frame);
    bottomSprite.angle = 270;
    bottomSprite.x = minX * BOARD_STEP + BOARD_START_X - 4;
    bottomSprite.y = (maxY + 1) * BOARD_STEP + BOARD_START_Y - 4;
    frameContainer.addChild(bottomSprite);
  }
  // right top frame
  {
    const rightSprite = new Sprite(frame);
    rightSprite.scale.set(-1, 1);
    rightSprite.x = (maxX + 1) * BOARD_STEP + BOARD_START_X - 4;
    rightSprite.y = minY * BOARD_STEP + BOARD_START_Y - 4;
    frameContainer.addChild(rightSprite);
    const topSprite = new Sprite(frame);
    topSprite.angle = 90;
    topSprite.x = (maxX + 1) * BOARD_STEP + BOARD_START_X - 4;
    topSprite.y = minY * BOARD_STEP + BOARD_START_Y - 4;
    frameContainer.addChild(topSprite);
  }
  // right bottom frame
  {
    const rightSprite = new Sprite(frame);
    rightSprite.scale.set(-1, -1);
    rightSprite.x = (maxX + 1) * BOARD_STEP + BOARD_START_X - 4;
    rightSprite.y = (maxY + 1) * BOARD_STEP + BOARD_START_Y - 4;
    frameContainer.addChild(rightSprite);
    const bottomSprite = new Sprite(frame);
    bottomSprite.angle = 90;
    bottomSprite.scale.set(-1, 1);
    bottomSprite.x = (maxX + 1) * BOARD_STEP + BOARD_START_X - 4;
    bottomSprite.y = (maxY + 1) * BOARD_STEP + BOARD_START_Y - 4;
    frameContainer.addChild(bottomSprite);
  }
  return frameContainer;
};
