export class AudioManager {
  private src: HTMLAudioElement;
  constructor(path: string) {
    this.src = new Audio(path);
  }

  play(volume: number) {
    this.src.volume = volume;
    this.src.load();
    this.src.play();
  }
}
