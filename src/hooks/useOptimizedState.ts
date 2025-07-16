import { useCallback, useEffect, useRef, useState, useMemo } from 'react';

interface StateManagerOptions<T> {
  initialState: T;
  persist?: boolean;
  persistKey?: string;
  debounceMs?: number;
  throttleMs?: number;
  enableUndo?: boolean;
  maxUndoHistory?: number;
  enableDevTools?: boolean;
}

interface StateHistory<T> {
  past: T[];
  present: T;
  future: T[];
}

export const useOptimizedState = <T>(options: StateManagerOptions<T>) => {
  const {
    initialState,
    persist = false,
    persistKey = 'state',
    debounceMs = 0,
    throttleMs = 0,
    enableUndo = false,
    maxUndoHistory = 50,
    enableDevTools = process.env.NODE_ENV === 'development'
  } = options;

  // Initialize state with persistence
  const [state, setState] = useState<T>(() => {
    if (persist && typeof window !== 'undefined') {
      const saved = localStorage.getItem(persistKey);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.warn('Failed to parse saved state:', error);
        }
      }
    }
    return initialState;
  });

  // Undo/redo history
  const [history, setHistory] = useState<StateHistory<T>>(() => ({
    past: [],
    present: state,
    future: []
  }));

  // Performance tracking
  const performanceRef = useRef({
    updateCount: 0,
    lastUpdate: Date.now(),
    renderCount: 0
  });

  // Debounce and throttle refs
  const debounceRef = useRef<NodeJS.Timeout>();
  // const throttleRef = useRef<boolean>(false);
  const lastThrottleRef = useRef<number>(0);

  // Memoized selectors cache
  const selectorsCache = useRef(new Map());

  // Update performance tracking
  useEffect(() => {
    performanceRef.current.renderCount++;
  });

  // Persist state to localStorage
  useEffect(() => {
    if (persist && typeof window !== 'undefined') {
      try {
        localStorage.setItem(persistKey, JSON.stringify(state));
      } catch (error) {
        console.warn('Failed to persist state:', error);
      }
    }
  }, [state, persist, persistKey]);

  // Update history for undo/redo
  const updateHistory = useCallback((newState: T) => {
    if (!enableUndo) return;

    setHistory(prev => {
      const newHistory = {
        past: [...prev.past, prev.present].slice(-maxUndoHistory),
        present: newState,
        future: []
      };

      // DevTools integration
      if (enableDevTools && typeof window !== 'undefined') {
        (window as any).__LUCENT_UI_STATE_HISTORY__ = newHistory;
      }

      return newHistory;
    });
  }, [enableUndo, maxUndoHistory, enableDevTools]);

  // Optimized setState with debouncing/throttling
  const optimizedSetState = useCallback((newState: T | ((prev: T) => T)) => {
    const updateState = () => {
      setState(prev => {
        const nextState = typeof newState === 'function' ? (newState as (prev: T) => T)(prev) : newState;
        
        // Performance tracking
        performanceRef.current.updateCount++;
        performanceRef.current.lastUpdate = Date.now();

        // Update history
        updateHistory(nextState);

        return nextState;
      });
    };

    // Debounce logic
    if (debounceMs > 0) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(updateState, debounceMs);
      return;
    }

    // Throttle logic
    if (throttleMs > 0) {
      const now = Date.now();
      if (now - lastThrottleRef.current >= throttleMs) {
        lastThrottleRef.current = now;
        updateState();
      }
      return;
    }

    // Immediate update
    updateState();
  }, [debounceMs, throttleMs, updateHistory]);

  // Batch state updates
  const batchUpdate = useCallback((updates: Array<T | ((prev: T) => T)>) => {
    let newState = state;
    
    for (const update of updates) {
      if (typeof update === 'function') {
        newState = (update as (prev: T) => T)(newState);
      } else {
        newState = update;
      }
    }
    
    setState(newState);
    updateHistory(newState);
  }, [updateHistory, state]);

  // Memoized selector with caching
  const createSelector = useCallback(<R>(
    selector: (state: T) => R,
    dependencies?: any[]
  ): R => {
    const cacheKey = dependencies ? JSON.stringify(dependencies) : 'default';
    
    if (selectorsCache.current.has(cacheKey)) {
      const cached = selectorsCache.current.get(cacheKey);
      if (cached.state === state) {
        return cached.result;
      }
    }

    const result = selector(state);
    selectorsCache.current.set(cacheKey, { state, result });
    
    return result;
  }, [state]);

  // Undo functionality
  const undo = useCallback(() => {
    if (!enableUndo || history.past.length === 0) return;

    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, history.past.length - 1);

    setHistory({
      past: newPast,
      present: previous,
      future: [history.present, ...history.future]
    });

    setState(previous);
  }, [enableUndo, history]);

  // Redo functionality
  const redo = useCallback(() => {
    if (!enableUndo || history.future.length === 0) return;

    const next = history.future[0];
    const newFuture = history.future.slice(1);

    setHistory({
      past: [...history.past, history.present],
      present: next,
      future: newFuture
    });

    setState(next);
  }, [enableUndo, history]);

  // Reset state
  const reset = useCallback(() => {
    setState(initialState);
    if (enableUndo) {
      setHistory({
        past: [],
        present: initialState,
        future: []
      });
    }
  }, [initialState, enableUndo]);

  // Deep merge utility for nested objects
  const merge = useCallback((updates: Partial<T>) => {
    optimizedSetState(prev => {
      if (typeof prev === 'object' && prev !== null && !Array.isArray(prev)) {
        return { ...prev, ...updates };
      }
      return updates as T;
    });
  }, [optimizedSetState]);

  // Subscribe to state changes
  const subscribe = useCallback((callback: (state: T) => void) => {
    callback(state);
    
    // Simple subscription mechanism
    const unsubscribe = () => {
      // Cleanup logic would go here
    };

    return unsubscribe;
  }, [state]);

  // Performance metrics
  const getPerformanceMetrics = useCallback(() => {
    const { updateCount, lastUpdate, renderCount } = performanceRef.current;
    const now = Date.now();
    
    return {
      updateCount,
      renderCount,
      lastUpdate,
      timeSinceLastUpdate: now - lastUpdate,
      averageUpdateInterval: updateCount > 0 ? (now - lastUpdate) / updateCount : 0,
      cacheSize: selectorsCache.current.size
    };
  }, []);

  // Clear cache
  const clearCache = useCallback(() => {
    selectorsCache.current.clear();
  }, []);

  // Export state snapshot
  const exportState = useCallback(() => {
    return {
      state,
      history: enableUndo ? history : null,
      timestamp: Date.now(),
      version: '1.0.0'
    };
  }, [state, history, enableUndo]);

  // Import state snapshot
  const importState = useCallback((snapshot: any) => {
    try {
      if (snapshot.state) {
        setState(snapshot.state);
      }
      if (snapshot.history && enableUndo) {
        setHistory(snapshot.history);
      }
    } catch (error) {
      console.error('Failed to import state:', error);
    }
  }, [enableUndo]);

  // DevTools integration
  useEffect(() => {
    if (enableDevTools && typeof window !== 'undefined') {
      (window as any).__LUCENT_UI_STATE__ = {
        current: state,
        history: enableUndo ? history : null,
        performance: getPerformanceMetrics(),
        actions: {
          setState: optimizedSetState,
          undo,
          redo,
          reset,
          merge,
          exportState,
          importState,
          clearCache
        }
      };
    }
  }, [state, history, enableUndo, enableDevTools, getPerformanceMetrics, optimizedSetState, undo, redo, reset, merge, exportState, importState, clearCache]);

  // Memoized return value
  const memoizedReturn = useMemo(() => ({
    state,
    setState: optimizedSetState,
    batchUpdate,
    createSelector,
    undo,
    redo,
    reset,
    merge,
    subscribe,
    canUndo: enableUndo && history.past.length > 0,
    canRedo: enableUndo && history.future.length > 0,
    getPerformanceMetrics,
    clearCache,
    exportState,
    importState
  }), [
    state,
    optimizedSetState,
    batchUpdate,
    createSelector,
    undo,
    redo,
    reset,
    merge,
    subscribe,
    enableUndo,
    history.past.length,
    history.future.length,
    getPerformanceMetrics,
    clearCache,
    exportState,
    importState
  ]);

  return memoizedReturn;
};