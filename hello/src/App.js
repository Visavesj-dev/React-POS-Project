import React, { useState } from "react";

//function Card(props) {
function Card({ color }) {
  return (
    <div>
      {/* <h1 style={{ color: props.color }}>Card</h1> */}
      <h1 style={{ color: color }}>Card</h1>
    </div>
  );
}

//export default function App() {
export default () => {
  let style = { color: "red", backgroundColor: "black" };
  let count = 1;
  const [countState, setCountState] = useState(0);
  const [message, setMessage] = useState("");

  return (
    <div>
      {/* my comment */}
      <h1>Code Mobile</h1>
      <h1 style={style}>Code Mobile</h1>
      <span>{count}</span>
      <br />
      <span>{countState}</span>
      <br />
      <span>{message}</span>
      <br />
      <input
        type="text"
        onChange={e => setMessage(e.target.value)}
        name=""
        id=""
        value={message}
      />
      <br />
      <button
        onClick={() => {
          count++;
          console.log(count);
          setCountState(countState + 1);
        }}
      >
        ADD
      </button>
      <button
        onClick={() => {
          setMessage("");
        }}
      >
        Reset
      </button>

      <Card color="red" />
      <Card />
    </div>
  );
};
