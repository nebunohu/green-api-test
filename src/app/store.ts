import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { messagesApi } from '../redux/messages-api/messages-api';
import appReducer from '../redux/app-slice';

const persistAppConfig = {
  key: 'app',
  storage,
};

const rootReducer = combineReducers({
  app: persistReducer(persistAppConfig, appReducer),
  [messagesApi.reducerPath]: messagesApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([
      messagesApi.middleware
    ]),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
