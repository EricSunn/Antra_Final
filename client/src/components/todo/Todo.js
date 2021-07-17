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
    <div className="todo formContainer">
      {isedit && (
        <>
          <div className="todo-item">
            <h3 className="col-md-10">Previous todo:{edittodo.name}</h3>
            <button className="col-md-1" onClick={(e) => setIsedit(false)}>
              Back
            </button>
          </div>
          <Todoform handlesubmit={updateTodo} button="Update" />
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
