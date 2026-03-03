import axios from "axios";
import toast from "react-hot-toast";

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
      toast.error("Banned account");
    }
    return Promise.reject(error);
  }
);

export default apiClient;