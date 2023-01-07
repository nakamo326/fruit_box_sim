import { Application } from 'pixi.js';
import { Game } from './features/Game';

/* TODO:
  [x] 選択したブロックと、hoverしているブロックを囲むように枠を表示する
  [x] ブロックがないところの判定を追加する
  [x] タイマーを設定する
  [x] 現在のスコアを表示する
  [x] リセットボタンを追加する
  [x] 操作音を追加する
  [] 盤面の生成アルゴリズムを修正
  [] タイトル画面を出す
  [] リザルト画面を出す
  [] デザインの修正
*/

const main = () => {
  // init pixi app
  const app = new Application();
  // @ts-ignore
  document.body.appendChild(app.view);

  const game = new Game(app);

  game.start();
};

main();
