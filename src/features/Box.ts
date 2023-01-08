import { BOARD, Coordinate } from '../constants';

export class Box {
  board: number[][];
  isDropped: boolean[][];
  score: number;

  constructor() {
    this.board = this.generateRamdomBoard();
    this.isDropped = Array(BOARD.Y)
      .fill(0)
      .map(() =>
        Array(BOARD.X)
          .fill(0)
          .map(() => false)
      );
    this.score = 0;
    console.log(this.board);
  }

  private generateRamdomBoard() {
    while (true) {
      const newBoard = Array(BOARD.Y)
        .fill(0)
        .map(() =>
          Array(BOARD.X)
            .fill(0)
            .map(() => Math.floor(Math.random() * 9) + 1)
        );
      const sum =
        newBoard.reduce((acc, val) => acc + val.reduce((a, b) => a + b), 0) -
        newBoard[BOARD.Y - 1][BOARD.X - 1];
      const num = 10 - (sum % 10);
      if (num == 10) {
        // もう一度盤面を作り直し
        continue;
      }
      newBoard[BOARD.Y - 1][BOARD.X - 1] = num;
      return newBoard;
    }
  }

  // 長方形の対角になる点を受け取り、長方形内のブロックの消去を試みる。
  tryEraseRectangles(points: Coordinate[]): boolean {
    // 対角の2点を受け取る
    if (!(points[0] && points[1])) {
      return false;
    }
    // 座標が作る長方形の範囲を決定
    const minX = points[0].x < points[1].x ? points[0].x : points[1].x;
    const maxX = points[0].x > points[1].x ? points[0].x : points[1].x;
    const minY = points[0].y < points[1].y ? points[0].y : points[1].y;
    const maxY = points[0].y > points[1].y ? points[0].y : points[1].y;

    let numOfBlock = 0;
    let count = 0;
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (!this.isDropped[y][x]) {
          numOfBlock++;
          count += this.board[y][x];
        }
      }
    }
    if (count !== 10) return false;
    // Boardから長方形内の座標にisDroppedのフラグを立てる
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (!this.isDropped[y][x]) {
          this.isDropped[y][x] = true;
        }
      }
    }
    this.score += numOfBlock;
    return true;
  }
}
