// File: src/components/UserSidebar.js

import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaChartPie, FaPenSquare, FaHistory } from 'react-icons/fa'; // Import ikon
import './Sidebar.css';

const UserSidebar = () => {
    return (
        <Nav className="flex-column bg-dark sidebar">
            <div className="sidebar-header">
                <h5>Menu Pelapor</h5>
            </div>
            <LinkContainer to="/dashboard/grafik">
                <Nav.Link className="d-flex align-items-center">
                    <FaChartPie className="me-2" /> Ringkasan
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dashboard/buat-laporan">
                <Nav.Link className="d-flex align-items-center">
                    <FaPenSquare className="me-2" /> Buat Laporan Baru
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/dashboard/riwayat">
                <Nav.Link className="d-flex align-items-center">
                    <FaHistory className="me-2" /> Riwayat Laporan
                </Nav.Link>
            </LinkContainer>
        </Nav>
    );
};

export default UserSidebar;