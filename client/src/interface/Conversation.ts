import { Message } from './Message';

export interface OtherUser {
  name: string;
  photo: string;
  id: string;
  userId: string;
}
export interface Conversation {
  id: string;
  otherUser: OtherUser;
  lastMessage?: Message;
}

export interface GetConversationsResponse {
  conversations: Conversation[];
}

export interface NewConversationResponse {
  conversation: Conversation;
}
