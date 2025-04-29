import axios from "axios";

// use backend url from env
const API = axios.create({
  baseURL:
    process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api/users",
});

export default API;
