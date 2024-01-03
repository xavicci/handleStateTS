import { useEffect, useState } from "react";

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

export const UseState = ({ name }: Props) => {
  const [state, setState] = useState<CompState>({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  useEffect(() => {
    console.log("start the effect");
    console.log(state);

    if (state.loading) {
      setTimeout(() => {
        console.log("start Validated");

        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            error: false,
            loading: false,
            confirmed: true,
          });
        } else {
          setState({
            ...state,
            error: true,
            loading: false,
          });
        }

        console.log("end validated");
      }, 1000);
    }
    console.log("end Effect");
  }, [state]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Delete {name}</h2>
        <p>Por favor, escribe code para erase</p>
        {state.error && !state.loading && <p>Error: el code es incorrect</p>}
        {state.loading && <p>loading..</p>}
        <input
          placeholder="code de security"
          value={state.value}
          onChange={(e) => {
            setState({ ...state, value: e.target.value });
          }}
        />

        <button
          onClick={() => {
            setState({
              ...state,
              loading: true,
            });
          }}
        >
          CheckIn
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Are you sure to delete?</p>
        <button
          onClick={() => {
            setState({
              ...state,
              deleted: true,
            });
          }}
        >
          Yes
        </button>
        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
            });
          }}
        >
          No
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>Delete Completed</p>
        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              deleted: false,
            });
          }}
        >
          Reset, Come Back
        </button>
      </>
    );
  }
};
