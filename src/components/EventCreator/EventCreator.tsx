import { ChangeEvent, ReactNode, useState, FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form';

import { EVENT_TYPE, PAGES_ROUTES } from '../../constants';
import { EventCreatorActions, EventCreatorWrapper, Field } from './style';
import { useDispatch } from 'react-redux';
import { createEvent, DayEvent, editEvent } from '../../store/actions/events';

interface SelectTypeEvent extends HTMLSelectElement {
  value: EVENT_TYPE;
}

const renderAdditionalFields = ({
  eventType,
  register,
  locationEvent,
  errors,
}: {
  eventType: EVENT_TYPE;
  register: UseFormRegister<DayEvent>;
  locationEvent?: DayEvent;
  errors: FieldErrors<DayEvent>;
}): ReactNode => {
  switch (eventType) {
    case EVENT_TYPE.EVENT:
      return (
        <>
          <Field hasError={!!errors.address}>
            Куда идти?
            <input
              type="text"
              {...register('address', { required: true })}
              defaultValue={locationEvent?.address}
            />
            {errors.address && <span>Необходимо указать адрес</span>}
          </Field>
          <Field hasError={!!errors.time}>
            Во сколько?
            <input
              type="time"
              {...register('time', { required: true })}
              defaultValue={locationEvent?.time}
            />
            {errors.time && <span>Необходимо указать время</span>}
          </Field>
        </>
      );
    case EVENT_TYPE.HOLIDAY:
      return (
        <Field hasError={!!errors.budget}>
          Сколько денег потратить?
          <input
            type="text"
            {...register('budget', { required: true })}
            defaultValue={locationEvent?.budget}
          />
          {errors.budget && <span>Необходимо указать сумму денег</span>}
        </Field>
      );
    default:
    case EVENT_TYPE.NOTE:
      return (
        <Field hasError={!!errors.description}>
          Описание
          <input
            type="text"
            {...register('description', { required: true })}
            defaultValue={locationEvent?.description}
          />
          {errors.description && <span>Необходимо указать описание</span>}
        </Field>
      );
  }
};

const EventCreator: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [eventType, setEventType] = useState<EVENT_TYPE>(
    location?.state?.event?.type || EVENT_TYPE.NOTE
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DayEvent>();

  const handleCancel = () => {
    navigate(PAGES_ROUTES.HOME, { replace: false });
  };

  const onSubmit: SubmitHandler<DayEvent> = (data) => {
    if (location?.state?.event?.id) {
      console.log(location.state);
      dispatch(
        editEvent({
          ...data,
          id: location.state.event.id,
          date: location.state.event.date,
        })
      );
    } else {
      dispatch(
        createEvent({ ...data, id: uuidv4(), date: location.state.selectedDay })
      );
    }

    window.history.replaceState({}, document.title);
    navigate(PAGES_ROUTES.HOME, { replace: false });
  };

  return (
    <EventCreatorWrapper onSubmit={handleSubmit(onSubmit)}>
      <Field hasError={!!errors.name}>
        Название события
        <input
          type="text"
          {...register('name', { required: true })}
          defaultValue={location?.state?.event?.name}
        />
        {errors.name && <span>Необходимо указать название</span>}
      </Field>
      <Field>
        Тип события
        <select
          {...register('type', { required: true })}
          onChange={(evt: ChangeEvent<SelectTypeEvent>) =>
            setEventType(evt.target.value)
          }
          defaultValue={location?.state?.event?.type || EVENT_TYPE.NOTE}
        >
          <option value={EVENT_TYPE.NOTE}>Пометка</option>
          <option value={EVENT_TYPE.HOLIDAY}>Праздничный день</option>
          <option value={EVENT_TYPE.EVENT}>Мероприятие</option>
        </select>
      </Field>
      {renderAdditionalFields({
        eventType,
        register,
        locationEvent: location?.state?.event,
        errors,
      })}
      <EventCreatorActions>
        <button onClick={handleCancel}>Отмена</button>
        <button type="submit">Сохранить</button>
      </EventCreatorActions>
    </EventCreatorWrapper>
  );
};

export default EventCreator;
