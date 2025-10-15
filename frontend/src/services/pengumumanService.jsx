// File: src/services/pengumumanService.js

import api from './api';
import authService from './authService';

const getAll = () => {
    return api.get("/pengumuman");
};

// --- FUNGSI BARU ---
const create = (data) => {
    const currentUser = authService.getCurrentUser();
    // Sertakan nama admin yang membuat pengumuman
    const dataToSend = { ...data, pembuat: currentUser.nama };
    return api.post("/pengumuman", dataToSend);
};

// --- FUNGSI BARU ---
const remove = (id) => {
    return api.delete(`/pengumuman/${id}`);
};

const pengumumanService = {
    getAll,
    create,
    remove,
};

export default pengumumanService;