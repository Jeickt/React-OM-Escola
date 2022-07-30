import { put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import { rootNavigate } from '../../../services/history';
import * as types from '../types';
import * as authActions from '../auth/actions';

function* axiosErrorsHandlerRequest({ payload }) {
  const { err } = payload;

  const errors = get(err, 'response.data.errors', []);
  const status = get(err, 'response.status', 0);

  if (status === 401) {
    toast.error('Você precisa fazer login novamente.');
    yield put(authActions.loginFailure());
    rootNavigate('/login');
  }

  if (errors.length > 0) {
    errors.map((error) => toast.error(error));
    return true;
  }

  return false;
}

const axiosErrorsHandler = takeLatest(
  types.AXIOS_ERRORS_HANDLER_REQUEST,
  axiosErrorsHandlerRequest
);

export default axiosErrorsHandler;
