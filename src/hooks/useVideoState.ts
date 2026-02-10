import { useState, useCallback, useRef } from 'react';
import { VideoState } from '@/types/video';

export const useVideoState = () => {
  const [state, setState] = useState<VideoState>('IDLE');
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const transitionTo = useCallback((newState: VideoState) => {
    setState(newState);
    if (newState !== 'ERROR') {
      setError(null);
    }
  }, []);

  const setErrorState = useCallback((errorMessage: string) => {
    setState('ERROR');
    setError(errorMessage);
  }, []);

  const abortCurrentRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const createNewAbortController = useCallback(() => {
    abortCurrentRequest();
    abortControllerRef.current = new AbortController();
    return abortControllerRef.current;
  }, [abortCurrentRequest]);

  return {
    state,
    error,
    transitionTo,
    setErrorState,
    abortCurrentRequest,
    createNewAbortController,
  };
};
