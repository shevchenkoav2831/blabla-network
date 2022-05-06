import React, { useState } from "react";
import toast from "../../node_modules/react-simple-toasts/dist/index";

import UsersTable from "../components/UsersTable";
import * as backend from "../api/backend";
import { getCurrentUser } from "../utils/common";

export default function SearchUserPage() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [users, setUsers] = useState([]);

  const addFriend = async (id) => {
    try {
      await backend.sendFriendRequest(getCurrentUser().id, id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      toast(error.data.message);
    }
  };

  let specialActions = [
    {
      label: "Add",
      action: addFriend,
    },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await backend.searchByFirstnameAndLastname(firstName, lastName);
      setUsers(response.data);
    } catch (error) {
      toast(error.data.message);
    }
  };

  return (
    <div>
      <div className="simple-form">
        <form onSubmit={handleSearch}>
          <h3>Find someone</h3>
          <div>
            <input className="simple-input" type="text" placeholder="Firstname" onChange={(e) => setFirstname(e.target.value)} />
          </div>
          <div>
            <input className="simple-input" type="text" placeholder="Lastname" onChange={(e) => setLastname(e.target.value)} />
          </div>
          <div>
            <button className="simple-button" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
      <UsersTable users={users} specialActions={specialActions} />
    </div>
  );
}
