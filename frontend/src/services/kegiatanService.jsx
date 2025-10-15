// File: src/services/kegiatanService.js

import api from './api';

const getAll = () => {
    return api.get("/kegiatan");
};

// --- FUNGSI BARU UNTUK UPLOAD ---
const create = (kegiatanData) => {
    // FormData adalah cara standar untuk mengirim file dan data teks bersamaan
    const formData = new FormData();
    formData.append('judul', kegiatanData.judul);
    formData.append('deskripsi', kegiatanData.deskripsi);
    formData.append('tanggalKegiatan', kegiatanData.tanggalKegiatan);
    formData.append('gambar', kegiatanData.gambar);

    // Saat mengirim FormData, kita perlu mengatur header secara manual
    return api.post("/kegiatan", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

// --- FUNGSI BARU UNTUK MENGHAPUS ---
const remove = (id) => {
    return api.delete(`/kegiatan/${id}`);
};

const kegiatanService = {
    getAll,
    create,
    remove,
};

export default kegiatanService;