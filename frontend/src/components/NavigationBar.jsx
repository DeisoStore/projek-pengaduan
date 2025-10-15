// File: src/components/NavigationBar.js

import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const NavigationBar = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    const handleLogout = () => {
        authService.logout();
        setCurrentUser(undefined);
        window.location.href = "/"; // Arahkan ke homepage setelah logout
    };

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    return (
        <Navbar className="navbar-beacukai" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Layanan Pengaduan Online</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {currentUser ? (
                            // --- TAMPILAN JIKA USER SUDAH LOGIN (YANG DIPERBARUI) ---
                            <>
                                {/* Kumpulan link publik tetap ditampilkan */}
                                <Nav.Link as={Link} to="/">Beranda</Nav.Link>
                                <Nav.Link as={Link} to="/berita">Berita</Nav.Link>
                                <Nav.Link as={Link} to="/pengumuman">Pengumuman</Nav.Link>
                                <Nav.Link as={Link} to="/kegiatan">Kegiatan</Nav.Link>

                                {/* Ditambah link khusus user yang sudah login */}
                                <Nav.Link as={Link} to={currentUser.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}>
                                    Dashboard
                                </Nav.Link>
                                <NavDropdown title={currentUser.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            // Tampilan jika user BELUM login (tetap sama)
                            <>
                                <Nav.Link as={Link} to="/">Beranda</Nav.Link>
                                <Nav.Link href="#">Berita</Nav.Link>
                                <Nav.Link as={Link} to="/pengumuman">Pengumuman</Nav.Link>
                                <Nav.Link href="#">Kegiatan</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;