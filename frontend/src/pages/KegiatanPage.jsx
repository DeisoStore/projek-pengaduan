import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import kegiatanService from '../services/kegiatanService';
import './KegiatanPage.css'; // <-- 1. Impor file CSS baru

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
        return `data:image/jpeg;base64,${base64Data}`;
    };

    // 2. Fungsi untuk memotong teks agar rapi (Profesional)
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    // 3. URL Gambar placeholder jika tidak ada gambar
    const placeholderImage = "https://via.placeholder.com/400x200.png?text=Kegiatan";

    return (
        <Container className="my-5">
                 {/* Header halaman yang lebih profesional dan menarik */}
                <div className="text-center p-4 p-md-5 mb-4 rounded-3 bg-light">
                    <h1 className="display-4 fw-bold">Dokumentasi Kegiatan</h1>
                    <p className="fs-5 text-muted">
                        Momen-momen penting dari berbagai kegiatan yang telah kami laksanakan.
                    </p>
                </div>


            {loading && <div className="text-center"><Spinner animation="border" /></div>}
            {error && <Alert variant="danger">{error}</Alert>}

            {!loading && !error && (
                // 5. Tambahkan class untuk animasi fade-in
                <Row className="kegiatan-row">
                    {list.length > 0 ? list.map((item) => (
                        <Col md={6} lg={4} className="mb-4" key={item.id}>
                            {/* 6. Tambahkan class CSS kustom pada Card */}
                            <Card className="h-100 shadow-sm kegiatan-card">
                                <Card.Img
                                    variant="top"
                                    // 7. Gunakan placeholder jika gambar tidak ada
                                    src={getImageSrc(item.gambar) || placeholderImage}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body>
                                    <Card.Title className="fw-bold">{item.judul}</Card.Title>
                                    {/* 8. Gunakan fungsi truncate dan hapus style inline */}
                                    <Card.Text>
                                        {truncateText(item.deskripsi, 150)}
                                    </Card.Text>
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