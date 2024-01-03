import { ChangeEvent, useEffect, useState } from "react";

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

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };

  const onWrite = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, value: e.target.value });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true,
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
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
