import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import conversationReducer from '../features/conversationSlice';

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, undefined, Action>;