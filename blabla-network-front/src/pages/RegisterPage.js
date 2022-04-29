import React, { useState } from "react";
import * as backend from "../api/backend";

const GENDERS = ["Male", "Female", "Gender-fluid helicopter"]

export default function RegisterPage({ login }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [bio, setBio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        city: city,
        bio: bio
    };
    
    const response = await backend.register(user);
    login(response.data.token, response.data.user);      
  };

  return (
    <div className="simple-form">
      <form onSubmit={handleSubmit}>
        <h3>Please, register</h3>
        <div>
          <input className="simple-input" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <input className="simple-input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <input className="simple-input" type="text" placeholder="Firstname" onChange={(e) => setFirstname(e.target.value)}/>
        </div>
        <div>
          <input className="simple-input" type="text" placeholder="Lastname" onChange={(e) => setLastname(e.target.value)}/>
        </div>
        <div>
            <select className="simple-input" id="gender" name="gender" onChange={(e) => setGender(e.target.value)}>
            {GENDERS.map(gender => 
                <option key={gender} value={gender}>{gender}</option>
            )}
            </select>
        </div>
        <div>
          <input className="simple-input" type="text" placeholder="City" onChange={(e) => setCity(e.target.value)}/>
        </div>
        <div>
          <textarea className="simple-input" placeholder="Bio" onChange={(e) => setBio(e.target.value)}/>
        </div>
        <div>
          <button className="simple-button" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
