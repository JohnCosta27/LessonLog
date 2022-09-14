import { createSignal } from "solid-js";
import { render } from "solid-js/web";

function HelloWorld() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <div>Hello World!</div>
      <p>{count()}</p>
      <button onClick={() => setCount(count() + 1)}></button>
    </>
  );
}

render(() => <HelloWorld />, document.getElementById("root") as HTMLElement);
