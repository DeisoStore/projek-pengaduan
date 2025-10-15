// File: src/services/beritaService.js

import api from './api';
import authService from './authService';

const getAll = () => {
    return api.get("/berita");
};

const create = (beritaData) => {
    const currentUser = authService.getCurrentUser();
    const formData = new FormData();
    formData.append('judul', beritaData.judul);
    formData.append('isi', beritaData.isi);
    formData.append('gambar', beritaData.gambar);
    formData.append('penulis', currentUser.nama);

    return api.post("/berita", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

const remove = (id) => {
    return api.delete(`/berita/${id}`);
};

// --- FUNGSI BARU YANG PERLU DIEKSPOR ---
const getById = (id) => {
    return api.get(`/berita/${id}`);
};


const beritaService = {
    getAll,
    create,
    remove,
    getById, // <-- KESALAHAN SEBELUMNYA MUNGKIN KARENA BARIS INI HILANG
};

export default beritaService;