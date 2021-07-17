import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

function Manage() {
  const [users, setUsers] = useState([]);

  async function getUser() {
    const data = await axios
      .get("http://localhost:5000/auth/manage")
      .then((res) => res.data);
    setUsers(data);
  }

  async function removeUser(id) {
    await axios.delete("http://localhost:5000/auth/" + id);
    getUser();
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="todo-item text-center">
        <h3 className="col-md-11">User List:</h3>
      </div>
      {users.map((user, index) => {
        return (
          <div className="todo-item" key={index}>
            <h3 className="col-md-9 offset-md-1">{user.email}</h3>
            <AiFillDelete
              onClick={() => removeUser(user._id)}
              className="delete-icon col-md-1"
            />
          </div>
        );
      })}
    </>
  );
}

export default Manage;
