// File: src/services/authService.js

import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

const register = (userData) => {
    return axios.post(API_URL + "register", userData);
};

// Fungsi BARU
const registerAdmin = (adminData) => {
    return axios.post(API_URL + "register-admin", adminData);
};

const login = (userData) => {
    return axios.post(API_URL + "login", userData).then((response) => {
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authService = {
    register,
    registerAdmin, // <-- Tambahkan ini
    login,
    logout,
    getCurrentUser,
};

export default authService;