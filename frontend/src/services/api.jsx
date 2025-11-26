// File: src/services/api.js

import axios from 'axios';

// Gunakan environment variable saat online, atau localhost saat development
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    // headers default dihapus dulu, biar dihandle interceptor di bawah
});

// --- INTERCEPTOR (SATPAM OTOMATIS) ---
api.interceptors.request.use(
    (config) => {
        // 1. Ambil Data User dari LocalStorage
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString); 

        // --- UPDATE: LOGIC PENCARIAN TOKEN LEBIH PINTAR ---
        // Backend kadang menamakan ini 'accessToken', 'token', atau 'jwt'. Kita cek semuanya.
        const token = user?.accessToken || user?.token || user?.jwt;

        // --- DEBUGGING (Bisa dihapus nanti kalau sudah fix) ---
        if (user) {
            // Kita intip apa saja isi key yang ada di dalam user
            console.log("🔍 SATPAM MELIHAT ISI USER:", Object.keys(user)); 
            console.log("🔑 TOKEN YANG AKAN DIPAKAI:", token ? (token.substring(0, 10) + "...") : "KOSONG/UNDEFINED");
        } else {
            console.log("❌ SATPAM: User belum login (LocalStorage kosong)");
        }

        if (token) {
            // Tempelkan Token yang ditemukan ke Header
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // 2. Cek apakah yang dikirim adalah FormData (Upload File)?
        if (config.data instanceof FormData) {
            // Hapus header Content-Type agar browser otomatis mengisinya
            delete config.headers['Content-Type'];
        } else {
            // Jika bukan upload file, gunakan JSON biasa
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;