// File: src/pages/BeritaPage.js
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import beritaService from '../services/beritaService';
import { Link } from 'react-router-dom';
import './BeritaPage.css'; 

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
        if (!base64Data) return 'https://via.placeholder.com/400x250';
        return `data:image/jpeg;base64,${base64Data}`;
    };

    return (
        <div className="berita-wrapper">
            <Container className="py-5">
                <div className="text-center mb-5 fade-in">
                    <h1 className="fw-bold text-dark">Berita & Informasi Terkini</h1>
                    <p className="lead text-muted">Ikuti perkembangan terbaru dan informasi penting dari kami.</p>
                </div>

                {loading && <div className="text-center"><Spinner animation="border" variant="primary" /></div>}
                {error && <Alert variant="danger">{error}</Alert>}

                {!loading && !error && (
                    <>
                        {/* Highlight berita pertama */}
                        {list.length > 0 && (
                            <Card className="featured-news mb-5 shadow-lg border-0">
                                <Row className="g-0 align-items-center">
                                    <Col md={6}>
                                        <Card.Img
                                            src={getImageSrc(list[0].gambar)}
                                            className="featured-img"
                                            alt={list[0].judul}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Card.Body className="p-4">
                                            <h2 className="fw-bold mb-3">{list[0].judul}</h2>
                                            <p className="text-justify text-muted">
                                                {list[0].isi.substring(0, 200)}...
                                            </p>
                                            <Link to={`/berita/${list[0].id}`} className="btn btn-primary rounded-pill px-4">
                                                Baca Selengkapnya
                                            </Link>
                                            <div className="mt-3 text-secondary small">
                                                Dipublikasikan oleh <strong>{list[0].penulis || 'Admin'}</strong> pada {new Date(list[0].tanggalDibuat).toLocaleDateString('id-ID')}
                                            </div>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Card>
                        )}

                        <Row className="fade-in">
                            {list.length > 1 ? list.slice(1).map((item) => (
                                <Col md={6} lg={4} className="mb-4" key={item.id}>
                                    <Card className="news-card h-100 border-0 shadow-sm">
                                        <div className="img-hover">
                                            <Card.Img
                                                variant="top"
                                                src={getImageSrc(item.gambar)}
                                                alt={item.judul}
                                            />
                                        </div>
                                        <Card.Body className="d-flex flex-column">
                                            <Card.Title as="h5" className="fw-bold mb-2">{item.judul}</Card.Title>
                                            <Card.Text className="text-muted flex-grow-1 text-justify">
                                                {item.isi.substring(0, 120)}...
                                            </Card.Text>
                                            <Link to={`/berita/${item.id}`} className="btn btn-outline-primary mt-auto rounded-pill">
                                                Baca Selengkapnya
                                            </Link>
                                        </Card.Body>
                                        <Card.Footer className="bg-white border-0 small text-muted">
                                            Dipublikasikan oleh <strong>{item.penulis || 'Admin'}</strong><br />
                                            {new Date(item.tanggalDibuat).toLocaleDateString('id-ID')}
                                        </Card.Footer>a
                                    </Card>
                                </Col>
                            )) : (
                                <Col><Alert variant="info" className="text-center">Belum ada berita lain saat ini.</Alert></Col>
                            )}
                        </Row>
                    </>
                )}
            </Container>
        </div>
    );
};

export default BeritaPage;
