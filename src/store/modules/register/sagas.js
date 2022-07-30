import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import axios from '../../../services/axios';
import { rootNavigate } from '../../../services/history';
import * as types from '../types';
import * as actions from './actions';
import * as authActions from '../auth/actions';
import axiosErrorsHandlerRequest from '../axiosErrorsHandler/actions';

function* registerRequest({ payload }) {
  const { id, name, email, password, originalEmail } = payload;
  try {
    if (id) {
      yield call(axios.put, '/users', {
        name,
        email,
        password: password || undefined,
      });
      toast.success('Seu usuário foi editado');

      if (email !== originalEmail) {
        toast.error('Você precisa fazer login novamente');
        delete axios.defaults.headers.Authorization;
        yield put(authActions.loginFailure());
        rootNavigate('/login');
      } else {
        yield put(actions.registerSuccess({ name, email, password }));
      }
    } else {
      yield call(axios.post, '/users', { name, email, password });
      toast.success('Seu acesso foi cadastrado');
      yield put(actions.registerSuccess());
      rootNavigate('/login');
    }
  } catch (err) {
    const result = yield put(axiosErrorsHandlerRequest({ err }));
    if (!result) {
      if (!id) toast.error('Falha na criação de usuário');
      else toast.error('Falha na edição de usuário');
    }
    yield put(actions.registerFailure());
  }
}

const register = takeLatest(types.REGISTER_REQUEST, registerRequest);

export default register;
