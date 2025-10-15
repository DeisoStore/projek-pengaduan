// File: src/components/RiwayatLaporan.js

import { useState, useEffect } from 'react';
import { Card, Accordion, Spinner, Alert, Button } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';
import laporanService from '../services/laporanService';
import authService from '../services/authService';
import './RiwayatLaporan.css'; // Import file CSS baru kita

const RiwayatLaporan = () => {
    const [laporanList, setLaporanList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        if (currentUser) {
            laporanService.getLaporanByUserId(currentUser.id)
                .then(response => {
                    setLaporanList(response.data.reverse()); // Tampilkan yg terbaru di atas
                    setLoading(false);
                })
                .catch(err => {
                    setError("Gagal memuat riwayat laporan.");
                    setLoading(false);
                    console.error(err);
                });
        }
    }, [currentUser]);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'BARU': return 'warning';
            case 'DIPROSES': return 'primary';
            case 'SELESAI': return 'success';
            default: return 'secondary';
        }
    };

    return (
        <Card className="dashboard-card">
            <Card.Header as="h5">Riwayat Laporan Anda</Card.Header>
            <Card.Body>
                {loading && <div className="text-center p-5"><Spinner animation="border" /></div>}
                {error && <Alert variant="danger">{error}</Alert>}
                {!loading && !error && (
                    <Accordion defaultActiveKey={laporanList.length > 0 ? laporanList[0].id.toString() : '0'}>
                        {laporanList.length > 0 ? (
                            laporanList.map((laporan) => (
                                <Accordion.Item eventKey={laporan.id.toString()} key={laporan.id}>
                                    <Accordion.Header>
                                        <div className="accordion-header-custom">
                                            <div>
                                                <span className="report-title">{laporan.kategoriLaporan}</span>
                                                <span className="report-date">
                                                    ({new Date(laporan.tanggalLapor).toLocaleDateString('id-ID')})
                                                </span>
                                            </div>
                                            <span className={`badge bg-${getStatusBadge(laporan.status)}`}>
                                                {laporan.status}
                                            </span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className="detail-section">
                                            <h6>Detail Laporan Anda</h6>
                                            <p>{laporan.deskripsiLaporan}</p>
                                        </div>
                                        <div className="detail-section">
                                            <h6>Tindak Lanjut dari Petugas</h6>
                                            {laporan.feedbackDeskripsi ? (
                                                <p>{laporan.feedbackDeskripsi}</p>
                                            ) : (
                                                <p className="text-muted"><i>Belum ada feedback dari admin.</i></p>
                                            )}

                                            {/* Tampilkan tombol download jika ada URL dokumen */}
                                            {laporan.feedbackDokumenUrl && (
                                                <Button variant="outline-primary" size="sm" href={laporan.feedbackDokumenUrl} target="_blank">
                                                    <FaDownload className="me-2" /> Lihat Dokumen Lampiran
                                                </Button>
                                            )}
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))
                        ) : (
                            <Alert variant="info">Anda belum pernah membuat laporan.</Alert>
                        )}
                    </Accordion>
                )}
            </Card.Body>
        </Card>
    );
};

export default RiwayatLaporan;