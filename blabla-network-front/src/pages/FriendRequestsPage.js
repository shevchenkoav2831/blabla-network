import React, { useEffect, useState } from "react";

import UsersTable from "../components/UsersTable";
import * as backend from "../api/backend";
import { getCurrentUser } from "../utils/common";

export default function FriendRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const approve = async (userId) => {
    const requestId = requests.filter((r) => r.user.id === userId)[0].requestId;
    await backend.approveRequest(getCurrentUser().id, requestId);
    setRequests(requests.filter((r) => r.requestId !== requestId));
  };

  const reject = async (userId) => {
    const requestId = requests.filter((r) => r.user.id === userId)[0].requestId;
    await backend.rejectRequest(getCurrentUser().id, requestId);
    setRequests(requests.filter((r) => r.requestId !== requestId));
  };

  const specialActions = [
    {
      label: "Approve",
      action: approve,
    },
    {
      label: "Reject",
      action: reject,
    },
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await backend.getFriendsRequests(getCurrentUser().id);
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.log("[fetchRequests] error=%o", error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return requests && requests.length > 0 ? (
    <UsersTable users={requests.map((r) => r.user)} specialActions={specialActions} />
  ) : (
    <div>You have no new friend requests.</div>
  );
}
