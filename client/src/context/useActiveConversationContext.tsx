import type { Conversation, GetConversationsResponse } from '../interface/Conversation';
import { useContext, createContext, ReactElement, useCallback, ReactNode, useState } from 'react';
import { useSocket } from './useSocketContext';

import useConversations from '../hooks/useConversations';
import { OnError, OnLoading, OnSuccess } from '../interface/ApiData';
import { Message } from '../interface/Message';

type UpdateActiveConversation = (id: string) => void;
type UpdateConversationLastMessage = (id: string, message: Message) => void;
type UpdateMessageHistory = (messages: Message[]) => void;
type MatchConversations = <R>(
  onLoading: OnLoading<R>,
  onError: OnError<R>,
  onSuccess: OnSuccess<GetConversationsResponse, R>,
) => any;
type MessageHistory = {
  [key: string]: Message[];
};

interface ActiveConversationsContext {
  activeConversation: Conversation | null;
  updateActiveConversation: UpdateActiveConversation;
  matchConversations: MatchConversations;
  messageHistory: MessageHistory;
  updateMessageHistory: UpdateMessageHistory;
  updateConversationLastMessage: UpdateConversationLastMessage;
}

export const ActiveConversationsContext = createContext<ActiveConversationsContext>({
  updateActiveConversation: () => null,
  matchConversations: () => null,
  activeConversation: null,
  messageHistory: {},
  updateMessageHistory: () => null,
  updateConversationLastMessage: () => null,
});

interface Props {
  children: ReactNode;
  loadOnMount?: boolean;
  delay?: number;
}

export const ActiveConversationProvider = ({ children, loadOnMount = false, delay = 0 }: Props): ReactElement => {
  const { addNewConversation, conversations, matchConversations, updateConversations } = useConversations({
    loadOnMount,
    delay,
  });
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messageHistory, setMessageHistory] = useState<MessageHistory>({});

  const updateActiveConversation = useCallback<UpdateActiveConversation>(
    (id) => {
      const conversation = conversations.find((conversation) => conversation.id === id);
      if (conversation && conversation.id !== activeConversation?.id) setActiveConversation(conversation);
    },
    [conversations, activeConversation],
  );

  const updateConversationLastMessage = useCallback(
    (id: string, lastMessage: Message) => {
      updateConversations((data) => {
        if (data) {
          const newConvos = data.conversations.map((conversation) => {
            if (conversation.id === id) {
              conversation.lastMessage = lastMessage;
            }
            return conversation;
          });
          return { conversations: newConvos };
        }
        return data;
      });
    },
    [updateConversations],
  );

  const updateMessageHistory = useCallback<UpdateMessageHistory>(
    (messages) => {
      const id = activeConversation?.id;
      if (id) setMessageHistory((history) => ({ ...history, [id]: messages }));
    },
    [activeConversation],
  );

  return (
    <ActiveConversationsContext.Provider
      value={{
        activeConversation,
        messageHistory,
        updateMessageHistory,
        updateActiveConversation,
        matchConversations,
        updateConversationLastMessage,
      }}
    >
      {children}
    </ActiveConversationsContext.Provider>
  );
};

export const ActiveConversationContext = ActiveConversationsContext.Consumer;
export const useActiveConversation = (): ActiveConversationsContext => useContext(ActiveConversationsContext);
