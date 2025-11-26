
import { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Alert, Table, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import beritaService from '../services/beritaService';

const KelolaBerita = () => {
    const [list, setList] = useState([]);
    const [judul, setJudul] = useState('');
    const [isi, setIsi] = useState('');
    const [gambar, setGambar] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);

    const loadData = () => {
        beritaService.getAll()
            .then(res => setList(res.data.reverse()))
            .catch(() => setError("Gagal memuat data berita."));
    };

    useEffect(() => { loadData(); }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        if (!gambar) {
            setError("Anda harus memilih file gambar.");
            return;
        }

        const data = { judul, isi, gambar };
        
        beritaService.create(data)
            .then(() => {
                setMessage("Berita berhasil dipublikasikan!");
                setJudul('');
                setIsi('');
                setGambar(null);
                e.target.reset();
                loadData();
            })
            .catch(() => setError("Gagal mempublikasikan berita."));
    };
    
    const handleDelete = () => {
        beritaService.remove(idToDelete)
            .then(() => {
                setMessage("Berita berhasil dihapus.");
                loadData();
            })
            .catch(() => setError("Gagal menghapus berita."))
            .finally(() => handleCloseConfirm());
    };

    const handleShowConfirm = (id) => { setIdToDelete(id); setShowConfirm(true); };
    const handleCloseConfirm = () => { setShowConfirm(false); setIdToDelete(null); };

    return (
        <>
            <Row>
                <Col md={5}>
                    <Card className="dashboard-card">
                        <Card.Header as="h5">Tambah Berita Baru</Card.Header>
                        <Card.Body>
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Judul Berita</Form.Label>
                                    <Form.Control type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Isi Berita</Form.Label>
                                    <Form.Control as="textarea" rows={8} value={isi} onChange={(e) => setIsi(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Upload Gambar Utama</Form.Label>
                                    <Form.Control type="file" accept="image/*" onChange={(e) => setGambar(e.target.files[0])} required />
                                </Form.Group>
                                <Button variant="primary" type="submit">Publikasikan Berita</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7}>
                    <Card className="dashboard-card">
                        <Card.Header as="h5">Daftar Berita</Card.Header>
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
                {/* ... (Kode Modal Konfirmasi Hapus sama seperti KelolaKegiatan) ... */}
            </Modal>
        </>
    );
};

export default KelolaBerita;