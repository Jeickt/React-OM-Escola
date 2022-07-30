import * as types from '../types';

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}

export function isLoadingRequest(payload) {
  return {
    type: types.IS_LOADING_REQUEST,
    payload,
  };
}

export function isLoadingSuccess(payload) {
  return {
    type: types.IS_LOADING_SUCCESS,
    payload,
  };
}

export function isLoadingFailure(payload) {
  return {
    type: types.IS_LOADING_FAILURE,
    payload,
  };
}
