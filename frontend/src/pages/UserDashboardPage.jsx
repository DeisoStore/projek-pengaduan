import { Routes, Route, Navigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import UserSidebar from '../components/UserSidebar';
import GrafikLaporan from '../components/GrafikLaporan';
import FormLaporan from '../components/FormLaporan';
import RiwayatLaporan from '../components/RiwayatLaporan';
import ChatbotSIPUMA from '../components/ChatbotSIPUMA'; 
import authService from '../services/authService';
import LupaTiket from '../components/LupaTiket';

import './UserDashboard.css';

const UserDashboardPage = () => {

    const currentUser = authService.getCurrentUser();
    return (
        <div className="d-flex">
            <UserSidebar />
            <div className="flex-grow-1 p-4 user-dashboard">

         
                <div className="mb-4 welcome-header">
                    <h2 className="welcome-title">
                        <FaUserCircle className="welcome-icon" />
                        Halo, {currentUser?.nama || 'Pengguna'}!
                    </h2>
                    <p>Selamat datang di dashboard Anda. Silakan mengelola dan memantau laporan Anda.</p>
                </div>

           
                <div className="content-container">

                    <Routes>

            
                        <Route path="/" element={<Navigate to="grafik" replace />} />
                        <Route path="grafik" element={<GrafikLaporan />} />
                        <Route path="buat-laporan" element={<FormLaporan />} />
                        <Route path="riwayat" element={<RiwayatLaporan />} />
                        <Route path="lupa-tiket" element={<LupaTiket />} />
                        <Route path="tanya-sipuma" element={<ChatbotSIPUMA />} />

                    </Routes>

                </div>
            </div>
        </div>
    );
};

export default UserDashboardPage;
