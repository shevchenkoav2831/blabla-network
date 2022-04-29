import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getCurrentUser } from "../utils/common";
import * as backend from "../api/backend";

export default function UserProfile({ thisIsMe }) {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // @ts-ignore
  let { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await backend.getUserById(userId);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log("[fetchUser] error=%o", error);
        setLoading(false);
      }
    };

    if (thisIsMe) {
      setUser(getCurrentUser());
      setLoading(false);
    } else {
      fetchUser();
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {user && (
        <div className="profile-wrapper">
          <div className="profile-side">
            <div className="profile-name">
              <h2>
                {user.firstName} {user.lastName}
              </h2>
              {thisIsMe && <small>(this is you)</small>}
            </div>
            <h5 className="profile-side-h5">
              {user.gender}, {user.city}
            </h5>
            <div className="fakeimg">Photo ID: {user.id}</div>
          </div>
          <div className="profile-main">
            <h2>Information</h2>
            <div>{user.bio}</div>
          </div>
        </div>
      )}
    </>
  );
}
