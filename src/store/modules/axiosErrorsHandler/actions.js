import * as types from '../types';

export default function axiosErrorsHandlerRequest(payload) {
  return {
    type: types.AXIOS_ERRORS_HANDLER_REQUEST,
    payload,
  };
}
