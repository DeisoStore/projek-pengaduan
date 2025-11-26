// File: src/components/LaporanTable.jsx

import { useState, useEffect, useCallback } from 'react';
import { Card, Table, Alert, Button, Badge, OverlayTrigger, Tooltip, Modal, Row, Col } from 'react-bootstrap';
import { FaEdit, FaCogs, FaEye, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUser, FaBuilding } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import api from '../services/api';
import ProsesLaporanModal from './ProsesLaporanModal';
import './LaporanTable.css';

// --- KONFIGURASI ICON MARKER (Agar icon map muncul) ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const Avatar = ({ name }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';
    return (
        <div style={{
            width: '40px', height: '40px', borderRadius: '50%',
            backgroundColor: '#003366', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 'bold', fontSize: '1.2rem', flexShrink: 0
        }}>
            {initial}
        </div>
    );
};

// --- COMPONENT MODAL DETAIL (POPUP DATA LENGKAP) ---
const DetailLaporanModal = ({ show, handleClose, laporan }) => {
    if (!laporan) return null;

    // Cek apakah ada koordinat valid
    const hasCoordinates = laporan.koordinatLat && laporan.koordinatLng;
    const position = hasCoordinates ? [laporan.koordinatLat, laporan.koordinatLng] : [-6.2088, 106.8456];

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title className="text-primary">
                    <FaEye className="me-2" /> Detail Laporan Lengkap
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {/* KOLOM KIRI: INFO PELAPOR & TUJUAN */}
                    <Col md={6} className="border-end">
                        <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">A. Identitas Pelapor</h6>
                        <div className="mb-3">
                            <label className="text-muted small">Nama Pelapor</label>
                            <div className="fw-bold"><FaUser className="me-1 text-secondary"/> {laporan.namaPelapor}</div>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small">Kontak</label>
                            <div><FaEnvelope className="me-1 text-warning"/> {laporan.email || '-'}</div>
                            <div><FaPhone className="me-1 text-success"/> {laporan.noTelp || '-'}</div>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small">Alamat Domisili</label>
                            <div>{laporan.alamat || '-'}</div>
                        </div>

                        <h6 className="fw-bold text-dark border-bottom pb-2 mb-3 mt-4">B. Target Laporan</h6>
                        <div className="mb-3">
                            <label className="text-muted small">Ditujukan Kepada</label>
                            <div className="fw-bold text-primary">{laporan.ditujukanKepada || '-'}</div>
                        </div>
                        <div className="mb-3">
                            <label className="text-muted small">Pihak Terlapor</label>
                            <div className="fw-bold text-danger">{laporan.terlapor || '-'}</div>
                        </div>
                    </Col>

                    {/* KOLOM KANAN: LOKASI KEJADIAN & MAP */}
                    <Col md={6}>
                        <h6 className="fw-bold text-dark border-bottom pb-2 mb-3">C. Lokasi Kejadian</h6>
                        <div className="mb-3">
                            <label className="text-muted small">Alamat / TKP</label>
                            <div className="p-2 bg-light rounded border">
                                <FaMapMarkerAlt className="text-danger me-1"/> 
                                {laporan.lokasiKejadian || 'Lokasi tidak spesifik'}
                            </div>
                        </div>

                        {/* MAPS PREVIEW */}
                        <div className="rounded overflow-hidden border mb-3" style={{ height: '250px', width: '100%' }}>
                            {hasCoordinates ? (
                                <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }} dragging={false} scrollWheelZoom={false}>
                                    <TileLayer
                                        attribution='&copy; OSM'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={position}>
                                        <Popup>TKP: {laporan.kategoriLaporan}</Popup>
                                    </Marker>
                                </MapContainer>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
                                    Tidak ada data koordinat peta.
                                </div>
                            )}
                        </div>
                        
                        {hasCoordinates && (
                            <div className="d-grid">
                                <Button 
                                    variant="outline-primary" 
                                    size="sm" 
                                    href={`https://www.google.com/maps/search/?api=1&query=${laporan.koordinatLat},${laporan.koordinatLng}`} 
                                    target="_blank"
                                >
                                    Buka di Google Maps
                                </Button>
                            </div>
                        )}
                    </Col>
                </Row>
                <hr/>
                <div className="mt-3">
                     <h6 className="fw-bold text-dark">D. Deskripsi Masalah</h6>
                     <p className="bg-light p-3 rounded">{laporan.deskripsiLaporan}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Tutup</Button>
            </Modal.Footer>
        </Modal>
    );
};

