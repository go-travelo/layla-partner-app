import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Operation } from 'fast-json-patch/commonjs/core';
import jsonPatch from 'fast-json-patch';
import { Conversation } from './conversationSliceModels';
import conversationService from '../services/conversationService';
import { AppDispatch, AppThunk, RootState } from '../store/store';
import { getLocalStorageItem, setLocalStorageItem } from '../services/localStorageService';
import apiService from '../services/apiService';
import { SendTextMessageParams } from '../services/apiServiceModels';
import { selectBaseApiUrl } from './settingsSlice';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface ConversationState {
  connectionStatus: ConnectionStatus;
  conversation: Conversation;
  connectionError?: string;
  connectionToken: string;
  connectionConversationId: string;
}

const initialState: ConversationState = {
  connectionStatus: 'disconnected',
  conversation: {},
  connectionError: undefined,
  connectionToken: getLocalStorageItem('connectionToken', '<token>'),
  connectionConversationId: getLocalStorageItem('connectionConversationId', '<conversationId>'),
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConnectionStatus(state, action: PayloadAction<ConnectionStatus>) {
      state.connectionStatus = action.payload;
    },
    clearConversation(state) {
      state.conversation = {};
    },
    applyPatch(state, action: PayloadAction<Operation[]>) {
      state.conversation = jsonPatch.applyPatch(state.conversation, action.payload).newDocument;
    },
    setConnectionError(state, action: PayloadAction<string>) {
      state.connectionError = action.payload;
    },
    clearConnectionError(state) {
      state.connectionError = undefined;
    },
    setConnectionToken: (state, action) => {
      state.connectionToken = action.payload;
      setLocalStorageItem('connectionToken', state.connectionToken);
    },
    setConnectionConversationId: (state, action) => {
      state.connectionConversationId = action.payload;
      setLocalStorageItem('connectionConversationId', state.connectionConversationId);
    },
  },
});

export const {
  setConnectionStatus,
  clearConversation,
  applyPatch,
  setConnectionError,
  clearConnectionError,
  setConnectionToken,
  setConnectionConversationId,
} = conversationSlice.actions;

export const selectConversation = (state: RootState) => state.conversation.conversation;
export const selectConnectionStatus = (state: RootState) => state.conversation.connectionStatus;
export const selectConnectionError = (state: RootState) => state.conversation.connectionError;
export const selectConnectionToken = (state: RootState) => state.conversation.connectionToken;
export const selectConnectionConversationId = (state: RootState) => state.conversation.connectionConversationId;

export default conversationSlice.reducer;

export const connectSocket = (url: string, conversationId: string, token: string): AppThunk => (dispatch: AppDispatch) => {
  conversationService.connect(url, conversationId, token, dispatch);
};

export const disconnectSocket = (): AppThunk => (dispatch: AppDispatch) => {
  conversationService.disconnect(dispatch);
};

export const sendMessage = (message: SendTextMessageParams): AppThunk => async (dispatch: AppDispatch) => {
  await apiService.sendTextMessage(message);
};

export const createNewAndStartConversation = (name: string, skipGreeting: boolean): AppThunk =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = selectConnectionToken(getState());
    const url = selectBaseApiUrl(getState());
    const { conversation } = await apiService.startConversation({ token, name, skipGreeting });
    conversationService.disconnect(dispatch);
    dispatch(setConnectionConversationId(conversation.id));
    conversationService.connect(url, conversation.id, token, dispatch);
  };