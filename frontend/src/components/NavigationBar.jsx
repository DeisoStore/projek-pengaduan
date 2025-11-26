// File: src/components/NavigationBar.js

import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import KemenkeuLogo from '../assets/images/kemenkeu.png';
import './NavigationBar.css';

const NavigationBar = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const location = useLocation();

    const handleLogout = () => {
        authService.logout();
        setCurrentUser(undefined);
        window.location.href = "/";
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
                {/* Navbar Brand dengan Logo dan Teks Kemenkeu */}
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img
                        src={KemenkeuLogo}
                        alt="Kementerian Keuangan RI"
                        style={{ height: '40px', marginRight: '10px' }} />
                   
                    {/*  Teks Kemenkeu nya ya ges ya */}
                    <div style={{ marginRight: '15px' }}>
                        <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold', display: 'block', lineHeight: '1.1' }}>
                            KEMENTRIAN KEUANGAN
                        </span>
                        <span style={{ color: 'white', fontSize: '11px', display: 'block', lineHeight: '1.1' }}>
                            Republik Indonesia
                        </span>
                    </div>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    {location.pathname === '/' && (
                    <div className="navbar-marquee-container d-none d-lg-flex">
                        <span className="marquee-label">Informasi &gt;</span>
                          <div className="marquee-wrapper">
                        <span className="marquee-content">
                             Ini adalah portal web sistem pengaduan masyarakat berbasis web
                        </span>
                          </div>
                    </div>
                    )}

                    <Nav className="ms-auto">
                        {currentUser ? (
                            <>
                                <Nav.Link as={Link} to="/">Beranda</Nav.Link>
                                <Nav.Link as={Link} to="/berita">Berita</Nav.Link>
                                <Nav.Link as={Link} to="/pengumuman">Pengumuman</Nav.Link>
                                <Nav.Link as={Link} to="/kegiatan">Kegiatan</Nav.Link>
                                <Nav.Link as={Link} to={currentUser.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}>Dashboard</Nav.Link>
                                
                                <NavDropdown title={currentUser.username} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/">Beranda</Nav.Link>
                                <Nav.Link as={Link} to="/berita">Berita</Nav.Link>
                                <Nav.Link as={Link} to="/pengumuman">Pengumuman</Nav.Link>
                                <Nav.Link as={Link} to="/kegiatan">Kegiatan</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;