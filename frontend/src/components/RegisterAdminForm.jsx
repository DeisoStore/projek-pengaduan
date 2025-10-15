// File: src/components/RegisterAdminForm.js

import { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import authService from '../services/authService';

const RegisterAdminForm = () => {
    const [nama, setNama] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await authService.registerAdmin({ nama, username, password });
            setMessage(`Admin dengan username '${username}' berhasil dibuat.`);
            // Reset form
            setNama('');
            setUsername('');
            setPassword('');
        } catch (err) {
            setError(err.response?.data || "Gagal mendaftarkan admin baru.");
        }
    };

    return (
        <Card>
            <Card.Header as="h5">Formulir Pendaftaran Admin Baru</Card.Header>
            <Card.Body>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nama Lengkap</Form.Label>
                        <Form.Control type="text" value={nama} onChange={(e) => setNama(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Daftarkan Admin</Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default RegisterAdminForm;