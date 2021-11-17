import { useState, useCallback, useRef, useEffect } from 'react';
import _ from 'lodash';

const useRefUnmounted = () => {
  const refUnmounted = useRef(false);
  useEffect(() => {
    return () => {
      refUnmounted.current = true;
    };
  }, []);
  return refUnmounted;
};

const useAsyncFn = (fn, deps) => {
  const [state, set] = useState({
    loading: false,
  });
  const unmountedRef = useRefUnmounted();

  const callback = useCallback((...args) => {
    set((prevState) => ({ ...prevState, loading: true, error: undefined }));
    return fn(...args)
      .then((value) => {
        if (!unmountedRef.current) {
          set({
            loading: false,
            value: _.get(value, 'data.data', value),
          });
        }
        return value;
      })
      .catch((error) => {
        if (!unmountedRef.current) {
          set({
            loading: false,
            error,
          });
        }
        throw error;
      });
  }, deps);

  return [state, callback];
};

export default useAsyncFn;
