import { Component } from "react";

interface Props {
  name: string;
}

interface MyState {
  error: boolean;
  loading: boolean;
  value: string;
}
const SECURITY_CODE = "asd";
export class ClassState extends Component<Props, MyState> {
  state: MyState = {
    error: false,
    loading: false,
    value: "",
  };

  // UNSAFE_componentWillMount(): void {
  //     console.log('componentWillMount')
  // }
  // componentWillUnmount(): void {
  //     console.log('componentWillUnmount')
  // }
  // componentDidMount(): void {
  //     console.log('componentDidMount')
  // }
  componentDidUpdate(): void {
    console.log("update!");

    if (this.state.loading) {
      setTimeout(() => {
        console.log("start Validated");

        if (this.state.value === SECURITY_CODE) {
          this.setState({ error: false, loading: false });
        } else {
          this.setState({ error: true, loading: false });
        }

        console.log("end validated");
      }, 1000);
    }
    console.log("end Effect");
  }

  render() {
    const { name } = this.props;
    const { error, loading, value } = this.state;

    return (
      <div>
        <h2>Delete {name}</h2>
        <p>pls, escribe code para erase</p>
        {error && !this.state.loading && <p>Error: el code es incorrect </p>}
        {loading && <p>Loading...</p>}
        <input
          placeholder="code de security"
          value={value}
          onChange={(e) => this.setState({ value: e?.target.value })}
        />
        <button
          onClick={() => {
            this.setState({ loading: true });
          }}
        >
          Check
        </button>
        <button onClick={() => this.setState({ error: false })}>CheckIn</button>
      </div>
    );
  }
}
