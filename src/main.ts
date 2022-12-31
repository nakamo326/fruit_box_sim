import { Application, ICanvas, Sprite } from 'pixi.js';
import { nums, GameState } from './constants';
import { Box } from './Box';

const generateSprites = (board: number[][], app: Application<ICanvas>) => {
  for (let y = 0; y < board.length; y++) {
    const line = board[y];
    for (let x = 0; x < line.length; x++) {
      const num = line[x];
      const sprite = new Sprite(nums[num - 1]);
      sprite.x = x * 38 + 64;
      sprite.y = y * 38 + 64;
      app.stage.addChild(sprite);
    }
  }
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
