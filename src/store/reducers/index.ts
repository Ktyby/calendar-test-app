import { CombinedState, combineReducers, Reducer } from 'redux';
import eventsReducer, { EventsState } from './events';
import selectedDayReducer, { DayState } from './day';

import { Actions } from '../actions';

const rootReducer: Reducer<
  CombinedState<{ events: EventsState; date: DayState }>,
  Actions
> = combineReducers({
  events: eventsReducer,
  date: selectedDayReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
