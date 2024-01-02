import { useEffect, useState } from "react";

type Props = {
  name: string;
};
const SECURITY_CODE = "asd";

export const UseState = ({ name }: Props) => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    console.log("start the effect");

    if (loading) {
      setTimeout(() => {
        console.log("start Validated");

        if (value !== SECURITY_CODE) {
          setError(true);
        }
        setLoading(false);

        console.log("end validated");
      }, 1000);
    }
    console.log("end Effect");
  }, [loading, value]);

  return (
    <div>
      <h2>Delete {name}</h2>
      <p>Por favor, escribe code para erase</p>

      {error && <p>Error: el code es incorrect</p>}
      {loading && <p>loading..</p>}
      <input
        placeholder="code de security"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />

      <button
        onClick={() => {
          setLoading(true);
          setError(false);
        }}
      >
        CheckIn
      </button>
      <button onClick={() => setError(!error)}>CheckInError</button>
    </div>
  );
};
