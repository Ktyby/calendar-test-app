import { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { EVENT_TYPE, PAGES_ROUTES } from '../../../constants';
import { DayEvent, deleteEvent } from '../../../store/actions/events';
import {
  EventFromDayWrapper,
  Title,
  Description,
  EventFromDayDescription,
} from './style';

interface EventFromDayProps {
  event: DayEvent;
}

const renderEventDescription = (event: DayEvent): ReactNode => {
  switch (event.type) {
    case EVENT_TYPE.EVENT:
      return (
        <>
          <Description>
            Адрес: <span>{event.address}</span>
          </Description>
          <Description>
            Время: <span>{event.time}</span>
          </Description>
        </>
      );
    case EVENT_TYPE.HOLIDAY:
      return (
        <Description>
          Бюджет: <span>{event.budget}$</span>
        </Description>
      );
    default:
    case EVENT_TYPE.NOTE:
      return (
        <Description>
          <span>{event.description}</span>
        </Description>
      );
  }
};

const EventFromDay: FC<EventFromDayProps> = ({ event }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(event.id));
  };

  const handleEditEvent = () => {
    navigate(PAGES_ROUTES.EDIT_EVENT, { replace: false, state: { event } });
  };

  return (
    <EventFromDayWrapper>
      <EventFromDayDescription>
        <Title>{event.name}</Title>
        {renderEventDescription(event)}
      </EventFromDayDescription>
      <div>
        <button onClick={handleEditEvent}>Изменить</button>
        <button onClick={handleDeleteEvent}>Удалить</button>
      </div>
    </EventFromDayWrapper>
  );
};

export default EventFromDay;
