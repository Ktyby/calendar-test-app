import { CombinedState, combineReducers, Reducer } from 'redux';
import eventsReducer, { EventsState } from './events';

import { Actions } from '../actions';

const rootReducer: Reducer<
  CombinedState<{ events: EventsState }>,
  Actions
> = combineReducers({
  events: eventsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
