import { CHAR_POSITIONS, CHAR_PARAMS } from '../utils/constants';

export const DISCONNECT_STATUS_PROPS = {
  x: CHAR_POSITIONS.columnsX[0] - CHAR_PARAMS.w,
  y: CHAR_POSITIONS.rowsY[2],
  type: hmUI.system_status.DISCONNECT,
  src: 'disconnect.png',
  show_level: hmUI.show_level.ONLY_NORMAL,
};
