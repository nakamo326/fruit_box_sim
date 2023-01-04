import { Application, FederatedPointerEvent, ICanvas } from 'pixi.js';
import { Coordinate } from '../constants';
import { calcBoardCoordinate } from '../utils';
import { Box } from './Box';
import { BackGround } from './BackGround';
import { Blocks } from './Blocks';
import { BlockFrame } from './BlockFrame';
import { ResetButton } from './ResetButton';
import { Score } from './Score';
import { Timer } from './Timer';

export class Game {
  lastClicked: Coordinate | null = null;
  lastHovered: Coordinate | null = null;

  box = new Box();
  blocks = new Blocks(this.box.board);
  backGround = new BackGround();
  blockFrame = new BlockFrame();
  score = new Score();
  timer = new Timer(this.blockFrame.getResetter());
  resetButton = new ResetButton();

  constructor(private readonly app: Application<ICanvas>) {
    this.backGround.elementRef.on('pointerdown', this.handleClick(this));
    this.backGround.elementRef.on('pointerover', this.handleOver(this));
    this.backGround.elementRef.on('pointermove', this.handleOver(this));
    this.resetButton.elementRef.on('pointerdown', this.handleResetGame(this));

    this.blocks.elementRef.children.forEach((sprite) => {
      sprite.on('pointerdown', this.handleClick(this));
      sprite.on('pointerover', this.handleOver(this));
    });

    app.stage.addChild(this.backGround.elementRef);
    app.stage.addChild(this.blocks.elementRef);
    app.stage.addChild(this.blockFrame.containerRef);
    app.stage.addChild(this.score.textRef);
    app.stage.addChild(this.timer.textRef);
    app.stage.addChild(this.resetButton.elementRef);
  }

  handleClick(me: Game) {
    return (event: FederatedPointerEvent) => {
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
              me.blocks.spriteArr[y][x].alpha = 0;
            }
          });
        });
        me.score.update(me.box.score);
      }
      me.lastClicked = null;
      me.blockFrame.reset();
    };
  }

  handleOver(me: Game) {
    return (event: FederatedPointerEvent) => {
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

  handleResetGame(me: Game) {
    return () => {
      me.blockFrame.reset();
      me.box = new Box();
      me.blocks.regenerate(me.box.board);
      this.blocks.elementRef.children.forEach((sprite) => {
        sprite.on('pointerdown', this.handleClick(this));
        sprite.on('pointerover', this.handleOver(this));
      });

      me.score.reset();
      me.timer.reset();

      me.timer.start();
    };
  }

  start() {
    this.timer.start();
  }
}
