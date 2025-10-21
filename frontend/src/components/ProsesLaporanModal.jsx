

import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa'; 
import laporanService from '../services/laporanService';

const API_BASE_URL = "http://localhost:8080/api";

const ProsesLaporanModal = ({ show, handleClose, laporan, onUpdate }) => {
    const [feedbackDeskripsi, setFeedbackDeskripsi] = useState('');
    const [status, setStatus] = useState('DIPROSES');
    const [feedbackDokumen, setFeedbackDokumen] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (laporan) {
            setFeedbackDeskripsi(laporan.feedbackDeskripsi || '');
            setStatus(laporan.status === 'BARU' ? 'DIPROSES' : laporan.status);
            setFeedbackDokumen(null);
        }
    }, [laporan]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!feedbackDeskripsi) {
            setError('Deskripsi feedback tidak boleh kosong.');
            return;
        }

        const feedbackData = { feedbackDeskripsi, status, feedbackDokumen };

        laporanService.prosesLaporan(laporan.id, feedbackData)
            .then(() => {
                setSuccess('Feedback berhasil dikirim dan status laporan telah diupdate.');
                onUpdate();
                setTimeout(() => {
                    handleClose();
                    setSuccess('');
                }, 1500);
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
                    
                    <h5>Detail Laporan dari Pelapor</h5>
                    <p><strong>Pelapor:</strong> {laporan?.namaPelapor}</p>
                    <p><strong>Deskripsi:</strong> {laporan?.deskripsiLaporan}</p>
                    
                    {/* --- 3. Tombol BARU yang Muncul Secara Kondisional --- */}
                    {laporan?.dokumenNama && (
                        <div className="mb-3">
                            <Button variant="outline-secondary" size="sm" href={`${API_BASE_URL}/laporan/dokumen/${laporan.id}`} target="_blank">
                                <FaDownload className="me-2" /> Lihat Dokumen Pelapor
                            </Button>
                        </div>
                    )}

                    <hr />
                    
                    <h5>Tindak Lanjut Anda</h5>
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Feedback / Tindak Lanjut</strong></Form.Label>
                        <Form.Control as="textarea" rows={5} value={feedbackDeskripsi} onChange={(e) => setFeedbackDeskripsi(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Upload Dokumen/Gambar Tindak Lanjut (Opsional)</strong></Form.Label>
                        <Form.Control type="file" onChange={(e) => setFeedbackDokumen(e.target.files[0])} />
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