// File: src/App.js

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavigationBar from './components/NavigationBar';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PengumumanPage from './pages/PengumumanPage';
import KegiatanPage from './pages/KegiatanPage';
import BeritaPage from './pages/BeritaPage'; // Hanya ada satu baris ini
import BeritaDetailPage from './pages/BeritaDetailPage'; // Dan import untuk halaman detail

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavigationBar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/pengumuman" element={<PengumumanPage />} />
            <Route path="/kegiatan" element={<KegiatanPage />} />
            <Route path="/berita" element={<BeritaPage />} />
            <Route path="/berita/:id" element={<BeritaDetailPage />} /> {/* Rute baru untuk detail */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard/*" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
            <Route path="/admin/dashboard/*" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;