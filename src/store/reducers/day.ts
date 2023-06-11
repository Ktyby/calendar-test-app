import { Actions } from '../actions';
import { SELECT_DAY } from '../actionTypes';

export type DayState = Date;

const initialState: DayState = new Date();

const selectedDay = (state = initialState, action: Actions): DayState => {
  switch (action.type) {
    case SELECT_DAY:
      return action.payload;
    default:
      return state;
  }
};

export default selectedDay;
