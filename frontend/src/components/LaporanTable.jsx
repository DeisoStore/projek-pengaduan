// File: src/components/LaporanTable.jsx

import { useState, useEffect, useCallback } from 'react';
import { Card, Table, Alert, Button, Badge, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaEdit, FaCogs } from 'react-icons/fa';
import api from '../services/api';
import ProsesLaporanModal from './ProsesLaporanModal';
import SelesaikanLaporanModal from './SelesaikanLaporanModal';
import './LaporanTable.css'; // Pastikan file CSS baru diimpor

// Komponen Avatar (tidak berubah)
const Avatar = ({ name }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    return (
        <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            backgroundColor: '#003366', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '1.2rem'
        }}>
            {initial}
        </div>
    );
};

const LaporanTable = ({ status, title, onUpdate }) => {
    // --- Semua state dan fungsi JavaScript Anda tidak berubah ---
    const [laporanList, setLaporanList] = useState([]);
    const [error, setError] = useState('');
    const [showProsesModal, setShowProsesModal] = useState(false);
    const [selectedLaporan, setSelectedLaporan] = useState(null);
    const [showSelesaikanModal, setShowSelesaikanModal] = useState(false);
    const [laporanToSelesaikan, setLaporanToSelesaikan] = useState(null);
    const loadLaporan = useCallback(() => { /* ... */ }, [status]);
    useEffect(() => { loadLaporan(); }, [loadLaporan]);
    const handleShowProsesModal = (laporan) => { /* ... */ };
    const handleCloseProsesModal = () => { /* ... */ };
    const handleShowSelesaikanModal = (laporan) => { /* ... */ };
    const handleCloseSelesaikanModal = () => { /* ... */ };
    const handleUpdateSuccess = () => { /* ... */ };
    // --------------------------------------------------------

    return (
        <>
            <Card>
                <Card.Header as="h5">{title}</Card.Header>
                <Card.Body className="p-0">
                    {error && <Alert variant="danger" className="m-3">{error}</Alert>}
                    <Table responsive className="laporan-table mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4" style={{ width: '25%' }}>PELAPOR</th>
                                <th style={{ width: '20%' }}>KATEGORI</th>
                                <th style={{ width: '35%' }}>DESKRIPSI</th>
                                <th style={{ width: '10%' }}>STATUS</th>
                                {(status === 'BARU' || status === 'DIPROSES') && <th style={{ width: '10%' }}>AKSI</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {laporanList.length > 0 ? (
                                laporanList.map((laporan) => (
                                    <tr key={laporan.id}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center">
                                                <Avatar name={laporan.namaPelapor} />
                                                <div className="ms-3">
                                                    <span className="fw-bold">{laporan.namaPelapor}</span>
                                                    <br />
                                                    <small className="text-muted">
                                                        {new Date(laporan.tanggalLapor).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                    </small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{laporan.kategoriLaporan}</td>
                                        <td>
                                            <OverlayTrigger overlay={<Tooltip>{laporan.deskripsiLaporan}</Tooltip>}>
                                                <span className="deskripsi-truncate">
                                                    {laporan.deskripsiLaporan}
                                                </span>
                                            </OverlayTrigger>
                                        </td>
                                        <td><Badge bg={laporan.status === 'BARU' ? 'warning' : laporan.status === 'DIPROSES' ? 'primary' : 'success'}>{laporan.status}</Badge></td>
                                        {(status === 'BARU' || status === 'DIPROSES') && (
                                            <td>
                                                {status === 'BARU' && (
                                                    <OverlayTrigger overlay={<Tooltip>Proses Laporan</Tooltip>}>
                                                        <Button variant="link" className="action-button" onClick={() => handleShowProsesModal(laporan)}>
                                                            <FaCogs size="1.2em" />
                                                        </Button>
                                                    </OverlayTrigger>
                                                )}
                                                {status === 'DIPROSES' && (
                                                    <OverlayTrigger overlay={<Tooltip>Update Laporan</Tooltip>}>
                                                        <Button variant="link" className="action-button" onClick={() => handleShowProsesModal(laporan)}>
                                                            <FaEdit size="1.2em" />
                                                        </Button>
                                                    </OverlayTrigger>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={(status === 'BARU' || status === 'DIPROSES') ? "5" : "4"} className="text-center p-5">
                                        <h5 className="text-muted">Tidak ada laporan dengan status ini.</h5>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* ... (Kode modal tidak berubah) ... */}
        </>
    );
};

export default LaporanTable;