// --- COMPONENT UTAMA TABLE ---
const LaporanTable = ({ status, title, onUpdate }) => {
    const [laporanList, setLaporanList] = useState([]);
    const [error, setError] = useState('');
    
    // State Modal Proses
    const [showProsesModal, setShowProsesModal] = useState(false);
    const [selectedLaporanProses, setSelectedLaporanProses] = useState(null);

    // State Modal Detail
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedLaporanDetail, setSelectedLaporanDetail] = useState(null);

    const loadLaporan = useCallback(() => {
        setError('');
        api.get("/laporan/all")
            .then(response => {
                // Filter berdasarkan status tab
                const filteredLaporan = response.data.filter(l => l.status === status);
                // Sort by date descending (terbaru diatas)
                const sortedLaporan = filteredLaporan.sort((a, b) => new Date(b.tanggalLapor) - new Date(a.tanggalLapor));
                setLaporanList(sortedLaporan);
            })
            .catch(err => {
                console.error("Gagal memuat data laporan:", err);
                setError("Gagal memuat data laporan.");
            });
    }, [status]);

    useEffect(() => {
        loadLaporan();
    }, [loadLaporan]);

    // Handler Modal Proses
    const handleShowProsesModal = (laporan) => {
        setSelectedLaporanProses(laporan);
        setShowProsesModal(true);
    };
    const handleCloseProsesModal = () => {
        setShowProsesModal(false);
        setSelectedLaporanProses(null);
    };

    // Handler Modal Detail
    const handleShowDetailModal = (laporan) => {
        setSelectedLaporanDetail(laporan);
        setShowDetailModal(true);
    };
    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setSelectedLaporanDetail(null);
    };

    const handleUpdateSuccess = () => {
        loadLaporan();
        if (onUpdate) onUpdate();
    };

    return (
        <>
            <Card className="shadow-sm border-0">
                <Card.Header as="h5" className="bg-white py-3 border-bottom">{title}</Card.Header>
                <Card.Body className="p-0">
                    {error && <Alert variant="danger" className="m-3">{error}</Alert>}
                    <Table hover responsive className="laporan-table mb-0 align-middle">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4" style={{ width: '25%' }}>PELAPOR</th>
                                <th style={{ width: '20%' }}>KATEGORI</th>
                                <th style={{ width: '25%' }}>LOKASI & DESKRIPSI</th>
                                <th style={{ width: '10%' }}>STATUS</th>
                                <th style={{ width: '15%' }} className="text-center">AKSI</th>
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
                                                    <div className="fw-bold text-dark">{laporan.namaPelapor}</div>
                                                    <div className="text-muted small d-flex align-items-center mt-1">
                                                        <FaEnvelope className="me-1 text-secondary" size={10}/> 
                                                        {laporan.email ? (laporan.email.length > 15 ? laporan.email.substring(0,15)+'...' : laporan.email) : '-'}
                                                    </div>
                                                    <div className="text-muted small d-flex align-items-center">
                                                        <FaPhone className="me-1 text-secondary" size={10}/> 
                                                        {laporan.noTelp || '-'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="fw-semibold text-primary">{laporan.kategoriLaporan}</span>
                                            <br/>
                                            <small className="text-muted">{new Date(laporan.tanggalLapor).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</small>
                                        </td>
                                        <td>
                                            <div className="mb-1 text-truncate" style={{maxWidth: '250px'}}>
                                                <FaMapMarkerAlt className="text-danger me-1"/>
                                                <small className="fw-bold text-dark">{laporan.lokasiKejadian || 'Lokasi tidak spesifik'}</small>
                                            </div>
                                            <div className="text-muted small deskripsi-truncate">
                                                {laporan.deskripsiLaporan}
                                            </div>
                                        </td>
                                        <td>
                                            <Badge bg={laporan.status === 'BARU' ? 'warning' : laporan.status === 'DIPROSES' ? 'primary' : 'success'} className="px-3 py-2">
                                                {laporan.status}
                                            </Badge>
                                        </td>
                                        <td className="text-center">
                                            <div className="d-flex justify-content-center gap-2">
                                                {/* TOMBOL LIHAT DETAIL */}
                                                <OverlayTrigger overlay={<Tooltip>Lihat Detail Lengkap</Tooltip>}>
                                                    <Button variant="outline-info" size="sm" className="btn-circle" onClick={() => handleShowDetailModal(laporan)}>
                                                        <FaEye />
                                                    </Button>
                                                </OverlayTrigger>

                                                {/* TOMBOL PROSES (Hanya untuk BARU & DIPROSES) */}
                                                {(status === 'BARU' || status === 'DIPROSES') && (
                                                    <OverlayTrigger overlay={<Tooltip>{status === 'BARU' ? 'Proses Laporan' : 'Update Status'}</Tooltip>}>
                                                        <Button 
                                                            variant={status === 'BARU' ? "outline-primary" : "outline-success"} 
                                                            size="sm" 
                                                            className="btn-circle"
                                                            onClick={() => handleShowProsesModal(laporan)}
                                                        >
                                                            {status === 'BARU' ? <FaCogs /> : <FaEdit />}
                                                        </Button>
                                                    </OverlayTrigger>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-5">
                                        <div className="text-muted opacity-50">
                                            <FaBuilding size="3em" className="mb-3"/>
                                            <h5>Belum ada laporan dengan status ini.</h5>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            {/* MODAL PROSES (YANG LAMA TETAP ADA) */}
            {selectedLaporanProses && (
                <ProsesLaporanModal 
                    show={showProsesModal} 
                    handleClose={handleCloseProsesModal} 
                    laporan={selectedLaporanProses} 
                    onUpdate={handleUpdateSuccess} 
                />
            )}

            {/* MODAL DETAIL (BARU) */}
            {selectedLaporanDetail && (
                <DetailLaporanModal 
                    show={showDetailModal} 
                    handleClose={handleCloseDetailModal} 
                    laporan={selectedLaporanDetail} 
                />
            )}
        </>
    );
};

export default LaporanTable;