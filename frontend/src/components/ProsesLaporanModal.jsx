// File: src/components/ProsesLaporanModal.js

import { useState, useEffect } from 'react'; // Tambahkan useEffect
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import laporanService from '../services/laporanService';

const ProsesLaporanModal = ({ show, handleClose, laporan, onUpdate }) => {
    // State untuk form
    const [feedbackDeskripsi, setFeedbackDeskripsi] = useState('');
    const [status, setStatus] = useState('DIPROSES');

    // State untuk notifikasi
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // --- INI BAGIAN BARU YANG MEMBUATNYA PINTAR ---
    // useEffect akan berjalan setiap kali 'laporan' yang dipilih berubah
    useEffect(() => {
        if (laporan) {
            // Isi form dengan data yang sudah ada dari laporan
            setFeedbackDeskripsi(laporan.feedbackDeskripsi || ''); // Gunakan feedback lama atau string kosong
            setStatus(laporan.status === 'BARU' ? 'DIPROSES' : laporan.status); // Set status ke 'DIPROSES' jika baru, atau status saat ini jika sudah diproses
        }
    }, [laporan]); // Pemicunya adalah prop 'laporan'

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!feedbackDeskripsi) {
            setError('Deskripsi feedback tidak boleh kosong.');
            return;
        }

        const feedbackData = { feedbackDeskripsi, status };

        laporanService.prosesLaporan(laporan.id, feedbackData)
            .then(() => {
                setSuccess('Feedback berhasil dikirim dan status laporan telah diupdate.');
                onUpdate();
                setTimeout(() => {
                    handleClose();
                    setSuccess('');
                }, 1500); // Beri waktu 1.5 detik untuk membaca pesan sukses
            })
            .catch(err => {
                setError('Gagal mengirim feedback. Coba lagi.');
                console.error(err);
            });
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Proses / Update Laporan ID: #{laporan?.id}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <h5>Detail Laporan</h5>
                    <p><strong>Pelapor:</strong> {laporan?.namaPelapor}</p>
                    <p><strong>Deskripsi:</strong> {laporan?.deskripsiLaporan}</p>
                    <hr />

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Feedback / Tindak Lanjut</strong></Form.Label>
                        <Form.Control as="textarea" rows={5} value={feedbackDeskripsi} onChange={(e) => setFeedbackDeskripsi(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Upload Dokumen/Gambar (Opsional)</strong></Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label><strong>Ubah Status Laporan</strong></Form.Label>
                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="DIPROSES">Diproses</option>
                            <option value="SELESAI">Selesai</option>
                        </Form.Select>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Batal</Button>
                    <Button variant="primary" type="submit">Kirim Feedback & Update Status</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ProsesLaporanModal;