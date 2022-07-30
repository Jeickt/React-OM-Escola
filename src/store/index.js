import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddlewaere from 'redux-saga';
import { persistStore } from 'redux-persist';

import reducers from './modules/rootReducer';
import saga from './modules/rootSaga';
import persistedReducers from './modules/reduxPersist';

const sagaMiddleware = createSagaMiddlewaere();

const store = configureStore({
  reducer: persistedReducers(reducers),
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export const persistor = persistStore(store);
export default store;
