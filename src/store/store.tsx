import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import conversationReducer from '../features/conversationSlice';
import settingsReducer from '../features/settingsSlice';

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, undefined, Action>;