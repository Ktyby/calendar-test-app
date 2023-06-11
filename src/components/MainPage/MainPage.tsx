import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useSelector } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';

import { CreateEventButton, EventsList, MainPageWrapper } from './styles';
import { useNavigate } from 'react-router-dom';
import { PAGES_ROUTES } from '../../constants';
import { RootState } from '../../store/reducers';
import EventFromDay from './EventFromDay';
import { DayEvent } from '../../store/actions/events';

const MainPage = () => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [eventsFromDay, setEventsFromDay] = useState<DayEvent[] | null>(null);

  const events = useSelector((state: RootState) => state.events);

  const navigate = useNavigate();

  useEffect(() => {
    if (events.length) {
      setEventsFromDay(
        events.filter((event) => {
          return (
            new Date(event.date).setHours(0, 0, 0, 0) ===
            selectedDay.setHours(0, 0, 0, 0)
          );
        })
      );
    }
  }, [events, selectedDay]);

  return (
    <MainPageWrapper>
      <div>
        <DatePicker
          selected={selectedDay}
          onChange={(date: Date) => setSelectedDay(date)}
        />
      </div>
      <CreateEventButton
        onClick={() =>
          navigate(PAGES_ROUTES.CREATE_EVENT, {
            replace: false,
            state: { selectedDay },
          })
        }
      >
        Создать событие
      </CreateEventButton>
      <EventsList>
        {eventsFromDay?.map((event) => (
          <EventFromDay event={event} key={event.id} />
        ))}
      </EventsList>
    </MainPageWrapper>
  );
};

export default MainPage;
