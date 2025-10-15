// File: src/components/FormLaporan.js

import { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import authService from '../services/authService';
import laporanService from '../services/laporanService';

const FormLaporan = ({ onLaporanCreated }) => {
    const [namaPelapor, setNamaPelapor] = useState('');
    const [kategoriLaporan, setKategoriLaporan] = useState('');
    const [deskripsiLaporan, setDeskripsiLaporan] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        if (currentUser) {
            setNamaPelapor(currentUser.nama);
        }
    }, [currentUser]);

    const handleSubmitLaporan = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const laporanData = { namaPelapor, kategoriLaporan, deskripsiLaporan };

        try {
            await laporanService.createLaporan(laporanData);
            setMessage("Laporan berhasil dikirim! Anda bisa melihat progresnya di menu Riwayat Laporan.");
            setKategoriLaporan('');
            setDeskripsiLaporan('');
            if(onLaporanCreated) onLaporanCreated();
        } catch (err) {
            setError("Gagal membuat laporan. Pastikan semua field terisi.");
        }
    };

    return (
        <Card className="dashboard-card">
            <Card.Header as="h5">Formulir Pengaduan</Card.Header>
            <Card.Body>
                <p className="text-muted">Silakan isi formulir di bawah ini dengan detail yang jelas dan lengkap.</p>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmitLaporan}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Pelapor</Form.Label>
                        <Form.Control type="text" value={namaPelapor} readOnly disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Kategori Laporan</Form.Label>
                        <Form.Control type="text" placeholder="cth : Kehilangan Barang Import" value={kategoriLaporan} onChange={(e) => setKategoriLaporan(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Deskripsi Laporan</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="Jelaskan laporan Anda di sini..." value={deskripsiLaporan} onChange={(e) => setDeskripsiLaporan(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload Dokumen Pendukung (Opsional)</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <div className="d-grid">
                        <Button variant="primary" type="submit" size="lg">Kirim Laporan</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FormLaporan;