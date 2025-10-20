// File: src/components/FormLaporan.jsx
import { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';
import authService from '../services/authService';
import laporanService from '../services/laporanService';

const FormLaporan = ({ onLaporanCreated }) => {
    const [kategoriLaporan, setKategoriLaporan] = useState('');
    const [deskripsiLaporan, setDeskripsiLaporan] = useState('');
    const [dokumen, setDokumen] = useState(null); // State baru untuk file
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmitLaporan = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const laporanData = { kategoriLaporan, deskripsiLaporan, dokumen }; // Sertakan file

        try {
            await laporanService.createLaporan(laporanData);
            setMessage("Laporan berhasil dikirim!");
            setKategoriLaporan('');
            setDeskripsiLaporan('');
            setDokumen(null);
            e.target.reset(); // Membersihkan input file
            if(onLaporanCreated) onLaporanCreated();
        } catch (err) {
            setError("Gagal membuat laporan. Pastikan semua field terisi.");
        }
    };

    return (
        <Card className="dashboard-card">
            <Card.Header as="h5" className="d-flex align-items-center">
                <FaPaperPlane className="me-2" /> Formulir Pengaduan
            </Card.Header>
            <Card.Body>
                <p className="text-muted">
                    Silakan isi formulir di bawah ini dengan detail yang jelas dan lengkap.
                </p>
                <hr />
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmitLaporan}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Kategori Laporan</Form.Label>
                        <Form.Control type="text" placeholder="Contoh: Pelayanan Petugas..." value={kategoriLaporan} onChange={(e) => setKategoriLaporan(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Deskripsi Laporan</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Jelaskan secara rinci..." value={deskripsiLaporan} onChange={(e) => setDeskripsiLaporan(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Upload Dokumen Pendukung (Opsional)</Form.Label>
                        <Form.Control type="file" onChange={(e) => setDokumen(e.target.files[0])} />
                        <Form.Text className="text-muted">
                            Anda dapat melampirkan file gambar atau PDF (Maks: 10MB).
                        </Form.Text>
                    </Form.Group>
                    <div className="d-grid mt-4">
                        <Button variant="primary" type="submit" size="lg">Kirim Laporan</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FormLaporan;