import { useCallback, useRef, useState } from 'react';

function useThunkReducer(reducer, initialArg, init = (a) => a) {
  const [hookState, setHookState] = useState(init(initialArg));

  const state = useRef(hookState);
  const getState = useCallback(() => state.current, [state]);
  const setState = useCallback((newState) => {
    state.current = newState;
    setHookState(newState);
  }, [state, setHookState]);

  const reduce = useCallback((action) => reducer(getState(), action), [reducer, getState]);

  const dispatch = useCallback((action) => (typeof action === 'function'
    ? action(dispatch, getState)
    : setState(reduce(action))), [getState, setState, reduce]);

  return [hookState, dispatch];
}

export default useThunkReducer;
