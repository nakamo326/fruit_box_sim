import { Application, FederatedPointerEvent, ICanvas } from 'pixi.js';
import { BOARD, BOARD_START_Y, BOARD_STEP, Coordinate } from '../constants';
import { calcBoardCoordinate } from '../utils';
import { Box } from './Box';
import { BackGround } from './BackGround';
import { Blocks } from './Blocks';
import { BlockFrame } from './BlockFrame';
import { ResetButton } from './ResetButton';
import { Score } from './Score';
import { Timer } from './Timer';
import { VolumeButton } from './VolumeButton';
import { AudioManager } from './AudioManager';

export class Game {
  lastClicked: Coordinate | null = null;
  lastHovered: Coordinate | null = null;
  lastHistory: Coordinate[] | null = null;
  private isEndChecker: number | null = null;

  box = new Box();
  blocks = new Blocks(this.box.board);
  backGround = new BackGround();
  blockFrame = new BlockFrame(0xff0000);
  score = new Score();
  timer = new Timer(this.blockFrame.getResetter());
  resetButton = new ResetButton();
  volume = new VolumeButton(560, BOARD_START_Y + BOARD_STEP * BOARD.Y + 80);
  success = new AudioManager('./success.mp3');
  fail = new AudioManager('./fail.mp3');

  constructor(app: Application<ICanvas>) {
    this.backGround.elementRef.on('pointerdown', this.handleClick, this);
    this.backGround.elementRef.on('pointerover', this.handleOver, this);
    this.backGround.elementRef.on('pointermove', this.handleOver, this);
    this.resetButton.elementRef.on('pointerdown', this.handleResetGame, this);

    this.blocks.elementRef.children.forEach((sprite) => {
      sprite.on('pointerdown', this.handleClick, this);
      sprite.on('pointerover', this.handleOver, this);
    });

    app.stage.addChild(this.backGround.elementRef);
    app.stage.addChild(this.blocks.elementRef);
    app.stage.addChild(this.blockFrame.containerRef);
    app.stage.addChild(this.score.textRef);
    app.stage.addChild(this.timer.textRef);
    app.stage.addChild(this.resetButton.elementRef);
    app.stage.addChild(this.volume.elementRef);
  }

  start() {
    this.timer.start();

    // リザルトの描画をフックする
    this.isEndChecker = window.setInterval(this.drawResult.bind(this), 100);
  }

  drawResult() {
    if (!this.timer.isEnd) {
      return;
    }
    if (this.isEndChecker) {
      clearInterval(this.isEndChecker);
    }
    this.lastClicked = null;
    this.lastHovered = null;
    this.box.isDropped.forEach((line, y) => {
      line.forEach((isDropped, x) => {
        if (isDropped) {
          this.blocks.spriteArr[y][x].alpha = 0.3;
          // 既存のeventを削除
          this.blocks.spriteArr[y][x].removeAllListeners();
          // TODO: history表示のevent hook
          this.blocks.spriteArr[y][x].on(
            'pointerover',
            this.handleDrawHistory,
            this
          );
        }
      });
    });
  }

  handleClick(event: FederatedPointerEvent) {
    if (this.timer.isEnd) {
      return;
    }
    const { x, y } = calcBoardCoordinate(event.screenX, event.screenY);
    if (!this.lastClicked) {
      this.lastClicked = { x, y };
      this.blockFrame.update(this.lastClicked, { x, y });
      return;
    }
    const res = this.box.tryEraseRectangles([this.lastClicked, { x, y }]);
    if (res) {
      this.success.play(this.volume.getVolume);
      this.box.isDropped.forEach((line, y) => {
        line.forEach((isDropped, x) => {
          if (isDropped) {
            this.blocks.spriteArr[y][x].alpha = 0;
          }
        });
      });
      this.score.update(this.box.score);
    } else if (this.lastClicked.x !== x || this.lastClicked.y !== y) {
      this.fail.play(this.volume.getVolume);
    }
    this.lastClicked = null;
    this.blockFrame.reset();
  }

  handleOver(event: FederatedPointerEvent) {
    if (this.timer.isEnd || !this.lastClicked) {
      return;
    }
    const { x, y } = calcBoardCoordinate(event.screenX, event.screenY);
    if (
      this.lastHovered &&
      x === this.lastHovered.x &&
      y === this.lastHovered.y
    ) {
      return;
    }
    this.lastHovered = { x, y };
    this.blockFrame.update(this.lastClicked, this.lastHovered);
  }

  handleResetGame() {
    this.blockFrame.reset();
    this.box = new Box();
    this.blocks.regenerate(this.box.board);
    this.blocks.elementRef.children.forEach((sprite) => {
      sprite.on('pointerdown', this.handleClick, this);
      sprite.on('pointerover', this.handleOver, this);
    });

    this.score.reset();
    this.timer.reset();

    this.start();
  }

  handleDrawHistory(event: FederatedPointerEvent) {
    const { x, y } = calcBoardCoordinate(event.screenX, event.screenY);
    // 最後にホバーしたhistoryの描画を取り消す
    if (this.lastHistory) {
      this.lastHistory.forEach(({ x, y }) => {
        this.blocks.spriteArr[y][x].alpha = 0.3;
      });
    }
    // histroyから{x,y}を含む要素を探す
    const [hist] = this.box.history.filter((hist) => {
      let hasHovered = false;
      hist.forEach((coor) => {
        if (coor.x === x && coor.y === y) {
          hasHovered = true;
        }
      });
      return hasHovered;
    });
    // histに含まれる座標のブロックを明るくする
    hist.forEach(({ x, y }) => {
      this.blocks.spriteArr[y][x].alpha = 1;
    });
    this.blockFrame.update(hist[0], hist[hist.length - 1]);

    this.lastHistory = hist;
  }
}
