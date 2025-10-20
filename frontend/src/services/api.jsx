// File: src/services/api.js

import axios from 'axios';

// Gunakan environment variable saat online, atau localhost saat development
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`, // Gabungkan base URL dengan /api
    withCredentials: true
});

export default api;