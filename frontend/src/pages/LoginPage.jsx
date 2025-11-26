// File: src/pages/LoginPage.js

import { useState } from 'react';
import { Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import authService from '../services/authService';
import './Auth.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const userData = await authService.login({ username, password });
            const role = userData.role || '';

            if (role === 'ROLE_ADMIN' || role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else {
                navigate('/dashboard');
            }

        } catch (err) {
            const errorMsg =
                err.response?.data?.message ||
                err.response?.data ||
                'Login gagal. Periksa username dan password Anda.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <Card className="auth-card">
                <Row className="g-0">

                    {/* Kolom Kiri */}
                    <Col md={6} className="auth-branding-section d-none d-md-flex">
                        <div>
                            <h2 style={{ color: '#FFD700' }}>Selamat Datang</h2>
                            <p style={{ color: '#FFD700' }}>
                                Login untuk mengakses dashboard layanan pengaduan Bea Cukai.
                            </p>
                        </div>
                    </Col>

                    {/* Kolom Kanan (Form Login) */}
                    <Col md={6} className="auth-form-section">
                        <h3 className="text-center mb-4">Masuk Akun</h3>

                        {error && (
                            <Alert variant="danger">{error}</Alert>
                        )}

                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Masukkan username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 position-relative">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Masukkan password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="password-toggle-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </Form.Group>

                            <div className="d-grid">
                                <Button variant="primary" type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Spinner
                                                animation="border"
                                                size="sm"
                                                className="me-2"
                                            />
                                            Memproses...
                                        </>
                                    ) : (
                                        'Login Sekarang'
                                    )}
                                </Button>
                            </div>
                        </Form>

                        <div className="auth-switch-link">
                            <p>
                                Belum punya akun?{' '}
                                <Link to="/register">Daftar di sini</Link>
                            </p>
                        </div>
                    </Col>

                </Row>
            </Card>
        </div>
    );
};

export default LoginPage;
