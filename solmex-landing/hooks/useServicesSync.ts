/**
 * React Hook for All Services Integration
 * 
 * Provides easy-to-use hook for syncing data to all configured services
 * (Nextcloud, SAP, Custom Logistic Engines, etc.)
 */

import { useState } from 'react';

export interface ServicesSyncState {
  loading: boolean;
  success: boolean | null;
  error: string | null;
  results: any[];
}

export function useServicesSync() {
  const [state, setState] = useState<ServicesSyncState>({
    loading: false,
    success: null,
    error: null,
    results: [],
  });

  const sync = async (data: any, type: 'customer' | 'partner' = 'customer') => {
    setState({
      loading: true,
      success: null,
      error: null,
      results: [],
    });

    try {
      const response = await fetch('/api/services/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data, type }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to sync to services');
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
        results: [],
      });
      throw error;
    }
  };

  const reset = () => {
    setState({
      loading: false,
      success: null,
      error: null,
      results: [],
    });
  };

  return {
    ...state,
    sync,
    reset,
  };
}


