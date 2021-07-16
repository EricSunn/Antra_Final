import React, { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { TiEdit } from "react-icons/ti";
import axios from "axios";

function Todolist({ todos, getTodos, setEdit }) {
  async function removeTodo(id) {
    const data = { id: id };
    await axios.delete("http://localhost:5000/customer/" + id);
    getTodos();
  }

  return (
    <ul>
      {todos.map((todo, index) => {
        const key = "todo-" + index;
        return (
          <li key={key}>
            {todo.name}
            <div className="icons">
              <AiFillDelete
                onClick={() => removeTodo(todo._id)}
                className="delete-icon"
              />
              <TiEdit onClick={() => setEdit(todo)} className="edit-icon" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Todolist;
