import axios from "axios";

const axiosInstance = axios.create({baseURL: "http://localhost:2104"});

export default axiosInstance;
