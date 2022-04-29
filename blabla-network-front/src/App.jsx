import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import NavigationBar from "./components/NavigationBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LogoutPage from "./pages/LogoutPage";
import UserProfilePage from "./pages/UserProfilePage";
import FriendsPage from "./pages/FriendsPage";
import FriendRequestsPage from "./pages/FriendRequestsPage";
import SearchUserPage from "./pages/SearchUserPage";

import { getCurrentUser as getCurrentUser, setUserSession, removeUserSession, getToken } from "./utils/common";
import * as backend from "./api/backend";

export default function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;

    const verifyToken = async () => {
      const token = getToken();
      try {
        const response = await backend.verifyToken(token);
        setUserSession(response.data.token, response.data.user);
        setAuthenticated(true);
      } catch (error) {
        removeUserSession();
        setAuthenticated(false);
      }
    }

    verifyToken();
  }, [])

  const login = (token, user) => {
    setUserSession(token, user);
    setAuthenticated(true);
  };

  const logout = () => {
    removeUserSession();
    setAuthenticated(false);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar isAuthenticated={isAuthenticated} />
        <div className="content">
          <Route exact path="/" component={HomePage} />

          <PublicRoute path="/login" component={() => <LoginPage login={login} />} />
          <PublicRoute path="/register" component={() => <RegisterPage login={login} />} />
          <PrivateRoute path="/logout" component={() => <LogoutPage logout={logout} />} />

          <PrivateRoute path="/profile" component={() => <UserProfilePage thisIsMe={true} />} />
          <PrivateRoute path="/user/:userId" component={() => <UserProfilePage thisIsMe={false} />} />
          <PrivateRoute path="/friends" component={() => <FriendsPage />}  />
          <PrivateRoute path="/search" component={() => <SearchUserPage />} />
          <PrivateRoute path="/requests" component={() => <FriendRequestsPage />} />
        </div>
      </BrowserRouter>
    </div>
  );
}
