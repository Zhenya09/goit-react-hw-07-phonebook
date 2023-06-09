// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import contactsReducer from './contactsSlice';
// import { filterReducer } from './filterSlice';
// import { combineReducers } from 'redux';

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// };

// const persistedReducer = persistReducer(
//   persistConfig,
//   combineReducers({
//     contacts: contactsReducer,
//     filter: filterReducer,
//   })
// );

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// });

// export const persistor = persistStore(store);

// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import contactsReducer, { fetchContacts } from './contactsSlice';
// import { filterReducer } from './filterSlice';
// import { combineReducers } from 'redux';

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage,
// };

// const rootReducer = combineReducers({
//   contacts: contactsReducer,
//   filter: filterReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware({
//     serializableCheck: false,
//   }),
// });

// export const persistor = persistStore(store);

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer, {
  fetchContacts,
} from '../store/contactsSlice';
import { filterReducer } from './filterSlice';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    contacts: contactsReducer,
    filter: filterReducer,
  })
);

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

export const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);

store.dispatch(fetchContacts());