import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: process.env.REACT_APP_NAME,
  storage,
  saveList: ['auth'],
};

export default (reducers) => {
  return persistReducer(persistConfig, reducers);
};
