import * as socketIo from 'socket.io-client';
import { Operation } from 'fast-json-patch/commonjs/core';

// Socket.io types (ref:  https://socket.io/docs/v4/typescript/)

export interface ClientToServerEvents {}

export interface ServerToClientEvents {
  // Conversation patch event
  conversation: ({
    conversationId,
    patch,
  }: {
    conversationId: string
    patch: Operation[]
  }) => void;

  // Error event
  error: ({
    error,
    reconnect,
  }: {
    error: string
    reconnect?: boolean
  }) => void;
}

export type Socket = socketIo.Socket<ServerToClientEvents, ClientToServerEvents>;
