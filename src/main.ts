import { Application } from 'pixi.js';
import { Game } from './Game';

/*
  [x] 選択したブロックと、hoverしているブロックを囲むように枠を表示する
  [x] ブロックがないところの判定を追加する
  [x] タイマーを設定する
  [x] 現在のスコアを表示する
  リザルト画面を出す
  タイトル画面を出す
*/

const main = () => {
  // init pixi app
  const app = new Application();
  document.body.appendChild(app.view);

  const game = new Game(app);
  game.start();
};

main();
