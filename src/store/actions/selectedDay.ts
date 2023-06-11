import { SELECT_DAY } from '../actionTypes';

export interface SelectDay {
  type: typeof SELECT_DAY;
  payload: Date;
}

export const selectDay = (payload: Date): SelectDay => ({
  type: SELECT_DAY,
  payload,
});

export type DateActions = SelectDay;
