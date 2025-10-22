// File: src/components/Sidebar.js

import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaInbox, FaSpinner, FaCheckCircle, FaUserPlus, FaBullhorn } from 'react-icons/fa';
import './Sidebar.css';
import { FaImages } from 'react-icons/fa'
import { FaRegNewspaper } from 'react-icons/fa'; 


const Sidebar = () => {
    return (
        <Nav className="flex-column bg-dark sidebar">
            <div className="sidebar-header">
                <h5>Menu Utama</h5>
            </div>
            <LinkContainer to="/admin/dashboard/masuk">
                <Nav.Link className="d-flex align-items-center"><FaInbox className="me-2" /> Laporan Masuk</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/dashboard/proses">
                <Nav.Link className="d-flex align-items-center"><FaSpinner className="me-2" /> Laporan Diproses</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/dashboard/selesai">
                <Nav.Link className="d-flex align-items-center"><FaCheckCircle className="me-2" /> Laporan Selesai</Nav.Link>
            </LinkContainer>
            <hr className="text-secondary" />
            <LinkContainer to="/admin/dashboard/pengumuman">
                <Nav.Link className="d-flex align-items-center"><FaBullhorn className="me-2" /> Kelola Pengumuman</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/dashboard/kegiatan">
                <Nav.Link className="d-flex align-items-center"><FaImages className="me-2" /> Kelola Kegiatan</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/dashboard/berita">
                <Nav.Link className="d-flex align-items-center"><FaRegNewspaper className="me-2" /> Kelola Berita</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/admin/dashboard/register-admin">
                <Nav.Link className="d-flex align-items-center"><FaUserPlus className="me-2" /> Register Admin Baru</Nav.Link>
            </LinkContainer>
        </Nav>
    );
};

export default Sidebar;