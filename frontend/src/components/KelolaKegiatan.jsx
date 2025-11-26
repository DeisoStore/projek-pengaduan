// File: src/components/KelolaKegiatan.jsx

import { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert, Table, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import kegiatanService from '../services/kegiatanService';

const KelolaKegiatan = () => {
    const [list, setList] = useState([]);
    const [judul, setJudul] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [tanggalKegiatan, setTanggalKegiatan] = useState('');
    const [gambar, setGambar] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    // --- FUNGSI YANG HILANG SEBELUMNYA ---
    const loadData = () => {
        kegiatanService.getAll()
            .then(res => setList(res.data.reverse()))
            .catch(() => setError("Gagal memuat data kegiatan."));
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!gambar) {
            setError("Anda harus memilih file gambar.");
            return;
        }

        const data = { judul, deskripsi, tanggalKegiatan, gambar };
        
        kegiatanService.create(data)
            .then(() => {
                setMessage("Kegiatan berhasil ditambahkan!");
                setJudul('');
                setDeskripsi('');
                setTanggalKegiatan('');
                setGambar(null);
                e.target.reset(); // Membersihkan input file
                loadData(); // Memanggil fungsi loadData yang sudah ada
            })
            .catch(() => setError("Gagal menambahkan kegiatan. Periksa kembali semua input."));
    };
    
    // --- FUNGSI UNTUK MENGHAPUS ---
    const handleDelete = () => {
        kegiatanService.remove(idToDelete)
            .then(() => {
                setMessage("Kegiatan berhasil dihapus.");
                loadData();
            })
            .catch(() => setError("Gagal menghapus kegiatan."))
            .finally(() => handleCloseConfirm());
    };

    const handleShowConfirm = (id) => {
        setIdToDelete(id);
        setShowConfirm(true);
    };

    const handleCloseConfirm = () => {
        setShowConfirm(false);
        setIdToDelete(null);
    };

    return (
        <>
            <Row>
                <Col md={5}>
                    <Card className="dashboard-card">
                        <Card.Header as="h5">Tambah Kegiatan Baru</Card.Header>
                        <Card.Body>
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Judul Kegiatan</Form.Label>
                                    <Form.Control type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tanggal & Waktu</Form.Label>
                                    <Form.Control type="datetime-local" value={tanggalKegiatan} onChange={(e) => setTanggalKegiatan(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Deskripsi Singkat</Form.Label>
                                    <Form.Control as="textarea" rows={4} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Upload Gambar</Form.Label>
                                    <Form.Control type="file" accept="image/*" onChange={(e) => setGambar(e.target.files[0])} required />
                                </Form.Group>
                                <Button variant="primary" type="submit">Simpan Kegiatan</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <Card className="dashboard-card">
                        <Card.Header as="h5">Daftar Kegiatan</Card.Header>
                        <Card.Body>
                             <Table striped bordered hover responsive>
                                <thead><tr><th>Judul</th><th>Tanggal</th><th>Aksi</th></tr></thead>
                                <tbody>
                                    {list.map(p => (
                                        <tr key={p.id}>
                                            <td>{p.judul}</td>
                                            <td>{new Date(p.tanggalKegiatan).toLocaleDateString()}</td>
                                            <td><Button variant="danger" size="sm" onClick={() => handleShowConfirm(p.id)}><FaTrash /></Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={showConfirm} onHide={handleCloseConfirm} centered>
                <Modal.Header closeButton><Modal.Title>Konfirmasi Hapus</Modal.Title></Modal.Header>
                <Modal.Body>Apakah Anda yakin ingin menghapus kegiatan ini?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>Batal</Button>
                    <Button variant="danger" onClick={handleDelete}>Hapus</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default KelolaKegiatan;