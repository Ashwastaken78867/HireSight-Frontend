// src/services/authService.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/auth";

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  const { token, user } = response.data;

  // Save token in localStorage
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  return { token, user };
};

export const signup = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
