// File: src/components/SelesaikanLaporanModal.js

import { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import laporanService from '../services/laporanService';

const SelesaikanLaporanModal = ({ show, handleClose, laporan, onUpdate }) => {
    const [error, setError] = useState('');

    const handleSelesaikan = () => {
        setError('');

        // Siapkan data untuk dikirim ke backend.
        // Kita kirim kembali feedback yang sudah ada, hanya mengubah statusnya.
        const data = {
            feedbackDeskripsi: laporan.feedbackDeskripsi,
            status: 'SELESAI'
        };

        laporanService.prosesLaporan(laporan.id, data)
            .then(() => {
                handleClose(); // Tutup modal
                onUpdate();   // Refresh tabel di halaman utama
            })
            .catch(err => {
                setError('Gagal mengubah status laporan. Coba lagi.');
                console.error(err);
            });
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Konfirmasi Penyelesaian</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <p>Anda yakin ingin menandai laporan ID #{laporan?.id} tentang "<strong>{laporan?.kategoriLaporan}</strong>" sebagai **SELESAI**?</p>
                <p className="text-muted">Tindakan ini tidak dapat diurungkan.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Batal
                </Button>
                <Button variant="success" onClick={handleSelesaikan}>
                    Ya, Tandai Selesai
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SelesaikanLaporanModal;