import { Message } from './Message';

export interface LastMessage extends Omit<Message, 'sender'> {
  sender: string;
}

export interface Conversation {
  id: string;
  otherUser: {
    name: string;
    photo: string;
    id: string;
  };
  lastMessage?: LastMessage;
}
