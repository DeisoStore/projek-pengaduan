// File: src/services/laporanService.js
import api from './api';
import authService from './authService';

const getAllLaporan = () => { return api.get("/laporan/all"); };
const getLaporanByUserId = (userId) => { return api.get(`/laporan/user/${userId}`); };

const createLaporan = (laporanData) => {
    const user = authService.getCurrentUser();
    if (!user) return Promise.reject("Tidak ada user yang login!");

    const formData = new FormData();
    formData.append('kategoriLaporan', laporanData.kategoriLaporan);
    formData.append('deskripsiLaporan', laporanData.deskripsiLaporan);
    formData.append('userId', user.id);
    if (laporanData.dokumen) {
        formData.append('dokumen', laporanData.dokumen);
    }

    return api.post("/laporan/create", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

const prosesLaporan = (laporanId, feedbackData) => {
    const formData = new FormData();
    formData.append('feedbackDeskripsi', feedbackData.feedbackDeskripsi);
    formData.append('status', feedbackData.status);
    if (feedbackData.feedbackDokumen) {
        formData.append('feedbackDokumen', feedbackData.feedbackDokumen);
    }

    return api.put(`/laporan/proses/${laporanId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

const laporanService = { getAllLaporan, getLaporanByUserId, createLaporan, prosesLaporan };
export default laporanService;  