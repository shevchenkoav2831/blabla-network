import React from "react";
import { NavLink } from "react-router-dom";
import { getCurrentUser } from "../utils/common";

export default function NavigationBar({ isAuthenticated }) {
  let mainElements, rightElements;
  
  if (!isAuthenticated) {
    rightElements = (
      <>
        <NavLink activeClassName="active" to="/login">Login</NavLink>
        <NavLink activeClassName="active" to="/register">Register</NavLink>
      </>
    );
  } else {
    const currentUser = getCurrentUser();
    mainElements = (
      <>
        <NavLink activeClassName="active" to="/profile">Profile</NavLink>
        <NavLink activeClassName="active" to="/friends">Friends</NavLink>
        <NavLink activeClassName="active" to="/requests">Requests</NavLink>
        <NavLink activeClassName="active" to="/search">Search</NavLink>
      </>
    );
    rightElements = (
      <>
        <b>{currentUser.firstName} {currentUser.lastName} </b><NavLink activeClassName="active" to="/logout">[Logout]</NavLink>
      </>
    );
  }

  return (
    <div className="header">
        {mainElements}
        <div className="header-right">
            {rightElements}
        </div>
    </div>
  );
}
