// File: src/components/KelolaPengumuman.js

import { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert, Table, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import pengumumanService from '../services/pengumumanService';

const KelolaPengumuman = () => {
    const [list, setList] = useState([]);
    const [judul, setJudul] = useState('');
    const [isi, setIsi] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const loadData = () => {
        pengumumanService.getAll()
            .then(res => setList(res.data.reverse()))
            .catch(() => setError("Gagal memuat data pengumuman."));
    };

    useEffect(() => { loadData(); }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        pengumumanService.create({ judul, isi })
            .then(() => {
                setMessage("Pengumuman berhasil dipublikasikan!");
                setJudul('');
                setIsi('');
                loadData();
            })
            .catch(() => setError("Gagal mempublikasikan pengumuman."));
    };

    const handleDelete = () => {
        pengumumanService.remove(idToDelete)
            .then(() => {
                setMessage("Pengumuman berhasil dihapus.");
                loadData();
            })
            .catch(() => setError("Gagal menghapus pengumuman."))
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
                        <Card.Header as="h5">Buat Pengumuman Baru</Card.Header>
                        <Card.Body>
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Judul Pengumuman</Form.Label>
                                    <Form.Control type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Isi Pengumuman</Form.Label>
                                    <Form.Control as="textarea" rows={6} value={isi} onChange={(e) => setIsi(e.target.value)} required />
                                </Form.Group>
                                <Button variant="primary" type="submit">Publikasikan</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <Card className="dashboard-card">
                        <Card.Header as="h5">Daftar Pengumuman Aktif</Card.Header>
                        <Card.Body>
                            <Table striped bordered hover responsive>
                                <thead><tr><th>Judul</th><th>Tanggal</th><th>Aksi</th></tr></thead>
                                <tbody>
                                    {list.map(p => (
                                        <tr key={p.id}>
                                            <td>{p.judul}</td>
                                            <td>{new Date(p.tanggalDibuat).toLocaleDateString()}</td>
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
                <Modal.Body>Apakah Anda yakin ingin menghapus pengumuman ini?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirm}>Batal</Button>
                    <Button variant="danger" onClick={handleDelete}>Hapus</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default KelolaPengumuman;