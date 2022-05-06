import { http } from "./http";

export const login = async (email, password) => {
  return http.post("/auth/login", { email: email, password: password });
};

export const register = async (user) => {
  return http.post("/auth/register", user);
};
export const verifyToken = async (token) => {
  return http.get("/auth/verifyToken", { params: { token: token } });
};

export const getUserById = async (userId) => {
  return http.get(`/users/${userId}`);
};
export const getFriends = async (userId) => {
  return http.get(`/users/${userId}/friends`);
};

export const searchByFirstnameAndLastname = async (firstName, lastName) => {
  return http.get("/users/search", { params: { firstName: firstName, lastName: lastName } });
};

export const sendFriendRequest = async (userId, friendId) => {
  return http.post(`/users/${userId}/friends/${friendId}`);
};

export const getFriendsRequests = async (userId) => {
  return http.get(`/users/${userId}/friends/requests`);
};

export const approveRequest = async (userId, requestId) => {
  return http.post(`/users/${userId}/friends/approve`, null, { params: { requestId } });
};

export const rejectRequest = async (userId, requestId) => {
  return http.post(`/users/${userId}/friends/reject`, null, { params: { requestId } });
};
