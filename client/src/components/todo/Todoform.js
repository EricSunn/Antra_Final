import axios from "axios";
import React, { useState } from "react";

function Todoform({ handlesubmit, button }) {
  const [todo, setTodo] = useState("");

  async function submit(e) {
    e.preventDefault();
    const data = todo;
    handlesubmit(data);
    setTodo("");
  }
  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Enter todos:"
          value={todo}
          onChange={async (e) => {
            await setTodo(e.target.value);
          }}
        />
        <button type="submit">{button}</button>
      </form>
    </div>
  );
}

export default Todoform;
