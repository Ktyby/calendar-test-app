import { EVENT_TYPE } from '../../constants';
import { EVENT } from '../actionTypes';

export type DayEvent = {
  id: string;
  type: EVENT_TYPE;
  date: Date;
  name: string;
  address?: string;
  description?: string;
  time?: string;
  budget?: string;
};

export interface CreateEvent {
  type: EVENT.CREATE;
  payload: DayEvent;
}

export const createEvent = (payload: DayEvent): CreateEvent => ({
  type: EVENT.CREATE,
  payload,
});

export interface DeleteEvent {
  type: EVENT.DELETE;
  payload: string;
}

export const deleteEvent = (eventId: string): DeleteEvent => ({
  type: EVENT.DELETE,
  payload: eventId,
});

export interface EditEvent {
  type: EVENT.EDIT;
  payload: DayEvent;
}

export const editEvent = (payload: DayEvent): EditEvent => ({
  type: EVENT.EDIT,
  payload,
});

export type EventsActions = EditEvent | CreateEvent | DeleteEvent;
