import axios from "axios";

const API = axios.create({
  baseURL: "https://smartcrmbackend.onrender.com/api", // Change this for production
});

// Automatically add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
