// utils/axiosInstance.js
import axios from 'axios';

// Replace with your actual base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api', // Base URL for your API
});

export default axiosInstance;
