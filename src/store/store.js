import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import contactsReducer, {
  fetchContacts,
} from '../store/contactsSlice';
import { filterReducer } from './filterSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

store.dispatch(fetchContacts());



