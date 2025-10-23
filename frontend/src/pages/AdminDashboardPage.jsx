import { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FaInbox, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import LaporanTable from '../components/LaporanTable';
import RegisterAdminForm from '../components/RegisterAdminForm';
import KelolaPengumuman from '../components/KelolaPengumuman';
import KelolaKegiatan from '../components/KelolaKegiatan';
import StatCard from '../components/StatCard';
import LaporanSelesaiView from '../components/LaporanSelesaiView'; 
import laporanService from '../services/laporanService';
import './AdminDashboard.css';
import KelolaBerita from '../components/KelolaBerita';

const AdminDashboardPage = () => {
    const [laporanCounts, setLaporanCounts] = useState({ baru: 0, proses: 0, selesai: 0 });

    const refreshStatistics = () => {
        laporanService.getAllLaporan()
            .then(response => {
                const counts = {
                    baru: response.data.filter(l => l.status === 'BARU').length,
                    proses: response.data.filter(l => l.status === 'DIPROSES').length,
                    selesai: response.data.filter(l => l.status === 'SELESAI').length,
                };
                setLaporanCounts(counts);
            })
            .catch(err => console.error("Gagal refresh statistik:", err));
    };

    useEffect(() => {
        refreshStatistics();
    }, []);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-4 admin-dashboard">
                <div className="mb-4">
                    <h2>Portal Admin</h2>
                    <p className="text-muted">Selamat datang, kelola sistem pengaduan berbasis online.</p>
                </div>
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<Navigate to="masuk" replace />} />

                        <Route path="masuk" element={
                            <>
                                <Row className="mb-4">
                                    <StatCard title="Laporan Baru Masuk" value={laporanCounts.baru} icon={<FaInbox />} bgColor="#ff6347" />
                                    <StatCard title="Sedang Diproses" value={laporanCounts.proses} icon={<FaSpinner />} bgColor="#0d6efd" />
                                    <StatCard title="Laporan Selesai" value={laporanCounts.selesai} icon={<FaCheckCircle />} bgColor="#4F7942" />
                                </Row>
                                <LaporanTable status="BARU" title="Tabel Laporan Masuk" onUpdate={refreshStatistics} />
                            </>
                        } />

                        <Route path="proses" element={<LaporanTable status="DIPROSES" title="Tabel Laporan Diproses" onUpdate={refreshStatistics} />} />
                        <Route path="selesai" element={<LaporanSelesaiView />} />
                        <Route path="berita" element={<KelolaBerita />} />
                        <Route path="kegiatan" element={<KelolaKegiatan />} />
                        <Route path="pengumuman" element={<KelolaPengumuman />} />
                        <Route path="register-admin" element={<RegisterAdminForm />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;