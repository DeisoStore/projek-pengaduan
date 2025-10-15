// File: src/pages/UserDashboardPage.js

import { Routes, Route, Navigate } from 'react-router-dom';

// Import komponen
import UserSidebar from '../components/UserSidebar';
import GrafikLaporan from '../components/GrafikLaporan';
import FormLaporan from '../components/FormLaporan';
import RiwayatLaporan from '../components/RiwayatLaporan';

// Import service dan CSS
import authService from '../services/authService';
import './UserDashboard.css'; // Import CSS baru

const UserDashboardPage = () => {
    const currentUser = authService.getCurrentUser();

    return (
        <div className="d-flex">
            <UserSidebar />
            <div className="flex-grow-1 p-4 user-dashboard">
                {/* Header Sambutan */}
                <div className="mb-4 welcome-header">
                    <h2>Halo, {currentUser?.nama}!</h2>
                    <p>Selamat datang di dashboard pribadi Anda. Di sini Anda bisa membuat dan memantau semua laporan Anda.</p>
                </div>

                {/* Konten Dinamis Sesuai Menu dengan Animasi */}
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<Navigate to="grafik" replace />} />
                        <Route path="grafik" element={<GrafikLaporan />} />
                        <Route path="buat-laporan" element={<FormLaporan />} />
                        <Route path="riwayat" element={<RiwayatLaporan />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardPage;