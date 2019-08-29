import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateMeetupSuccess, updateMeetupFailure } from './actions';

export function* listMeetup({ payload }) {
  try {
    const id = payload;

    const response = yield call(api.get, `meetups/${id}`);

    yield put(updateMeetupSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao listar meetup, tente novamente');
    yield put(updateMeetupFailure());
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { title, description, location, date_hour, file_id } = payload.data;
    const id = payload.meetupId;

    const meetup = Object.assign({
      title,
      description,
      location,
      date_hour,
      file_id,
    });

    const response = yield call(api.put, `meetups/${id}`, meetup);

    toast.success('Meetup atualizado com sucesso');

    yield put(updateMeetupSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao atualizar meetup, confira seus dados');
    yield put(updateMeetupFailure());
  }
}

export default all([
  takeLatest('@meetup/LIST_MEETUP_REQUEST', listMeetup),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
]);
