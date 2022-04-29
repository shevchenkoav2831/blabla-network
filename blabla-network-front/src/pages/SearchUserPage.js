import React, { useState } from "react";

import UsersTable from "../components/UsersTable";
import * as backend from "../api/backend";

export default function SearchUserPage() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [users, setUsers] = useState([]);

  const addFriend = async (id) => {
    try {
      await backend.sendFriendRequest(id);
      setUsers(users.filter(u => u.id !== id));
    } catch (error) {
      console.log("[addFriend] error=%o", error);
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

    const response = await backend.searchByFirstnameAndLastname(firstName, lastName);
    setUsers(response.data);
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