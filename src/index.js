import { createRoot } from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './components/App';
import './index.css';

const root = document.getElementById('root');

createRoot(root).render(
  <React.StrictMode>
 <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <App />
    </PersistGate>
  </Provider>
      </React.StrictMode>
);