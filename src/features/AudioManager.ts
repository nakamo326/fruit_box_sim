export class AudioManager {
  private src = new Map<string, HTMLAudioElement>();
  constructor() {
    this.src.set('success', new Audio('/success.mp3'));
    this.src.set('fail', new Audio('/fail.mp3'));
  }

  play(key: string, volume: number) {
    const val = this.src.get(key);
    if (val) {
      val.volume = volume;
      val.load();
      val.play();
    }
  }
}
