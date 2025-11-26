// File: src/components/GrafikLaporan.js
import { useState, useEffect } from 'react';
// Alert ditambahkan untuk notifikasi privasi
import { Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
// --- PERUBAHAN MULAI ---
// Menambahkan FaCircle untuk ikon bulat hijau
import { FaInfoCircle, FaCheckCircle, FaShieldAlt, FaCircle } from 'react-icons/fa';
// --- PERUBAHAN SELESAI ---
import laporanService from '../services/laporanService';
import authService from '../services/authService';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

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

                    const warnaDasar = ['#ffc107', '#0d6efd', '#198754'];

                    setChartData({
                        labels: ['Laporan Baru', 'Sedang Diproses', 'Telah Selesai'],
                        datasets: [
                            {
                                label: 'Jumlah Laporan',
                                data: [baruCount, prosesCount, selesaiCount],
                                backgroundColor: function(context) {
                                    const i = context.dataIndex;
                                    const chart = context.chart;
                                    const { ctx, chartArea } = chart;

                                    if (!chartArea) {
                                        return warnaDasar[i] || '#cccccc';
                                    }

                                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                                    if (i === 0) { // kuning
                                        gradient.addColorStop(0, 'rgba(255,193,7,0.6)');
                                        gradient.addColorStop(1, 'rgba(255,193,7,1)');
                                    } else if (i === 1) { // biru
                                        gradient.addColorStop(0, 'rgba(13,110,253,0.6)');
                                        gradient.addColorStop(1, 'rgba(13,110,253,1)');
                                    } else { // i === 2 -> hijau
                                        gradient.addColorStop(0, 'rgba(25,135,84,0.6)');
                                        gradient.addColorStop(1, 'rgba(25,135,84,1)');
                                    }
                                    return gradient;
                                },
                                borderRadius: 12,
                                borderSkipped: false,
                            }
                        ]
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Gagal memuat data grafik:", err);
                    setLoading(false);
                });
        }
    }, [currentUser]);

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.75)',
                padding: 8,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#6c757d', font: { size: 13, weight: '500' } },
            },
            y: {
                beginAtZero: true,
                ticks: { color: '#6c757d', stepSize: 1 },
                grid: { color: 'rgba(0,0,0,0.05)' },
            },
        },
        animation: {
            duration: 1200,
            easing: 'easeInOutElastic',
        },
    };

    if (loading) {
        return <div className="text-center p-5"><Spinner animation="border" /></div>;
    }

    // Ukuran ikon untuk bullet
    const bulletIconStyle = { fontSize: '0.65em', verticalAlign: 'middle' };

    return (
        <Card className="dashboard-card" style={{ maxWidth: '1500px', margin: '0 auto' }}>
            <Card.Header as="h5">📊 Ringkasan Aktivitas Anda</Card.Header>
            <Card.Body>
                {/* Baris untuk Grafik dan Ringkasan Status */}
                <Row className="align-items-center">
                    <Col md={6} className="mb-4 mb-md-0">
                        {chartData ? (
                            <Bar data={chartData} options={options} />
                        ) : (
                            <p>Tidak ada data untuk ditampilkan.</p>
                        )}
                    </Col>
                    <Col md={6}>
                        <h4>Status Laporan Anda</h4>
                        <p className="text-muted">Berikut rincian laporan yang telah Anda kirimkan.</p>
                        <div className="mt-3">
                            <p><strong><span className="badge bg-warning me-2">&nbsp;</span>Laporan Baru:</strong> {chartData?.datasets[0].data[0] || 0}</p>
                            <p><strong><span className="badge bg-primary me-2">&nbsp;</span>Sedang Diproses:</strong> {chartData?.datasets[0].data[1] || 0}</p>
                            <p><strong><span className="badge bg-success me-2">&nbsp;</span>Telah Selesai:</strong> {chartData?.datasets[0].data[2] || 0}</p>
                        </div>
                    </Col>
                </Row>

                {/* Pemisah visual */}
                <hr className="my-4" />

                {/* Notifikasi Privasi */}
                <Alert variant="info" className="text-center fw-bold">
                    <FaShieldAlt className="me-2" />
                    KAMI AKAN MERAHASIAKAN DATA ANDA !
                </Alert>

                {/* Baris untuk Informasi Pengaduan */}
                <Row className="mt-4">
                    <Col md={6} className="mb-3 mb-md-0">
                        <h5 className="fw-bold"><FaInfoCircle className="me-2 text-primary" />Isi Pengaduan</h5>
                        <p className="text-muted small">
                            Isikan data deskripsi pengaduan dengan lengkap dan detail yang minimal memenuhi kriteria:
                        </p>
                        {/* --- PERUBAHAN MULAI --- */}
                        <ul className="list-unstyled" style={{ paddingLeft: '0.5rem' }}>
                            <li className="mb-1">
                                <FaCircle className="text-success me-2" style={bulletIconStyle} /> 
                                <strong>What</strong> (hal apa yang diadukan)
                            </li>
                            <li className="mb-1">
                                <FaCircle className="text-success me-2" style={bulletIconStyle} /> 
                                <strong>Where</strong> (dimana lokasi kejadian)
                            </li>
                            <li className="mb-1">
                                <FaCircle className="text-success me-2" style={bulletIconStyle} /> 
                                <strong>When</strong> (perkiraan waktu kejadian)
                            </li>
                            <li className="mb-1">
                                <FaCircle className="text-success me-2" style={bulletIconStyle} /> 
                                <strong>Who</strong> (siapa yang melakukan)
                            </li>
                            <li className="mb-1">
                                <FaCircle className="text-success me-2" style={bulletIconStyle} /> 
                                <strong>How</strong> (Isi atau uraian pengaduan)
                            </li>
                        </ul>
                        {/* --- PERUBAHAN SELESAI --- */}
                    </Col>
                    <Col md={6}>
                        <h5 className="fw-bold"><FaCheckCircle className="me-2 text-success" />Konfirmasi Pengiriman</h5>
                        <p className="text-muted small">
                            Setelah mengisi data pengaduan di atas dengan lengkap dan benar, sekarang Anda sudah bisa mengirimkan ke sistem kami. Data di atas adalah data minimal sebuah pengaduan. Nantinya, setelah mengirimkan data di atas, Anda masih bisa menambah informasi seperti:
                        </p>
                        {/* --- PERUBAHAN MULAI --- */}
                        <ul className="list-unstyled" style={{ paddingLeft: '0.5rem' }}>
                            <li className="mb-1">
                                <FaCircle className="text-success me-2" style={bulletIconStyle} /> 
                                Lampiran file (foto / bukti lain)
                            </li>
                            <li className="mb-1">
                                <FaCircle className="text-success me-2" style={bulletIconStyle} /> 
                                Informasi tambahan lainnya
                            </li>
                            <li className="mb-1">
                                <FaCircle className="text-success me-2" style={bulletIconStyle} /> 
                                Data Petugas Bea Cukai terlapor
                            </li>
                        </ul>
                        {/* --- PERUBAHAN SELESAI --- */}
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    );
};

export default GrafikLaporan;