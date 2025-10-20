// File: src/pages/PengumumanPage.js
import { useState, useEffect } from 'react';
import { Container, Accordion, Spinner, Alert } from 'react-bootstrap';
import pengumumanService from '../services/pengumumanService';

const PengumumanPage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        pengumumanService.getAll()
            .then(res => {
                setList(res.data.reverse());
                setLoading(false);
            })
            .catch(() => {
                setError("Tidak dapat mengambil data pengumuman dari server.");
                setLoading(false);
            });
    }, []);

    return (
        <Container className="my-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold">Papan Pengumuman Digital</h1>
                <p className="lead text-muted">Informasi dan pengumuman resmi terbaru dari Bea Cukai.</p>
            </div>

            {loading && <div className="text-center"><Spinner animation="border" /></div>}
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && !error && (
                <Accordion defaultActiveKey="0">
                    {list.length > 0 ? list.map((item, index) => (
                        <Accordion.Item eventKey={index.toString()} key={item.id}>
                            <Accordion.Header>
                                <div className="d-flex justify-content-between w-100 me-2">
                                    <strong>{item.judul}</strong>
                                    <small className="text-muted">
                                        {new Date(item.tanggalDibuat).toLocaleDateString('id-ID', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </small>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body style={{ whiteSpace: 'pre-wrap', textAlign: 'justify' }}>
                                {item.isi}
                            </Accordion.Body>
                        </Accordion.Item>
                    )) : (
                        <p className="text-center">Belum ada pengumuman saat ini.</p>
                    )}
                </Accordion>
            )}
        </Container>
    );
};

export default PengumumanPage;
