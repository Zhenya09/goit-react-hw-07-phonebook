import React from 'react';
import { Provider } from 'react-redux';
import { store} from './store/store';
import { App } from './components/App';
import ReactDOM from 'react-dom/client';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

  <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);