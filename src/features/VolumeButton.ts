import { Container, Graphics, Text } from 'pixi.js';

export class VolumeButton {
  private elements = new Container();
  private downButton = new Container();
  private upButton = new Container();
  private text: Text;
  private volume = 5;

  constructor(xStart: number, yStart: number) {
    const leftButton = new Graphics();
    leftButton.lineStyle(2, 0xffffff, 1);
    leftButton.beginFill(0x000000);
    leftButton.drawRect(xStart, yStart + 2, 24, 24);
    leftButton.endFill();
    this.downButton.addChild(leftButton);
    const leftButtonText = new Text('<', {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff,
      align: 'center',
    });
    leftButtonText.x = xStart + 6;
    leftButtonText.y = yStart + 2;
    this.downButton.addChild(leftButtonText);

    this.downButton.interactive = true;
    this.downButton.on('pointerdown', this.handleDown(this));

    this.text = new Text('0.5', {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff,
      align: 'right',
    });
    this.text.x = xStart + 40;
    this.text.y = yStart + 2;

    const rightButton = new Graphics();
    rightButton.lineStyle(2, 0xffffff, 1);
    rightButton.beginFill(0x000000);
    rightButton.drawRect(xStart + 80, yStart + 2, 24, 24);
    rightButton.endFill();
    this.upButton.addChild(rightButton);

    const rightButtonText = new Text('>', {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff,
      align: 'center',
    });
    rightButtonText.x = xStart + 80 + 6;
    rightButtonText.y = yStart + 2;
    this.upButton.addChild(rightButtonText);

    this.upButton.interactive = true;
    this.upButton.on('pointerdown', this.handleUp(this));

    this.elements.addChild(this.downButton);
    this.elements.addChild(this.upButton);
    this.elements.addChild(this.text);
  }

  public get elementRef(): Container {
    return this.elements;
  }

  public get getVolume(): number {
    return this.volume * 0.1;
  }

  handleDown(me: VolumeButton) {
    return () => {
      if (me.volume > 0) {
        me.volume -= 1;
        me.text.text = `${me.getVolume.toFixed(1)}`;
        console.log(me.volume);
      }
    };
  }

  handleUp(me: VolumeButton) {
    return () => {
      if (me.volume < 10) {
        me.volume += 1;
        me.text.text = `${me.getVolume.toFixed(1)}`;
        console.log(me.volume);
      }
    };
  }
}
