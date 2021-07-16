import axios from "axios";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import Todoform from "./Todoform";
import Todolist from "./Todolist";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [edittodo, setEdittodo] = useState();
  const [isedit, setIsedit] = useState(false);

  function setEdit(todo) {
    setIsedit(true);
    setEdittodo(todo);
  }

  async function createNewTodo(data) {
    try {
      const datas = { name: data };
      await axios.post("http://localhost:5000/customer/", datas);
      getTodos();
    } catch (err) {
      console.error(err);
    }
  }

  async function updateTodo(data) {
    try {
      const datas = { name: data };
      await axios.patch(
        "http://localhost:5000/customer/" + edittodo._id,
        datas
      );
      getTodos();
      setIsedit(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function getTodos() {
    const data = await axios
      .get("http://localhost:5000/customer/")
      .then((res) => res.data);
    setTodos(data);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      {isedit && (
        <>
          <div>
            <h3>previous todo:</h3>
            <p>{edittodo.name}</p>
            <button onClick={(e) => setIsedit(false)}>Back</button>
            <Todoform handlesubmit={updateTodo} button="Update" />
          </div>
        </>
      )}
      {!isedit && (
        <>
          <Todoform handlesubmit={createNewTodo} button="Add" />
          <Todolist getTodos={getTodos} todos={todos} setEdit={setEdit} />
        </>
      )}
    </div>
  );
}

export default Todo;
