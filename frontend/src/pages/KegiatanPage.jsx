// File: src/pages/KegiatanPage.js

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import kegiatanService from '../services/kegiatanService';

const KegiatanPage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        kegiatanService.getAll()
            .then(res => {
                setList(res.data.reverse());
                setLoading(false);
            })
            .catch(() => {
                setError("Tidak dapat mengambil data kegiatan dari server.");
                setLoading(false);
            });
    }, []);

    // Fungsi untuk mengubah byte array (Base64) menjadi URL gambar
    const getImageSrc = (base64Data) => {
        if (!base64Data) return null;
        // Jackson (di Spring) otomatis mengubah byte[] menjadi string Base64
        return `data:image/jpeg;base64,${base64Data}`;
    };

    return (
        <Container className="my-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold">Dokumentasi Kegiatan</h1>
                <p className="lead text-muted">Momen-momen penting dari berbagai kegiatan yang telah kami laksanakan.</p>
            </div>

            {loading && <div className="text-center"><Spinner animation="border" /></div>}
            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
                <Row>
                    {list.length > 0 ? list.map((item) => (
                        <Col md={6} lg={4} className="mb-4" key={item.id}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img variant="top" src={getImageSrc(item.gambar)} style={{ height: '200px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title className="fw-bold">{item.judul}</Card.Title>
                                    <Card.Text>{item.deskripsi}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">
                                        {new Date(item.tanggalKegiatan).toLocaleDateString('id-ID', {
                                            year: 'numeric', month: 'long', day: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )) : (
                        <Col><p className="text-center">Belum ada dokumentasi kegiatan saat ini.</p></Col>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default KegiatanPage;