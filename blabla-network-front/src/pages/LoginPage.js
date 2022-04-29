import React, { useState } from "react";
import * as backend from "../api/backend";

export default function LoginPage({login}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await backend.login(email, password);
    login(response.data.token, response.data.user);
  };

  return (
    <div className="simple-form">
      <form onSubmit={handleSubmit}>
        <h3>Please, Log In</h3>
        <div>
          <input className="simple-input" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <input className="simple-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <button className="simple-button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

