import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const data = error.response?.data;
    if (data?.reason === "banned") {
      window.location.href = "/banned"; // Redirect immediately
    }
    return Promise.reject(error);
  }
);

export default apiClient;