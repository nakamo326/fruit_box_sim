import { Container, Sprite, Text } from 'pixi.js';
import { ColorReplaceFilter } from '@pixi/filter-color-replace';
import { volumeDown, volumeUp } from '../constants';

export class VolumeButton {
  private elements = new Container();
  private text: Text;
  private volume = 5;

  constructor(xStart: number, yStart: number) {
    const filter = new ColorReplaceFilter(0x000000, 0xffffff);

    const downIcon = new Sprite(volumeDown);
    downIcon.filters = [filter];
    downIcon.x = xStart;
    downIcon.y = yStart;

    downIcon.interactive = true;
    downIcon.on('pointerdown', this.handleDown(this));

    this.text = new Text('0.5', {
      fontFamily: 'Arial',
      fontSize: 20,
      fill: 0xffffff,
      align: 'right',
    });
    this.text.x = xStart + 40;
    this.text.y = yStart + 4;

    const upIcon = new Sprite(volumeUp);
    upIcon.filters = [filter];
    upIcon.x = xStart + 80;
    upIcon.y = yStart;

    upIcon.interactive = true;
    upIcon.on('pointerdown', this.handleUp(this));

    this.elements.addChild(downIcon);
    this.elements.addChild(upIcon);
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
