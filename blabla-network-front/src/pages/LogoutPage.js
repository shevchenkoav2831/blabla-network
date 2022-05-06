import React, { useEffect } from "react";

export default function LogoutPage({ logout }) {
  useEffect(() => {
    const doLogout = () => {
      logout();
    };

    const fakeTime = setTimeout(() => doLogout(), 1000);

    return () => clearTimeout(fakeTime);
  }, []);

  return <h3>Logging out...</h3>;
}
