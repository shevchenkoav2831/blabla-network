import { getCurrentUser } from "../utils/common";
import { http } from "./http";

const user = getCurrentUser();

export const login = async (email, password) => {
  return http.post("/auth/login", { email: email, password: password });
};

export const register =  async (user) => {
  return http.post("/auth/register", { user });
}
export const verifyToken = async (token) => {
  return http.get("/auth/verifyToken", { params: { token: token } });
};

export const getUserById = async (userId) => {
  return http.get(`/users/${userId}`);
};
export const getFriends = async () => {
  return http.get(`/users/${user.id}/friends`);
};

export const searchByFirstnameAndLastname = async (firstName, lastName) => {
  return http.get("/users/search", { params: { firstName: firstName, lastName: lastName } });
};

export const sendFriendRequest = async (friendId) => {
  return http.post(`/users/${user.id}/friends/${friendId}`);
};

export const getFriendsRequests = async () => {
  return http.get(`/users/${user.id}/friends/requests`);
};

export const approveRequest = async (requestId) => {
  return http.post(`/users/${user.id}/friends/approve`, null, { params: { requestId } });
};

export const rejectRequest = async (requestId) => {
  return http.post(`/users/${user.id}/friends/reject`, null, { params: { requestId } });
};
