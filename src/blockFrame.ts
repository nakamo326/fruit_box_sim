import { Container, Sprite } from 'pixi.js';
import {
  BOARD_STEP,
  Coordinate,
  BOARD_START_X,
  BOARD_START_Y,
  frame,
} from './constants';

let frameContainer = new Container();

export const resetFrame = () => {
  frameContainer.destroy();
};

export const updateBlockFrame = (
  first: Coordinate,
  second: Coordinate
): Container => {
  // TODO: 直前まで表示されていたframeを消す
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
  return frameContainer;
};