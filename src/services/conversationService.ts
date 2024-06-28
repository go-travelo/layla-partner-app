import { io, Socket } from 'socket.io-client';
import { applyPatch, clearConnectionError, clearConversation, setConnectionError, setConnectionStatus } from '../features/conversationSlice';
import { ClientToServerEvents, ServerToClientEvents } from './conversationServiceModels';
import { AppDispatch } from '../store/store';

class ConversationService {
  private socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

  connect(url: string, conversationId: string, token: string, dispatch: AppDispatch) {
    dispatch(setConnectionStatus('connecting'));

    this.socket = io(url, {
      path: '/chatbot/socket.io',
      query: { conversationId },
      transports: ['websocket'],
      forceNew: true,
      auth: { token },
    });

    this.socket.on('connect', () => {
      console.log('Connected to the server');
      dispatch(setConnectionStatus('connected'));
      dispatch(clearConnectionError());
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from the server');
      dispatch(setConnectionStatus('disconnected'));
      dispatch(clearConversation());
      dispatch(clearConnectionError());
    });

    this.socket.on('conversation', data => {
      console.log('Received conversation patch:', data);
      if (data.patch) {
        dispatch(applyPatch(data.patch));
      }
    });

    this.socket.on('error', data => {
      console.error('Received conversation error:', data);
      if (data.error) {
        dispatch(setConnectionError(data.error));
      }
    });
  }

  disconnect(dispatch: AppDispatch) {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      dispatch(setConnectionStatus('disconnected'));
      dispatch(clearConversation());
    }
  }
}

const conversationService = new ConversationService();
export default conversationService;
