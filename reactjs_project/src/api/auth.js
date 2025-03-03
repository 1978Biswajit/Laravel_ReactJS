import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const register = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

export const getUser = async (token) => {
  return axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
