// File: src/services/laporanService.js
import api from './api';

const getAllLaporan = () => { 
    return api.get("/laporan/all"); 
};

const getLaporanByUserId = (userId) => { 
    return api.get(`/laporan/user/${userId}`); 
};

// --- UPDATE UTAMA DI SINI ---
const createLaporan = (laporanData) => {
    // KITA TIDAK PERLU MEMBUAT NEW FORMDATA LAGI.
    // Karena FormLaporan.jsx sudah mengirimkan object FormData yang lengkap 
    // (berisi nama, email, alamat, lokasi, koordinat, file, dll).
    
    // Note: userId juga tidak perlu diappend manual lagi, 
    // karena Backend sekarang mengambil ID otomatis dari Token (Authentication).
    
    return api.post("/laporan/create", laporanData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

const prosesLaporan = (laporanId, feedbackData) => {
    // Kita cek dulu, apakah inputnya sudah FormData atau belum?
    let formData;
    
    if (feedbackData instanceof FormData) {
        formData = feedbackData;
    } else {
        // Jika masih object biasa, kita convert ke FormData (Logic lama)
        formData = new FormData();
        formData.append('feedbackDeskripsi', feedbackData.feedbackDeskripsi);
        formData.append('status', feedbackData.status);
        if (feedbackData.feedbackDokumen) {
            formData.append('feedbackDokumen', feedbackData.feedbackDokumen);
        }
    }

    return api.put(`/laporan/proses/${laporanId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

const laporanService = { 
    getAllLaporan, 
    getLaporanByUserId, 
    createLaporan, 
    prosesLaporan 
};

export default laporanService;