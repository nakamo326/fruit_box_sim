import { Application, FederatedPointerEvent, ICanvas, Sprite } from 'pixi.js';
import { nums, GameState } from './constants';
import { Box, Coordinate } from './Box';

const box = new Box();
let lastClicked: Coordinate | null = null;

// 1回目、lastClickedに配列座標追加、長方形描画
// 2回目、lastClickedと新しい座標を加えてBoxにtry。
const handleClick = (event: FederatedPointerEvent) => {
  console.log(event.clientX, event.clientY);
};

const generateSprites = (
  board: number[][],
  app: Application<ICanvas>
): Sprite[][] => {
  const result = board.map((line, y) => {
    return line.map((num, x) => {
      const sprite = new Sprite(nums[num - 1]);
      sprite.x = x * 38 + 64;
      sprite.y = y * 38 + 64;
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
