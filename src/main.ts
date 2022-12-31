import { Application, FederatedPointerEvent, ICanvas, Sprite } from 'pixi.js';
import { nums, GameState } from './constants';
import { Box, Coordinate } from './Box';

type Fruit = {
  sprite: Sprite;
  x: number;
  y: number;
};

let firstPoint: Coordinate | null = null;
let secondPoint: Coordinate | null = null;

const handleClick = (event: FederatedPointerEvent) => {
  console.log(event.clientX, event.clientY);
};

const generateSprites = (
  board: number[][],
  app: Application<ICanvas>
): Fruit[][] => {
  const result = board.map((line, y) => {
    return line.map((num, x) => {
      const sprite = new Sprite(nums[num - 1]);
      sprite.x = x * 38 + 64;
      sprite.y = y * 38 + 64;
      app.stage.addChild(sprite);
      sprite.interactive = true;
      sprite.on('pointerdown', handleClick);
      return { sprite, x, y };
    });
  });
  return result;
};

const main = () => {
  // init pixi app
  const app = new Application();
  document.body.appendChild(app.view);

  console.log(app.renderer.width);
  const box = new Box();
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
