// File: src/services/laporanService.js

import api from './api';
import authService from './authService';

const API_URL = "/laporan"; // base URL sudah diatur di api.js

// Ambil semua laporan
const getAllLaporan = () => {
    return api.get(`${API_URL}/all`);
};

// Ambil laporan berdasarkan userId
const getLaporanByUserId = (userId) => {
    return api.get(`${API_URL}/user/${userId}`);
};

// Buat laporan baru
const createLaporan = (laporanData) => {
    const user = authService.getCurrentUser();
    if (!user) {
        return Promise.reject("Tidak ada user yang login!");
    }

    const dataToSend = {
        ...laporanData,
        userId: user.id, // kirim hanya ID user
    };

    return api.post(`${API_URL}/create`, dataToSend);
};

// Update status laporan
const updateLaporanStatus = (laporanId, newStatus) => {
    return api.put(`${API_URL}/update/status/${laporanId}`, { status: newStatus });
};

// Proses laporan (beri feedback dsb)
const prosesLaporan = (laporanId, feedbackData) => {
    return api.put(`${API_URL}/proses/${laporanId}`, feedbackData);
};

// Objek service tunggal
const laporanService = {
    getAllLaporan,
    getLaporanByUserId,
    createLaporan,
    updateLaporanStatus,
    prosesLaporan,
};

export default laporanService;
