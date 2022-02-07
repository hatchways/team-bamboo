export interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    photo: string;
  };
  conversationId: string;
  content: string;
  createdAt: string;
}
