// File: src/components/LaporanSelesaiView.jsx

import { useState, useEffect, useCallback } from 'react';
import { Card, Accordion, Spinner, Alert, Badge } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';
import './LaporanSelesaiView.css'; // Import CSS baru

const LaporanSelesaiView = () => {
    const [laporanList, setLaporanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadLaporanSelesai = useCallback(() => {
        setError('');
        api.get("/laporan/all")
            .then(response => {
                const filteredLaporan = response.data.filter(l => l.status === 'SELESAI').reverse();
                setLaporanList(filteredLaporan);
                setLoading(false);
            })
            .catch(err => {
                console.error("Gagal memuat data laporan selesai:", err);
                setError("Gagal memuat data laporan.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        loadLaporanSelesai();
    }, [loadLaporanSelesai]);

    return (
        <Card>
            <Card.Header as="h5">Arsip Laporan Selesai</Card.Header>
            <Card.Body>
                {loading && <div className="text-center"><Spinner animation="border" /></div>}
                {error && <Alert variant="danger">{error}</Alert>}
                {!loading && !error && (
                    <Accordion className="accordion-selesai">
                        {laporanList.length > 0 ? (
                            laporanList.map((laporan) => (
                                <Accordion.Item eventKey={laporan.id.toString()} key={laporan.id}>
                                    <Accordion.Header>
                                        <div className="header-content">
                                            <div>
                                                <span className="kategori">{laporan.kategoriLaporan}</span>
                                                <span className="pelapor">(Pelapor: {laporan.namaPelapor})</span>
                                            </div>
                                            <div>
                                                <small className="text-muted me-3">
                                                    Diselesaikan pada: {new Date(laporan.tanggalLapor).toLocaleDateString('id-ID')}
                                                </small>
                                                <Badge bg="success" pill><FaCheckCircle className="me-1" /> Selesai</Badge>
                                            </div>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <h6>Detail Aduan Awal</h6>
                                        <p className="text-muted">{laporan.deskripsiLaporan}</p>
                                        <div className="feedback-section">
                                            <h6>Tindak Lanjut & Penyelesaian</h6>
                                            <p>{laporan.feedbackDeskripsi || "Tidak ada deskripsi feedback."}</p>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))
                        ) : (
                            <Alert variant="info">Belum ada laporan yang diselesaikan.</Alert>
                        )}
                    </Accordion>
                )}
            </Card.Body>
        </Card>
    );
};

export default LaporanSelesaiView;