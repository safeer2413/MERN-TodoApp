import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const Todoinstance = axios.create({
  baseURL: `${API_BASE_URL}/api/todo`,
  withCredentials: true,
});

export default Todoinstance;
