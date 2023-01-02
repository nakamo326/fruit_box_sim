import { Container, Sprite } from 'pixi.js';
import {
  BOARD_STEP,
  Coordinate,
  BOARD_START_X,
  BOARD_START_Y,
  frame,
} from './constants';

// フレームを作成し、非表示にする関数
const initBlockFrame = (): Container => {
  const frameContainer = new Container();
  frameContainer.visible = false;
  for (let i = 0; i < 8; i++) {
    const sprite = new Sprite(frame);
    frameContainer.addChild(sprite);
  }
  return frameContainer;
};

export const frameContainer = initBlockFrame();

// フレームを非表示にする関数
export const resetBlockFrame = () => {
  frameContainer.visible = false;
};

// フレームの位置を変更する関数に変える
export const updateBlockFrame = (first: Coordinate, second: Coordinate) => {
  // lastClickedと今の座標を囲むように線を出す
  const minX = first.x < second.x ? first.x : second.x;
  const maxX = first.x > second.x ? first.x : second.x;
  const minY = first.y < second.y ? first.y : second.y;
  const maxY = first.y > second.y ? first.y : second.y;

  const corner = frameContainer.children;
  console.log(corner);
  // left top frame
  {
    corner[0].x = minX * BOARD_STEP + BOARD_START_X - 4;
    corner[0].y = minY * BOARD_STEP + BOARD_START_Y - 4;
    corner[1].angle = 270;
    corner[1].scale.set(-1, 1);
    corner[1].x = minX * BOARD_STEP + BOARD_START_X - 4;
    corner[1].y = minY * BOARD_STEP + BOARD_START_Y - 4;
  }
  // left bottom frame
  {
    corner[2].scale.set(1, -1);
    corner[2].x = minX * BOARD_STEP + BOARD_START_X - 4;
    corner[2].y = (maxY + 1) * BOARD_STEP + BOARD_START_Y - 4;
    corner[3].angle = 270;
    corner[3].x = minX * BOARD_STEP + BOARD_START_X - 4;
    corner[3].y = (maxY + 1) * BOARD_STEP + BOARD_START_Y - 4;
  }
  // right top frame
  {
    corner[4].scale.set(-1, 1);
    corner[4].x = (maxX + 1) * BOARD_STEP + BOARD_START_X - 4;
    corner[4].y = minY * BOARD_STEP + BOARD_START_Y - 4;
    corner[5].angle = 90;
    corner[5].x = (maxX + 1) * BOARD_STEP + BOARD_START_X - 4;
    corner[5].y = minY * BOARD_STEP + BOARD_START_Y - 4;
  }
  // right bottom frame
  {
    corner[6].scale.set(-1, -1);
    corner[6].x = (maxX + 1) * BOARD_STEP + BOARD_START_X - 4;
    corner[6].y = (maxY + 1) * BOARD_STEP + BOARD_START_Y - 4;
    corner[7].angle = 90;
    corner[7].scale.set(-1, 1);
    corner[7].x = (maxX + 1) * BOARD_STEP + BOARD_START_X - 4;
    corner[7].y = (maxY + 1) * BOARD_STEP + BOARD_START_Y - 4;
  }
  frameContainer.visible = true;
};
