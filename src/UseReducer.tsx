import { ChangeEvent, useEffect, useReducer } from "react";

type Props = {
  name: string;
};

type CompState = {
  value?: string;
  error: boolean;
  loading: boolean;
  deleted: boolean;
  confirmed: boolean;
};

const SECURITY_CODE = "asd";

export const UseReducer = ({ name }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onConfirm = () => {
    dispatch({ type: ActionType.CONFIRM });
  };

  const onError = () => {
    dispatch({ type: ActionType.ERROR });
  };

  const onWrite = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.WRITE, payload: e.target.value });
  };

  const onCheck = () => {
    dispatch({ type: ActionType.CHECK });
  };

  const onDelete = () => {
    dispatch({ type: ActionType.DELETE });
  };

  const onReset = () => {
    dispatch({ type: ActionType.RESET });
  };

  useEffect(() => {
    console.log("start the effect");

    if (state.loading) {
      setTimeout(() => {
        console.log("start Validated");

        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }

        console.log("end validated");
      }, 1000);
    }
    console.log("end Effect");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Delete {name}</h2>
        <p>Por favor, escribe code para erase</p>
        {state.error && !state.loading && <p>Error: el code es incorrect</p>}
        {state.loading && <p>loading..</p>}
        <input
          placeholder="security code"
          value={state.value}
          onChange={onWrite}
        />
        <button onClick={onCheck}>CheckIn</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Are you sure to delete?</p>
        <button onClick={onDelete}>Yes</button>
        <button onClick={onReset}>No</button>
      </>
    );
  } else {
    return (
      <>
        <p>Delete Completed</p>
        <button onClick={onReset}>Reset, Come Back</button>
      </>
    );
  }
};

const initialState: CompState = {
  value: "",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

enum ActionType {
  CHECK = "CHECK",
  ERROR = "ERROR",
  CONFIRM = "CONFIRM",
  DELETE = "DELETE",
  RESET = "RESET",
  WRITE = "WRITE",
}

interface Action {
  type: ActionType;
  payload?: string;
}

const reducerObject = (state: CompState, action: Action) => ({
  [ActionType.ERROR]: {
    ...state,
    error: true,
    loading: false,
  },
  [ActionType.CHECK]: {
    ...state,
    loading: true,
  },
  [ActionType.CONFIRM]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [ActionType.WRITE]: {
    ...state,
    value: action.payload,
  },
  [ActionType.DELETE]: {
    ...state,
    deleted: true,
  },
  [ActionType.RESET]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
});

const reducer = (state: CompState, action: Action): CompState =>
  reducerObject(state, action)[action.type] || state;
