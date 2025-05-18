import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true,

})
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
      console.log("Attaching token to request:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // ✅ send token as Bearer
    }
    return config;
  },
  (error) => Promise.reject(error)
);



export default axiosInstance