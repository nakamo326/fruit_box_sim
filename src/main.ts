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
import { Box } from './Box';
import { calcBoardCoordinate } from './utils';
import {
  updateBlockFrame,
  resetBlockFrame,
  initBlockFrame,
} from './blockFrame';
import { updateScoreText, initScoreText } from './scoreText';
import { Timer } from './Timer';

let lastClicked: Coordinate | null = null;
let lastHovered: Coordinate | null = null;

/*
  [x] 選択したブロックと、hoverしているブロックを囲むように枠を表示する
  [x] ブロックがないところの判定を追加する
  TODO: 消えたブロックを非表示にする
  [x] タイマーを設定する
  [x] 現在のスコアを表示する
  リザルト画面を出す
  タイトル画面を出す
*/

// TODO: ファイルごとのグローバル変数をクラスに隠蔽する

const handleClick = (event: FederatedPointerEvent) => {
  if (timer.isEnd) {
    return;
  }
  const { x, y } = calcBoardCoordinate(event.clientX, event.clientY);
  console.log(`(${x}, ${y})`);
  if (!lastClicked) {
    lastClicked = { x, y };
    updateBlockFrame(lastClicked, { x, y });
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
    updateScoreText(box.score);
  }
  lastClicked = null;
  resetBlockFrame();
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
  updateBlockFrame(lastClicked, { x, y });
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
app.stage.addChild(initBlockFrame());
app.stage.addChild(initScoreText());

const timer = new Timer();
app.stage.addChild(timer.textRef);

// TODO: なんらかのクリックイベントで発火させる
timer.setTimer();
