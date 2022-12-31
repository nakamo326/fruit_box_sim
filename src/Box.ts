const BOARD = {
  X: 10,
  Y: 17,
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
    const newBoard = Array(BOARD.X)
      .fill(0)
      .map(() =>
        Array(BOARD.Y)
          .fill(0)
          .map(() => Math.floor(Math.random() * 9) + 1)
      );
    return newBoard;
  }

  // ブロック座標の集合を受け取り、消去を試みる。
  tryEraseBlocks(coordinates: number[][]): boolean {
    // 座標が作る長方形の範囲を測定
    let minX = BOARD.X;
    let maxX = 0;
    let minY = BOARD.Y;
    let maxY = 0;
    coordinates.forEach((val) => {
      minX = val[0] < minX ? val[0] : minX;
      maxX = val[0] > maxX ? val[0] : maxX;
      minY = val[1] < minY ? val[1] : minY;
      maxY = val[1] > maxY ? val[1] : maxY;
    });
    // 集合が作る長方形の範囲に他のブロックがないか確認する
    // -> 範囲内のブロック数==coordinates.length
    let numOfBlock = 0;
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        if (this.board[x][y] !== 0) numOfBlock++;
      }
    }
    if (numOfBlock !== coordinates.length) return false;
    // 集合の合計がちょうど10点になるか確認する
    let count = 0;
    coordinates.forEach((val) => {
      count += this.board[val[0]][val[1]];
    });
    if (count !== 10) return false;
    // Boardからcoordinatesの座標を消す
    coordinates.forEach((val) => {
      this.board[val[0]][val[1]] = 0;
    });
    this.score += coordinates.length;
    return true;
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
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        if (this.board[x][y] !== 0) {
          numOfBlock++;
          count += this.board[x][y];
        }
      }
    }
    if (count !== 10) return false;
    // Boardから長方形内のnumを0にする
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        if (this.board[x][y] !== 0) {
          this.board[x][y] = 0;
        }
      }
    }
    this.score += numOfBlock;
    return true;
  }
}
