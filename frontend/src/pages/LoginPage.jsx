// File: src/pages/LoginPage.js

import { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import './Auth.css'; 

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const userData = await authService.login({ username, password });
            if (userData.role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data || "Login gagal. Cek kembali username dan password.");
        }
    };

    return (
        <div className="auth-container">
            <Card className="auth-card">
                <Row className="g-0">
                    {/* Kolom Kiri: Branding */}
                    <Col md={6} className="auth-branding-section d-none d-md-flex">
                        <div>
                            <h2>Sistem Pengaduan Online</h2>
                            <p>Selamat datang kembali. Silakan masuk untuk melanjutkan dan mengelola laporan Anda.</p>
                        </div>
                    </Col>

                    {/* Kolom Kanan: Form Login */}
                    <Col md={6} className="auth-form-section">
                        <h3 className="text-center mb-4">Login Akun</h3>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formLoginUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Masukkan username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formLoginPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </Form.Group>

                            <div className="d-grid">
                                <Button variant="primary" type="submit">Login</Button>
                            </div>
                        </Form>
                        <div className="auth-switch-link">
                            <p>Belum punya akun? <Link to="/register">Daftar sekarang</Link></p>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default LoginPage;