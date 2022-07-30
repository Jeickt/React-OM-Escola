import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import token from './token/sagas';
import register from './register/sagas';
import axiosErrorsHandler from './axiosErrorsHandler/sagas';

export default function* rootSaga() {
  return yield all([auth, token, register, axiosErrorsHandler]);
}
