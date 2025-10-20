import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Spinner, Alert, Row, Col } from 'react-bootstrap';
import beritaService from '../services/beritaService';
import './BeritaDetailPage.css';

const BeritaDetailPage = () => {
    const { id } = useParams();
    const [berita, setBerita] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        beritaService.getById(id)
            .then(res => {
                setBerita(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Berita tidak ditemukan atau server bermasalah.");
                setLoading(false);
            });
    }, [id]);

    const getImageSrc = (base64Data) => {
        if (!base64Data) return 'https://via.placeholder.com/900x500';
        return `data:image/jpeg;base64,${base64Data}`;
    };

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>;
    if (error) return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;

    return (
        <div className="berita-detail-wrapper py-5">
            <Container>
                <Row className="justify-content-center fade-in">
                    <Col lg={9}>
                        <h1 className="fw-bold mb-3 text-dark display-5">{berita.judul}</h1>
                        <div className="text-muted mb-3">
                            <span>Dipublikasikan oleh </span>
                            <strong>{berita.penulis || 'Admin'}</strong>
                            <span> • {new Date(berita.tanggalDibuat).toLocaleDateString('id-ID')}</span>
                        </div>

                        <div className="news-image mb-4">
                            <img
                                src={getImageSrc(berita.gambar)}
                                alt={berita.judul}
                                className="img-fluid rounded-4 shadow-sm w-100"
                            />
                        </div>

                        <div className="berita-content text-justify">
                            <p dangerouslySetInnerHTML={{ __html: berita.isi.replace(/\n/g, '<br/>') }} />
                        </div>

                        <hr className="my-5" />
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/berita" className="btn btn-outline-primary rounded-pill px-4">
                                ← Kembali ke Daftar Berita
                            </Link>
                            <div className="share-info text-secondary small">
                                <i className="bi bi-share-fill me-2"></i>Bagikan artikel ini
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BeritaDetailPage;
