import { useState, useEffect } from 'react';
import { Card, Form, Button, Alert, Row, Col, ListGroup, Spinner } from 'react-bootstrap';
import { FaPaperPlane, FaMapMarkerAlt, FaSearchLocation, FaCheckCircle } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import authService from '../services/authService';
import laporanService from '../services/laporanService';

// --- KONFIGURASI ICON MARKER ---
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Component Helper untuk Pindah Kamera Peta
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

const FormLaporan = ({ onLaporanCreated }) => {
    // --- STATE UTAMA ---
    const [kategoriLaporan, setKategoriLaporan] = useState('');
    const [deskripsiLaporan, setDeskripsiLaporan] = useState('');
    const [dokumen, setDokumen] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // --- STATE IDENTITAS ---
    const [namaPelapor, setNamaPelapor] = useState('');
    const [email, setEmail] = useState('');
    const [alamat, setAlamat] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [ditujukanKepada, setDitujukanKepada] = useState('');
    const [terlapor, setTerlapor] = useState('');

    // --- STATE MAPS & LOKASI ---
    const [position, setPosition] = useState([-6.2088, 106.8456]); 
    const [zoom, setZoom] = useState(13);
    
    const [searchQuery, setSearchQuery] = useState(''); 
    const [detailLokasiManual, setDetailLokasiManual] = useState(''); 
    const [suggestions, setSuggestions] = useState([]); 
    const [isSearching, setIsSearching] = useState(false); 
    const [isLoadingAddress, setIsLoadingAddress] = useState(false); 
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [lokasiTerpilih, setLokasiTerpilih] = useState(''); 

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setNamaPelapor(user.nama || user.username || 'User Tanpa Nama');
        }
    }, []);

    // --- 1. SEARCH AUTOCOMPLETE ---
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length > 2 && !lokasiTerpilih) { 
                setIsSearching(true);
                try {
                    const response = await axios.get(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&addressdetails=1&limit=5&countrycodes=id`
                    );
                    setSuggestions(response.data);
                    setShowSuggestions(true);
                } catch (err) {
                    console.error("Error search", err);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 1000); 

        return () => clearTimeout(timer);
    }, [searchQuery, lokasiTerpilih]);

    const handleSelectSuggestion = (suggestion) => {
        const lat = parseFloat(suggestion.lat);
        const lon = parseFloat(suggestion.lon);
        updateMapLocation(lat, lon, suggestion.display_name);
        setShowSuggestions(false);
    };

    // --- 2. REVERSE GEOCODING ---
    const handleReverseGeocode = async (lat, lng) => {
        setIsLoadingAddress(true);
        setPosition([lat, lng]); 
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const addressName = response.data.display_name;
            updateMapLocation(lat, lng, addressName);
        } catch (error) {
            updateMapLocation(lat, lng, `Koordinat: ${lat.toFixed(5)}, ${lng.toFixed(5)}`);
        } finally {
            setIsLoadingAddress(false);
        }
    };

    const updateMapLocation = (lat, lng, addressName) => {
        setPosition([lat, lng]);
        setZoom(16);
        setSearchQuery(addressName); 
        setLokasiTerpilih(addressName); 
    };

    function LocationMarker() {
        useMapEvents({
            click(e) {
                handleReverseGeocode(e.latlng.lat, e.latlng.lng);
            },
        });
        return position === null ? null : (
            <Marker position={position}>
                <Popup>
                    {isLoadingAddress ? "Mencari nama jalan..." : "Lokasi Terpilih"}
                </Popup>
            </Marker>
        );
    }

    const handleConfirmLocation = () => {
        if (!lokasiTerpilih) {
            alert("Silakan klik peta atau cari lokasi terlebih dahulu!");
            return;
        }
        if (!detailLokasiManual) {
            setDetailLokasiManual(lokasiTerpilih);
        }
        alert("Lokasi berhasil dikunci!");
    };

    // --- 3. SUBMIT LAPORAN (PERBAIKAN UTAMA DISINI) ---
    const handleSubmitLaporan = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        // GUNAKAN FORMDATA AGAR BISA KIRIM FILE & DATA LAIN KE BACKEND
        const formData = new FormData();
        
        // Append data text
        formData.append('namaPelapor', namaPelapor);
        formData.append('email', email);
        formData.append('alamat', alamat);
        formData.append('noTelp', noTelp);
        formData.append('ditujukanKepada', ditujukanKepada);
        formData.append('terlapor', terlapor || '-'); // Jika kosong kirim strip
        formData.append('kategoriLaporan', kategoriLaporan);
        formData.append('deskripsiLaporan', deskripsiLaporan);
        
        // Lokasi
        const lokasiFinal = detailLokasiManual ? `${detailLokasiManual} (Map: ${lokasiTerpilih})` : lokasiTerpilih;
        formData.append('lokasiKejadian', lokasiFinal);
        
        // Koordinat (Pastikan dikirim sebagai String, nanti Backend convert ke Double)
        if (position) {
            formData.append('koordinatLat', position[0]);
            formData.append('koordinatLng', position[1]);
        }

        // File (PENTING: Hanya append jika ada file)
        if (dokumen) {
            formData.append('dokumen', dokumen);
        }

        try {
            // Service harus support FormData (biasanya otomatis jika pakai axios)
            await laporanService.createLaporan(formData);
            
            setMessage("✅ Laporan berhasil dikirim!");
            
            // Reset Form
            setKategoriLaporan('');
            setDeskripsiLaporan('');
            setDokumen(null);
            setEmail('');
            setAlamat('');
            setNoTelp('');
            setDitujukanKepada('');
            setTerlapor('');
            setSearchQuery('');
            setDetailLokasiManual('');
            setLokasiTerpilih('');
            e.target.reset();
            if (onLaporanCreated) onLaporanCreated();
        } catch (err) {
            console.error(err);
            // Tampilkan pesan error spesifik jika ada
            const serverMsg = err.response?.data?.message || err.response?.data || "Gagal membuat laporan.";
            setError(`⚠️ ${serverMsg}`);
        }
    };

    return (
        <div className="form-laporan-wrapper py-4">
            <Card className="shadow-lg border-0 form-laporan-card">
                <Card.Header
                    as="h5"
                    className="d-flex align-items-center text-white"
                    style={{
                        background: 'linear-gradient(90deg, #003366 0%, #007bff 100%)',
                        borderTopLeftRadius: '0.75rem',
                        borderTopRightRadius: '0.75rem',
                    }}
                >
                    <FaPaperPlane className="me-2" /> Formulir Pengaduan
                </Card.Header>

                <Card.Body className="p-4">
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmitLaporan}>
                        {/* A. IDENTITAS */}
                        <h6 className="text-primary fw-bold mb-3">A. Data Pelapor</h6>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nama Lengkap</Form.Label>
                                    <Form.Control type="text" value={namaPelapor} readOnly className="bg-light" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>No. Telepon / WA</Form.Label>
                                    <Form.Control type="text" value={noTelp} onChange={(e) => setNoTelp(e.target.value)} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Alamat Domisili</Form.Label>
                                    <Form.Control type="text" value={alamat} onChange={(e) => setAlamat(e.target.value)} required />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* B. DETAIL */}
                        <h6 className="text-primary fw-bold mb-3 mt-4">B. Detail Pengaduan</h6>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ditujukan Kepada</Form.Label>
                                    <Form.Control type="text" value={ditujukanKepada} onChange={(e) => setDitujukanKepada(e.target.value)} required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Pihak Terlapor</Form.Label>
                                    <Form.Control type="text" value={terlapor} onChange={(e) => setTerlapor(e.target.value)} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>Kategori</Form.Label>
                            <Form.Control type="text" value={kategoriLaporan} onChange={(e) => setKategoriLaporan(e.target.value)} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Deskripsi</Form.Label>
                            <Form.Control as="textarea" rows={5} value={deskripsiLaporan} onChange={(e) => setDeskripsiLaporan(e.target.value)} required />
                        </Form.Group>

                        {/* C. LOKASI */}
                        <h6 className="text-primary fw-bold mb-3 mt-4">C. Lokasi Kejadian</h6>
                        <Form.Group className="mb-3 position-relative">
                            <Form.Label className="fw-semibold">Cari Lokasi / Klik di Peta</Form.Label>
                            
                            <div className="input-group mb-2">
                                <span className="input-group-text bg-white">
                                    {isSearching || isLoadingAddress ? <Spinner animation="border" size="sm" /> : <FaSearchLocation className="text-primary"/>}
                                </span>
                                <Form.Control
                                    type="text"
                                    placeholder="Ketik lokasi atau klik pada peta..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setLokasiTerpilih(''); 
                                    }}
                                    autoComplete="off"
                                />
                            </div>

                            {showSuggestions && suggestions.length > 0 && (
                                <ListGroup className="position-absolute w-100 shadow" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                                    {suggestions.map((item, index) => (
                                        <ListGroup.Item 
                                            key={index} 
                                            action 
                                            onClick={() => handleSelectSuggestion(item)}
                                            className="d-flex align-items-start"
                                        >
                                            <FaMapMarkerAlt className="me-2 mt-1 text-danger" />
                                            <small>{item.display_name}</small>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                            
                            <div className="border rounded overflow-hidden mt-2 position-relative" style={{ height: '350px', width: '100%', zIndex: 0 }}>
                                <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%' }}>
                                    <ChangeView center={position} zoom={zoom} /> 
                                    <TileLayer
                                        attribution='&copy; OSM'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <LocationMarker />
                                </MapContainer>
                            </div>
                        </Form.Group>
                        
                        <div className="bg-light p-3 rounded border mb-3">
                            <Row className="align-items-end">
                                <Col md={12} className="mb-2">
                                    <Button 
                                        variant="success" 
                                        size="sm" 
                                        onClick={handleConfirmLocation}
                                        disabled={!lokasiTerpilih}
                                        className="w-100 mb-2 fw-bold"
                                    >
                                        <FaCheckCircle className="me-2"/> 
                                        {lokasiTerpilih ? "Pilih & Kunci Lokasi Ini" : "Silakan Pilih Lokasi di Peta"}
                                    </Button>
                                </Col>
                                <Col md={12}>
                                    <Form.Group>
                                        <Form.Label className="fw-semibold text-dark small">Detail Alamat / Patokan (Manual)</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={2}
                                            placeholder="Contoh: Gedung warna biru, sebelah Indomaret"
                                            value={detailLokasiManual}
                                            onChange={(e) => setDetailLokasiManual(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>

                        <Form.Group className="mb-3 mt-4">
                            <Form.Label>Upload Dokumen</Form.Label>
                            <Form.Control type="file" onChange={(e) => setDokumen(e.target.files[0])} />
                        </Form.Group>

                        <div className="d-grid mt-4">
                            <Button variant="primary" type="submit" size="lg" className="btn-custom-glow">
                                <FaPaperPlane className="me-2" /> Kirim Laporan
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default FormLaporan;