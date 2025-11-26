// File: src/components/UserSidebar.js

import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaChartPie, FaPenSquare, FaHistory, FaRobot, FaEnvelope } from 'react-icons/fa'; 
import './Sidebar.css';

const UserSidebar = () => {
    return (
        <Nav className="flex-column bg-dark sidebar">

            <div className="sidebar-header">
                <h5>Menu Pelapor</h5>
            </div>

            {/* Ringkasan */}
            <LinkContainer to="/dashboard/grafik">
                <Nav.Link className="d-flex align-items-center">
                    <FaChartPie className="me-2" /> Ringkasan Pengaduan
                </Nav.Link>
            </LinkContainer>

            {/* Buat Laporan */}
            <LinkContainer to="/dashboard/buat-laporan">
                <Nav.Link className="d-flex align-items-center">
                    <FaPenSquare className="me-2" /> Buat Laporan Pengaduan
                </Nav.Link>
            </LinkContainer>

            {/* Tracking */}
            <LinkContainer to="/dashboard/riwayat">
                <Nav.Link className="d-flex align-items-center">
                    <FaHistory className="me-2" /> Tracking Pengaduan
                </Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/dashboard/lupa-tiket">
                <Nav.Link className="d-flex align-items-center">
                    <FaEnvelope className="me-2" /> Kehilangan Nomor Tiket
                </Nav.Link>
            </LinkContainer>

            {/* ✅ MENU BARU — Tanya SIPUMA */}
            <LinkContainer to="/dashboard/tanya-sipuma">
                <Nav.Link className="d-flex align-items-center">
                    <FaRobot className="me-2" /> Tanya SIPUMA
                </Nav.Link>
            </LinkContainer>

        </Nav>
    );
};

export default UserSidebar;
