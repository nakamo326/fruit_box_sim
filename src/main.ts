import {
  Application,
  FederatedPointerEvent,
  Graphics,
  ICanvas,
  Sprite,
} from 'pixi.js';
import {
  Coordinate,
  nums,
  GameState,
  BOARD,
  BOARD_STEP,
  BOARD_START_X,
  BOARD_START_Y,
} from './constants';
import { calcBoardCoordinate } from './utils';
import { Box } from './features/Box';
import { BlockFrame } from './features/BlockFrame';
import { Score } from './features/Score';
import { Timer } from './features/Timer';

let lastClicked: Coordinate | null = null;
let lastHovered: Coordinate | null = null;

/*
  [x] 選択したブロックと、hoverしているブロックを囲むように枠を表示する
  [x] ブロックがないところの判定を追加する
  [x] タイマーを設定する
  [x] 現在のスコアを表示する
  リザルト画面を出す
  タイトル画面を出す
*/

const handleClick = (event: FederatedPointerEvent) => {
  if (timer.isEnd) {
    return;
  }
  const { x, y } = calcBoardCoordinate(event.clientX, event.clientY);
  console.log(`(${x}, ${y})`);
  if (!lastClicked) {
    lastClicked = { x, y };
    blockFrame.update(lastClicked, { x, y });
    return;
  }
  const res = box.tryEraseRectangles([lastClicked, { x, y }]);
  console.log(res);
  if (res) {
    box.board.forEach((line, y) => {
      line.forEach((num, x) => {
        if (num === 0) {
          Sprites[y][x].alpha = 0;
        }
      });
    });
    score.update(box.score);
  }
  lastClicked = null;
  blockFrame.reset();
};

const handleOver = (event: FederatedPointerEvent) => {
  if (timer.isEnd || !lastClicked) {
    return;
  }
  const { x, y } = calcBoardCoordinate(event.clientX, event.clientY);
  console.log(`(${x}, ${y})`);
  if (lastHovered && x === lastHovered.x && y === lastHovered.y) {
    return;
  }
  lastHovered = { x, y };
  blockFrame.update(lastClicked, { x, y });
};

const generateBackground = (app: Application<ICanvas>) => {
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
  backGround.on('pointerdown', handleClick);
  backGround.on('pointerover', handleOver);
  backGround.on('pointermove', handleOver);
  app.stage.addChild(backGround);
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
      sprite.on('pointerover', handleOver);
      return sprite;
    });
  });
  return result;
};

// init pixi app
const app = new Application();
document.body.appendChild(app.view);

const box = new Box();
generateBackground(app);
const Sprites = generateSprites(box.board, app);

const blockFrame = new BlockFrame();
app.stage.addChild(blockFrame.containerRef);

const score = new Score();
app.stage.addChild(score.textRef);

const timer = new Timer(blockFrame.reset);
app.stage.addChild(timer.textRef);

// TODO: なんらかのクリックイベントで発火させる
timer.setTimer();
