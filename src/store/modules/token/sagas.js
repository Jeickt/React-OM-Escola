import { takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';

import axios from '../../../services/axios';
import * as types from '../types';

function persistRehidrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

const token = takeLatest(types.PERSIST_REHIDRATE, persistRehidrate);

export default token;
