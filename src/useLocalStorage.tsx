import { useEffect, useReducer } from "react";

interface MyState<T> {
  item: T;
  loading: boolean;
  error: boolean;
  synchronizedItem: boolean;
}

const initialState = <T,>(param: T): MyState<T> => ({
  loading: true,
  error: false,
  synchronizedItem: true,
  item: param,
});

enum ActionType {
  error = "ERROR",
  success = "SUCCESS",
  save = "SAVE",
  sincronize = "SINCRONIZE",
}

interface Action {
  type: ActionType;
  payload?: any;
}

const reducerObject = <T,>(
  state: MyState<T>,
  payload: any
): { [k in ActionType]: MyState<T> } => ({
  ERROR: {
    ...state,
    error: true,
  },
  SUCCESS: {
    ...state,
    loading: false,
    synchronizedItem: true,
    item: payload,
  },
  SAVE: {
    ...state,
    item: payload,
  },
  SINCRONIZE: {
    ...state,
    loading: true,
    synchronizedItem: false,
  },
});

const reducer = <T,>(state: MyState<T>, action: Action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

const useLocalStorege = <T,>(itemName: string, initialValue: T) => {
  const [state, dispatch] = useReducer(reducer, initialValue, initialState);

  const { error, item, loading, synchronizedItem } = state;

  const onError = (err: unknown) =>
    dispatch({ type: ActionType.error, payload: err });
  const onSuccess = (item: T) =>
    dispatch({ type: ActionType.success, payload: item });
  const onSave = (item: T) =>
    dispatch({ type: ActionType.save, payload: item });
  const onSincronize = () => dispatch({ type: ActionType.sincronize });

  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageTodos = localStorage.getItem(itemName);
        let parsedItem: T;
        if (!localStorageTodos) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageTodos) as T;
        }
        onSuccess(parsedItem);
      } catch (err) {
        onError(err);
      }
    }, 2000);
  }, [synchronizedItem]);

  const saveItem = (newTodos: T) => {
    onSave(newTodos);
    localStorage.setItem(itemName, JSON.stringify(newTodos));
  };

  const sincronizeItem = () => {
    onSincronize();
  };

  return {
    item: item as T,
    saveItem,
    loading,
    error,
    sincronizeItem,
  };
};

export { useLocalStorege };
