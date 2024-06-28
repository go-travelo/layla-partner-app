import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Operation } from 'fast-json-patch/commonjs/core';
import jsonPatch from 'fast-json-patch';
import { Conversation } from './conversationSliceModels';
import conversationService from '../services/conversationService';
import { AppDispatch, AppThunk, RootState } from '../store/store';
import { getLocalStorageItem, setLocalStorageItem } from '../services/localStorageService';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface ConversationState {
  connectionStatus: ConnectionStatus;
  conversation: Conversation;
  connectionError?: string;
  connectionUrl: string;
  connectionToken: string;
  connectionConversationId: string;
}

const initialState: ConversationState = {
  connectionStatus: 'disconnected',
  conversation: {},
  connectionError: undefined,
  connectionUrl: getLocalStorageItem('connectionUrl', 'https://bd-api.dev.beautifuldestinations.app'),
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
    setConnectionUrl: (state, action) => {
      state.connectionUrl = action.payload;
      setLocalStorageItem('connectionUrl', state.connectionUrl);
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
  setConnectionUrl,
  setConnectionToken,
  setConnectionConversationId,
} = conversationSlice.actions;

export const selectConversation = (state: RootState) => state.conversation.conversation;
export const selectConnectionStatus = (state: RootState) => state.conversation.connectionStatus;
export const selectConnectionError = (state: RootState) => state.conversation.connectionError;
export const selectConnectionUrl = (state: RootState) => state.conversation.connectionUrl;
export const selectConnectionToken = (state: RootState) => state.conversation.connectionToken;
export const selectConnectionConversationId = (state: RootState) => state.conversation.connectionConversationId;

export default conversationSlice.reducer;

// Thunk to connect to the Socket.IO server
export const connectSocket = (url: string, conversationId: string, token: string): AppThunk => (dispatch: AppDispatch) => {
  conversationService.connect(url, conversationId, token, dispatch);
};

// Thunk to disconnect from the Socket.IO server
export const disconnectSocket = (): AppThunk => (dispatch: AppDispatch) => {
  conversationService.disconnect(dispatch);
};