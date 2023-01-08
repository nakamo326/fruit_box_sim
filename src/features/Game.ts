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
  private isEndChecker: number | null = null;

  box = new Box();
  blocks = new Blocks(this.box.board);
  backGround = new BackGround();
  blockFrame = new BlockFrame();
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

    // timer.isEndからリザルトの描画をフックする
    this.isEndChecker = window.setInterval(() => {
      if (!this.timer.isEnd) {
        return;
      }
      if (this.isEndChecker) {
        clearInterval(this.isEndChecker);
      }
      this.box.isDropped.forEach((line, y) => {
        line.forEach((isDropped, x) => {
          if (isDropped) {
            this.blocks.spriteArr[y][x].alpha = 0.3;
          }
        });
      });
      // TODO: history表示のevent hook
    }, 100);
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
    this.lastClicked = null;
    this.lastHovered = null;

    this.start();
  }
}
