import { Application, FederatedPointerEvent, ICanvas, Sprite } from 'pixi.js';
import {
  nums,
  GameState,
  BOARD_STEP,
  BOARD_START_X,
  BOARD_START_Y,
} from './constants';
import { Box, Coordinate } from './Box';

const box = new Box();
let lastClicked: Coordinate | null = null;

// 1回目、lastClickedに配列座標追加、長方形描画
// 2回目、lastClickedと新しい座標を加えてBoxにtry。
const handleClick = (event: FederatedPointerEvent) => {
  console.log(event.clientX, event.clientY);
  const x = Math.floor((event.clientX - BOARD_START_X) / BOARD_STEP);
  const y = Math.floor((event.clientY - BOARD_START_Y) / BOARD_STEP);
  console.log(`(${x}, ${y})`);
  if (!lastClicked) {
    lastClicked = { x, y };
    // set anchor to render draging rectangle
    return;
  }
};

const generateSprites = (
  board: number[][],
  app: Application<ICanvas>
): Sprite[][] => {
  const result = board.map((line, y) => {
    return line.map((num, x) => {
      const sprite = new Sprite(nums[num - 1]);
      sprite.x = x * BOARD_STEP + BOARD_START_X;
      sprite.y = y * BOARD_STEP + BOARD_START_Y;
      app.stage.addChild(sprite);
      sprite.interactive = true;
      sprite.on('pointerdown', handleClick);
      return sprite;
    });
  });
  return result;
};

const main = () => {
  // init pixi app
  const app = new Application();
  document.body.appendChild(app.view);

  // 初期配置に対応するSpriteの配列を作成
  const Sprite = generateSprites(box.board, app);

  // ゲームの流れ
  // トップページ (+ config)
  // ゲーム
  // リザルト

  // game loop
  let state: GameState = 'title';
  app.ticker.add((delta) => {
    // updateBoard();
  });
};

main();
