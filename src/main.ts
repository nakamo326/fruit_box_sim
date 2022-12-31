import { Application, Sprite } from 'pixi.js';
import { nums } from './constants';

const main = () => {
  // init pixi app
  const app = new Application();
  document.body.appendChild(app.view);

  // make sprite and add to stage
  const cat = new Sprite(nums[2]);
  cat.x = app.renderer.width / 2;
  cat.y = app.renderer.height / 2;
  app.stage.addChild(cat);
};

main();
