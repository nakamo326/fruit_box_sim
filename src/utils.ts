import { BOARD, BOARD_START_X, BOARD_START_Y, BOARD_STEP } from './constants';

export const calcBoardCoordinate = (screenX: number, screenY: number) => {
  const inputX = Math.floor((screenX - BOARD_START_X) / BOARD_STEP);
  const inputY = Math.floor((screenY - BOARD_START_Y) / BOARD_STEP);
  let x = inputX;
  if (inputX >= BOARD.X) {
    x = BOARD.X - 1;
  } else if (inputX < 0) {
    x = 0;
  }
  let y = inputY;
  if (inputY >= BOARD.Y) {
    y = BOARD.Y - 1;
  } else if (inputY < 0) {
    y = 0;
  }
  return { x, y };
};
