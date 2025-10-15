// File: src/components/GrafikLaporan.js

import { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import laporanService from '../services/laporanService';
import authService from '../services/authService';

ChartJS.register(ArcElement, Tooltip, Legend);

const GrafikLaporan = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const currentUser = authService.getCurrentUser();

    useEffect(() => {
        if (currentUser) {
            laporanService.getLaporanByUserId(currentUser.id)
                .then(response => {
                    const laporan = response.data;
                    const prosesCount = laporan.filter(l => l.status === 'DIPROSES').length;
                    const selesaiCount = laporan.filter(l => l.status === 'SELESAI').length;
                    const baruCount = laporan.filter(l => l.status === 'BARU').length;

                    setChartData({
                        labels: ['Laporan Baru', 'Sedang Diproses', 'Telah Selesai'],
                        datasets: [{
                            data: [baruCount, prosesCount, selesaiCount],
                            backgroundColor: ['#ffc107', '#0d6efd', '#198754'],
                            borderColor: ['#fff', '#fff', '#fff'],
                            borderWidth: 2,
                        }]
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Gagal memuat data grafik:", err);
                    setLoading(false);
                });
        }
    }, [currentUser]);

    if (loading) {
        return <div className="text-center p-5"><Spinner animation="border" /></div>;
    }

    return (
        <Card className="dashboard-card">
            <Card.Header as="h5">Ringkasan Aktivitas Anda</Card.Header>
            <Card.Body>
                <Row className="align-items-center">
                    <Col md={5} className="mb-4 mb-md-0">
                        {chartData ? <Doughnut data={chartData} /> : <p>Tidak ada data untuk ditampilkan.</p>}
                    </Col>
                    <Col md={7}>
                        <h4>Status Laporan Anda</h4>
                        <p className="text-muted">Berikut adalah rincian dari semua laporan yang telah Anda kirimkan.</p>
                        <div className="mt-3">
                            <p><strong><span className="badge bg-warning me-2">&nbsp;</span>Laporan Baru:</strong> {chartData?.datasets[0].data[0] || 0}</p>
                            <p><strong><span className="badge bg-primary me-2">&nbsp;</span>Sedang Diproses:</strong> {chartData?.datasets[0].data[1] || 0}</p>
                            <p><strong><span className="badge bg-success me-2">&nbsp;</span>Telah Selesai:</strong> {chartData?.datasets[0].data[2] || 0}</p>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default GrafikLaporan;