import type { ValidationError, RequestError, OnSuccess, OnError, OnLoading } from '../interface/ApiData';
import type { Conversation, GetConversationsResponse } from '../interface/Conversation';
import { useEffect, useCallback, useRef, Dispatch, SetStateAction } from 'react';
import { useFetchRequest } from '../hooks';
import { getConversations } from '../helpers/APICalls/conversations';
import { useAuth } from '../context/useAuthContext';

interface UseConversationsOptions {
  delay?: number;
  loadOnMount?: boolean;
}

export interface UseConversationsReturn {
  isLoading: boolean;
  conversations: Conversation[];
  error: ValidationError[] | RequestError | null;
  loadConversations: () => void;
  matchConversations: <R>(
    onLoading: OnLoading<R>,
    onError: OnError<R>,
    onSuccess: OnSuccess<GetConversationsResponse, R>,
  ) => R;
  addNewConversation: (conversation: Conversation) => void;
  updateConversations: Dispatch<SetStateAction<GetConversationsResponse | null>>;
}

type UseConversations = (options?: UseConversationsOptions) => UseConversationsReturn;

const useConversations: UseConversations = ({ delay = 0, loadOnMount = false } = { delay: 0, loadOnMount: false }) => {
  const { data, error, isLoading, makeRequest, matchRequest, setData, setError } =
    useFetchRequest<GetConversationsResponse>(delay);
  const { loggedInUser } = useAuth();
  const loaded = useRef(false);

  const loadConversations = useCallback(() => makeRequest(() => getConversations()), [makeRequest]);

  const addNewConversation = useCallback(
    (conversation: Conversation) => {
      setData((data) => ({
        conversations: !data ? [conversation] : [...data.conversations, conversation],
      }));
    },
    [setData],
  );

  useEffect(() => {
    if (loadOnMount && !loaded.current && loggedInUser) {
      loadConversations();
      loaded.current = true;
    }
  }, [loadConversations, loadOnMount, loggedInUser]);

  return {
    isLoading,
    conversations: data?.conversations || [],
    error,
    loadConversations,
    addNewConversation,
    matchConversations: matchRequest,
    updateConversations: setData,
  };
};

export default useConversations;
