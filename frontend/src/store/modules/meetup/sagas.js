import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateMeetupSuccess, updateMeetupFailure } from './actions';

export function* updateMeetup({ payload }) {
  try {
    const { title, description, location, date_hour, file_id } = payload.data;

    const meetup = Object.assign({
      title,
      description,
      location,
      date_hour,
      file_id,
    });

    const response = yield call(api.put, 'meetups/5', meetup);

    toast.success('Meetup atualizado com sucesso');

    yield put(updateMeetupSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao atualizar meetup, confira seus dados');
    yield put(updateMeetupFailure());
  }
}

export default all([takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup)]);
