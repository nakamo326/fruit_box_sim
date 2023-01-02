import {
  Application,
  Container,
  FederatedPointerEvent,
  Graphics,
  ICanvas,
  Sprite,
} from 'pixi.js';
import {
  BOARD,
  BOARD_START_X,
  BOARD_START_Y,
  BOARD_STEP,
  Coordinate,
  nums,
} from './constants';
import { Box } from './Box';
import { BlockFrame } from './BlockFrame';
import { Score } from './Score';
import { Timer } from './Timer';
import { calcBoardCoordinate } from './utils';

export class Game {
  box = new Box();
  blockContainer = new Container();
  blockSprites: Sprite[][];
  blockFrame = new BlockFrame();
  score = new Score();
  timer = new Timer(this.blockFrame.reset);

  lastClicked: Coordinate | null = null;
  lastHovered: Coordinate | null = null;

  constructor(private readonly app: Application<ICanvas>) {
    this.generateBackground();
    this.blockSprites = this.generateSprites(this.box.board);
    app.stage.addChild(this.blockFrame.containerRef);
    app.stage.addChild(this.score.textRef);
    app.stage.addChild(this.timer.textRef);
  }

  generateBackground() {
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
    backGround.on('pointerdown', this.handleClick(this));
    backGround.on('pointerover', this.handleOver(this));
    backGround.on('pointermove', this.handleOver(this));
    this.app.stage.addChild(backGround);
  }

  generateSprites(board: number[][]): Sprite[][] {
    const result = board.map((line, y) => {
      return line.map((num, x) => {
        const sprite = new Sprite(nums[num - 1]);
        sprite.x = x * BOARD_STEP + BOARD_START_X;
        sprite.y = y * BOARD_STEP + BOARD_START_Y;
        this.app.stage.addChild(sprite);
        sprite.interactive = true;
        sprite.on('pointerdown', this.handleClick(this));
        sprite.on('pointerover', this.handleOver(this));
        return sprite;
      });
    });
    return result;
  }

  public handleClick(me: Game) {
    return function (event: FederatedPointerEvent) {
      if (me.timer.isEnd) {
        return;
      }
      const { x, y } = calcBoardCoordinate(event.clientX, event.clientY);
      if (!me.lastClicked) {
        me.lastClicked = { x, y };
        me.blockFrame.update(me.lastClicked, { x, y });
        return;
      }
      const res = me.box.tryEraseRectangles([me.lastClicked, { x, y }]);
      if (res) {
        me.box.board.forEach((line, y) => {
          line.forEach((num, x) => {
            if (num === 0) {
              me.blockSprites[y][x].alpha = 0;
            }
          });
        });
        me.score.update(me.box.score);
      }
      me.lastClicked = null;
      me.blockFrame.reset();
    };
  }

  public handleOver(me: Game) {
    return function (event: FederatedPointerEvent) {
      if (me.timer.isEnd || !me.lastClicked) {
        return;
      }
      const { x, y } = calcBoardCoordinate(event.clientX, event.clientY);
      if (me.lastHovered && x === me.lastHovered.x && y === me.lastHovered.y) {
        return;
      }
      me.lastHovered = { x, y };
      me.blockFrame.update(me.lastClicked, me.lastHovered);
    };
  }

  // ゲーム開始用関数
  // ボタンクリックのハンドラーになりそう
  start() {
    this.timer.setTimer();
  }
}
