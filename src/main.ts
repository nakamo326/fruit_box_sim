import { Application, FederatedPointerEvent, ICanvas, Sprite } from 'pixi.js';
import {
  Coordinate,
  nums,
  GameState,
  BOARD,
  BOARD_STEP,
  BOARD_START_X,
  BOARD_START_Y,
} from './constants';
import { Box } from './Box';

const calcBoardCoordinate = (clientX: number, clientY: number) => {
  const inputX = Math.floor((clientX - BOARD_START_X) / BOARD_STEP);
  const inputY = Math.floor((clientY - BOARD_START_Y) / BOARD_STEP);
  let x = inputX;
  if (inputX >= BOARD.X) {
    x = BOARD.X - 1;
  } else if (inputX < 0) {
    x = 0;
  }
  let y = inputY;
  if (inputY >= BOARD.Y) {
    y = BOARD.Y - 1;
  } else if (inputY < 0) {
    y = 0;
  }
  return { x, y };
};

const handleClick = (event: FederatedPointerEvent) => {
  console.log(event.clientX, event.clientY);
  const { x, y } = calcBoardCoordinate(event.clientX, event.clientY);
  console.log(`(${x}, ${y})`);
  if (!lastClicked) {
    lastClicked = { x, y };
    // set anchor to render dragging rectangle
    return;
  }
  const res = box.tryEraseRectangles([lastClicked, { x, y }]);
  console.log(res);
  if (res) {
    box.board.forEach((line, y) => {
      line.forEach((num, x) => {
        if (num === 0 && !Sprites[y][x].destroyed) {
          Sprites[y][x].destroy();
        }
      });
    });
  }
  // reset dragging rectangle.
  lastClicked = null;
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

// init pixi app
const app = new Application();
document.body.appendChild(app.view);

// 初期配置に対応するSpriteの配列を作成
const box = new Box();
const Sprites = generateSprites(box.board, app);
let lastClicked: Coordinate | null = null;

const main = () => {
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

// main();
