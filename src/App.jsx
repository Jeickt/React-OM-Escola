import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';
import CustomRouter from './services/history';
import Routes from './routes';
import GlobalStyle from './styles/globalStyles';
import Header from './components/Header';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <CustomRouter>
          <Header />
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} className="toast-container" />
        </CustomRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
