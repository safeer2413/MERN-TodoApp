import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const Todoinstance = axios.create({
  baseURL: `${API_BASE_URL}/api/todo`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

Todoinstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default Todoinstance;


// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000";

// const Todoinstance = axios.create({
//   baseURL: `${API_BASE_URL}/api/todo`,
//   withCredentials: true,
// });

// export default Todoinstance;
