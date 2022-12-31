import { Assets, Application, Sprite } from 'pixi.js';

const app = new Application();
document.body.appendChild(app.view);

const texture = await Assets.load('assets/cat.jpg');

const cat = new Sprite(texture);

// Setup the position of the bunny
cat.x = app.renderer.width / 2;
cat.y = app.renderer.height / 2;

// Rotate around the center
cat.anchor.x = 0.5;
cat.anchor.y = 0.5;

// Add the cat to the scene we are building
app.stage.addChild(cat);

// Listen for frame updates
app.ticker.add(() => {
  // each frame we spin the cat around a bit
  cat.rotation += 0.01;
});
