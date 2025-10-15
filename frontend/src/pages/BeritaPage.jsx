// File: src/pages/BeritaPage.js

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import beritaService from '../services/beritaService';
import { Link } from 'react-router-dom';
const BeritaPage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        beritaService.getAll()
            .then(res => {
                setList(res.data.reverse());
                setLoading(false);
            })
            .catch(() => {
                setError("Tidak dapat mengambil data berita dari server.");
                setLoading(false);
            });
    }, []);

    const getImageSrc = (base64Data) => {
        if (!base64Data) return 'https://via.placeholder.com/400x250'; // Gambar placeholder jika tidak ada
        return `data:image/jpeg;base64,${base64Data}`;
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa' }}>
            <Container className="py-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold">Berita & Informasi Terkini</h1>
                    <p className="lead text-muted">Ikuti perkembangan terbaru dan informasi penting dari kami.</p>
                </div>

                {loading && <div className="text-center"><Spinner animation="border" /></div>}
                {error && <Alert variant="danger">{error}</Alert>}

                {!loading && !error && (
                    <Row>
                        {list.length > 0 ? list.map((item) => (
                            <Col md={6} lg={4} className="mb-4" key={item.id}>
                                <Card className="h-100 shadow-sm border-0">
                                    <Card.Img variant="top" src={getImageSrc(item.gambar)} style={{ height: '200px', objectFit: 'cover' }} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title as="h5" className="fw-bold">{item.judul}</Card.Title>
                                        <Card.Text className="text-muted flex-grow-1">
                                            {/* Potong isi berita agar tidak terlalu panjang */}
                                            {item.isi.substring(0, 100)}...
                                        </Card.Text>
                                        <Link to={`/berita/${item.id}`} className="btn btn-outline-primary mt-auto align-self-start">Baca Selengkapnya</Link>
                                    </Card.Body>
                                    <Card.Footer className="bg-white border-0">
                                        <small className="text-muted">
                                            Dipublikasikan oleh <strong>{item.penulis || 'Admin'}</strong> pada {new Date(item.tanggalDibuat).toLocaleDateString('id-ID')}
                                        </small>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )) : (
                            <Col><Alert variant="info" className="text-center">Belum ada berita yang dipublikasikan saat ini.</Alert></Col>
                        )}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default BeritaPage;