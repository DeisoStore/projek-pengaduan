// File: src/pages/BeritaDetailPage.jsx

import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Image } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import beritaService from '../services/beritaService';

const BeritaDetailPage = () => {
    const [berita, setBerita] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams(); // Gets the ID from the URL (e.g., /berita/5)

    useEffect(() => {
        beritaService.getById(id)
            .then(res => {
                setBerita(res.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Tidak dapat memuat detail berita.");
                setLoading(false);
            });
    }, [id]);

    const getImageSrc = (base64Data) => {
        if (!base64Data) return 'https://via.placeholder.com/800x400';
        return `data:image/jpeg;base64,${base64Data}`;
    };

    if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;
    if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <article>
                        <header className="mb-4">
                            <h1 className="fw-bolder mb-1">{berita.judul}</h1>
                            <div className="text-muted fst-italic mb-2">
                                Dipublikasikan pada {new Date(berita.tanggalDibuat).toLocaleDateString('id-ID', { dateStyle: 'full' })} oleh {berita.penulis}
                            </div>
                        </header>
                        <figure className="mb-4">
                            <Image src={getImageSrc(berita.gambar)} className="img-fluid rounded" />
                        </figure>
                        <section className="mb-5" style={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            <p>{berita.isi}</p>
                        </section>
                        <Link to="/berita" className="btn btn-outline-primary">← Kembali ke Daftar Berita</Link>
                    </article>
                </Col>
            </Row>
        </Container>
    );
};

export default BeritaDetailPage;