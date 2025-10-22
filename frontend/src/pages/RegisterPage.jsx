// File: src/pages/RegisterPage.js

import { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert, Toast, ToastContainer } from 'react-bootstrap'; // Tambahkan Toast dan ToastContainer
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import './Auth.css'; 

const RegisterPage = () => {
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showToast, setShowToast] = useState(false); // State untuk Toast
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const userData = { nama, username, password };

        try {
            await authService.register(userData);
            // Ganti alert() dengan menampilkan Toast
            setShowToast(true);
            
            // Tunggu sebentar sebelum navigasi agar Toast terlihat
            setTimeout(() => {
                navigate('/login');
            }, 1500); // Tunda navigasi 1.5 detik
            
        } catch (err) {
            setError(err.response?.data || "Terjadi kesalahan saat registrasi.");
        }
    };

    return (
        <div className="auth-container">
            {/* Tambahkan ToastContainer untuk menampung Toast */}
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
                <Toast 
                    onClose={() => setShowToast(false)} 
                    show={showToast} 
                    delay={1500} 
                    autohide
                    bg="success" // Warna latar belakang Toast (hijau untuk sukses)
                >
                    <Toast.Header closeButton={false}>
                        <strong className="me-auto">✅ Registrasi Berhasil</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">
                        Silakan login dengan akun baru Anda.
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            
            <Card className="auth-card">
                <Row className="g-0">
                     {/* Kolom Kiri: Branding */}
                     <Col md={6} className="auth-branding-section d-none d-md-flex">
                         <div>
                             <h2>Buat Akun Baru</h2>
                             <p>Bergabunglah dengan platform kami untuk dapat menyampaikan laporan Anda secara transparan dan akuntabel.</p>
                         </div>
                     </Col>

                     {/* Kolom Kanan: Form Register */}
                     <Col md={6} className="auth-form-section">
                         <h3 className="text-center mb-4">Pendaftaran</h3>
                         {error && <Alert variant="danger">{error}</Alert>}
                         <Form onSubmit={handleSubmit}>
                             <Form.Group className="mb-3" controlId="formBasicNama">
                                 <Form.Label>Nama Lengkap</Form.Label>
                                 <Form.Control type="text" placeholder="Masukkan nama lengkap" value={nama} onChange={(e) => setNama(e.target.value)} required />
                             </Form.Group>

                             <Form.Group className="mb-3" controlId="formBasicUsername">
                                 <Form.Label>Username</Form.Label>
                                 <Form.Control type="text" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                             </Form.Group>

                             <Form.Group className="mb-3" controlId="formBasicPassword">
                                 <Form.Label>Password</Form.Label>
                                 <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                             </Form.Group>

                             <div className="d-grid">
                                 <Button variant="primary" type="submit">Register</Button>
                             </div>
                         </Form>
                         <div className="auth-switch-link">
                             <p>Sudah punya akun? <Link to="/login">Login di sini</Link></p>
                         </div>
                     </Col>
                </Row>
            </Card>
        </div>
    );
};

export default RegisterPage;