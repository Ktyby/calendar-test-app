import { Actions } from '../actions';
import { EVENT } from '../actionTypes';
import { DayEvent } from '../actions/events';

export type EventsState = Array<DayEvent>;

const initialState: EventsState = [];

const events = (state = initialState, action: Actions): EventsState => {
  let eventId;

  switch (action.type) {
    case EVENT.CREATE:
      return [...state, action.payload];
    case EVENT.DELETE:
      eventId = state.findIndex((event) => event.id === action.payload);
      state.splice(eventId, 1);

      return [...state];
    case EVENT.EDIT:
      eventId = state.findIndex((event) => event.id === action.payload.id);

      state.splice(eventId, 1, action.payload);

      return [...state];
    default:
      return state;
  }
};

export default events;
