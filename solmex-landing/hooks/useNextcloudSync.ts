/**
 * React Hook for Nextcloud Integration
 * 
 * Provides easy-to-use hook for syncing data to Nextcloud
 */

import { useState } from 'react';

export interface SyncState {
  loading: boolean;
  success: boolean | null;
  error: string | null;
  results: any;
}

export function useNextcloudSync() {
  const [state, setState] = useState<SyncState>({
    loading: false,
    success: null,
    error: null,
    results: null,
  });

  const sync = async (data: any, type: 'customer' | 'partner' = 'customer') => {
    setState({
      loading: true,
      success: null,
      error: null,
      results: null,
    });

    try {
      const response = await fetch('/api/nextcloud/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, type }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to sync to Nextcloud');
      }

      setState({
        loading: false,
        success: result.success,
        error: null,
        results: result.results,
      });

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState({
        loading: false,
        success: false,
        error: errorMessage,
        results: null,
      });
      throw error;
    }
  };

  const reset = () => {
    setState({
      loading: false,
      success: null,
      error: null,
      results: null,
    });
  };

  return {
    ...state,
    sync,
    reset,
  };
}


