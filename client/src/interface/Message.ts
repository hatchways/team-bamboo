export interface Message {
  id: string;
  sender: {
    id: string;
    userId: string;
    name: string;
    photo: string;
  };
  conversationId: string;
  content: string;
  createdAt: string;
}

export interface MessageQueryOptions {
  limit?: number;
  page?: number;
  sort?: keyof Message;
  order?: 'asc' | 'desc';
}

export interface GetMessagesResponse {
  messages: Message[];
}

export interface SendMessageResponse {
  message: Message;
}
