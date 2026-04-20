import axios from "axios";

const API = axios.create({
  baseURL:  "https://blog-backend-kb6t.onrender.com/api",
});


// ADD THIS INTERCEPTOR

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;

});

export default API;
