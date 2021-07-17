import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import axios from "axios";

function Todolist({ todos, getTodos, setEdit }) {
  async function removeTodo(id) {
    await axios.delete("http://localhost:5000/customer/" + id);
    getTodos();
  }

  return (
    <>
      {todos.map((todo, index) => {
        const key = "todo-" + index;
        return (
          <div className="todo-item" key={key}>
            <h3 className="col-md-9 offset-md-1">{todo.name}</h3>
            <div className="icons  col-md-1">
              <AiFillDelete
                onClick={() => removeTodo(todo._id)}
                className="delete-icon"
              />
              <TiEdit onClick={() => setEdit(todo)} className="edit-icon " />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Todolist;
