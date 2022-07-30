import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import axios from '../../../services/axios';
import { rootNavigate } from '../../../services/history';
import * as types from '../types';
import * as actions from './actions';
import axiosErrorsHandlerRequest from '../axiosErrorsHandler/actions';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/token', payload);
    yield put(actions.loginSuccess({ ...response.data }));
    toast.success('Seu acesso foi realizado');
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    rootNavigate(payload.prevPath);
  } catch (err) {
    const result = yield put(axiosErrorsHandlerRequest({ err }));
    if (!result) {
      toast.error('Falha no acesso do usuário');
    }
    yield put(actions.loginFailure(payload));
  }
}

const auth = takeLatest(types.LOGIN_REQUEST, loginRequest);

export default auth;
