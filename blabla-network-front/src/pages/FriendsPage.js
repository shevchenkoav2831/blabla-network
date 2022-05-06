import React, { useEffect, useState } from "react";

import UsersTable from "../components/UsersTable";
import * as backend from "../api/backend";
import { getCurrentUser } from "../utils/common";

export default function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await backend.getFriends(getCurrentUser().id);
        setFriends(response.data);
        setLoading(false);
      } catch (error) {
        console.log("[fetchFriends] error=%o", error);
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return friends && friends.length > 0 ? <UsersTable users={friends} /> : <div>You have no friends :(</div>;
}
