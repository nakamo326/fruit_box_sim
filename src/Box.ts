const BOARD = {
  X: 17,
  Y: 10,
};

export type Coordinate = {
  x: number;
  y: number;
};

export class Box {
  board: number[][];
  score: number;

  constructor() {
    this.board = this.generateBoard();
    this.score = 0;
    console.log(this.board);
  }

  private generateBoard() {
    const newBoard = Array(BOARD.Y)
      .fill(0)
      .map(() =>
        Array(BOARD.X)
          .fill(0)
          .map(() => Math.floor(Math.random() * 9) + 1)
      );
    return newBoard;
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
        if (this.board[y][x] !== 0) {
          numOfBlock++;
          count += this.board[y][x];
        }
      }
    }
    if (count !== 10) return false;
    // Boardから長方形内のnumを0にする
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        if (this.board[y][x] !== 0) {
          this.board[y][x] = 0;
        }
      }
    }
    this.score += numOfBlock;
    return true;
  }
}
