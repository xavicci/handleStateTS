import { useEffect, useReducer } from "react";

type Props = {
  name: string;
};

type CompState = {
  value: string;
  error: boolean;
  loading: boolean;
  deleted: boolean;
  confirmed: boolean;
};

const SECURITY_CODE = "asd";

export const UseReducer = ({ name }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //   const onWrite = (e: ChangeEvent<HTMLInputElement>) => {
  //     setState({ ...state, value: e.target.value });
  //   };

  useEffect(() => {
    console.log("start the effect");

    if (state.loading) {
      setTimeout(() => {
        console.log("start Validated");

        if (state.value === SECURITY_CODE) {
          dispatch({ type: "CONFIRM" });
        } else {
          dispatch({ type: "ERROR" });
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
          onChange={
            (e) => dispatch({ type: "WRITE", payload: e.target.value })
            // onWrite
          }
        />
        <button
          onClick={
            () => dispatch({ type: "DELETE" })
            // onCheck
          }
        >
          CheckIn
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Are you sure to delete?</p>
        <button onClick={() => dispatch({ type: "DELETE" })}>Yes</button>
        <button onClick={() => dispatch({ type: "RESET" })}>No</button>
      </>
    );
  } else {
    return (
      <>
        <p>Delete Completed</p>
        <button
          onClick={
            () => dispatch({ type: "RESET" })
            // onReset
          }
        >
          Reset, Come Back
        </button>
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

enum ActionKind {
  CHECK = "CHECK",
  ERROR = "ERROR",
  CONFIRM = "CONFIRM",
  DELETE = "DELETE",
  RESET = "RESET",
  WRITE = "WRITE",
}

interface Action {
  type: ActionKind;
  payload?: string;
}

const reducerObject = (state, action) => ({
  ERROR: {
    ...state,
    error: true,
    loading: false,
  },
  CHECK: {
    ...state,
    loading: true,
  },
  CONFIRM: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  WRITE: {
    ...state,
    value: action.payload,
  },
  DELETE: {
    ...state,
    deleted: true,
  },
  RESET: {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action)[action.type] || state;
};
