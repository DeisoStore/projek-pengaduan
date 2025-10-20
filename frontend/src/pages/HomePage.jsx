
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPenSquare, FaCogs, FaUser, FaComments, FaCheckCircle, FaBook, FaPhone, FaFax, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; 
import './HomePage.css'; 
import imgProfesional from '../assets/images/profesional.jpg';
import imgTransparan from '../assets/images/transparan.jpg';
import imgTerpercaya from '../assets/images/terpercaya.jpg';

const HomePage = () => {
    return (
        <>
            <div className="hero-banner text-white text-center">
                <Container>
                    <h1>Layanan Pengaduan Online</h1>
                    <p className="lead">Sampaikan laporan Anda secara profesional, transparan, dan terpercaya.</p>
                    <Button variant="primary" size="lg" as={Link} to="/login">Portal Pengaduan</Button>
                </Container>
            </div>


            <Container className="my-5">
                <h2 className="text-center mb-4">Tentang Kami</h2>
                <Row>
                    <Col md={4} className="mb-4"> 
                        <Card className="h-100 tentang-kami-card">
                            <Card.Img variant="top" src={imgProfesional} />
                            <Card.Body>
                                <Card.Title>Profesional</Card.Title>
                                <Card.Text>
                                    Setiap laporan ditangani oleh tim yang ahli di bidangnya untuk memastikan penanganan yang tepat.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="h-100 tentang-kami-card">
                            <Card.Img variant="top" src={imgTransparan} />
                            <Card.Body>
                                <Card.Title>Transparan</Card.Title>
                                <Card.Text>
                                    Anda dapat memantau status perkembangan laporan Anda kapan saja melalui dashboard personal.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className="mb-4">
                        <Card className="h-100 tentang-kami-card">
                            <Card.Img variant="top" src={imgTerpercaya} />
                            <Card.Body>
                                <Card.Title>Terpercaya</Card.Title>
                                <Card.Text>
                                    Kami menjamin kerahasiaan data dan identitas Anda sesuai dengan peraturan yang berlaku.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        
            <div className="alur-pengaduan-section">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Alur Pengaduan Anda</h2>
                        <p className="lead text-muted">Hanya dengan 4 langkah mudah, laporan Anda akan kami proses.</p>
                    </div>
                    <Row>
                        <Col md={4} className="step-box">
                            <div className="step-icon"><FaPenSquare /></div>
                            <h4 className="step-title">1. Buat Laporan</h4>
                            <p className="text-muted">Masuk ke portal pengaduan dan anda akan di minta melakukan login atau registrasi</p>
                        </Col>
                        <Col md={4} className="step-box">
                            <div className="step-icon"><FaUser /></div>
                            <h4 className="step-title">2. Buat akun </h4>
                            <p className="text-muted">Anda akan diminta membuat akun. Jika sudah pernah daftar anda hanya perlu login</p>
                        </Col>
                        <Col md={4} className="step-box">
                            <div className="step-icon"><FaBook /></div>
                            <h4 className="step-title">3. Buat Laporan </h4>
                            <p className="text-muted">Silahkan buat laporan anda melalui dashboard portal pengguna anda yang ada di menu laporan.</p>
                        </Col>
                        <Col md={4} className="step-box">
                            <div className="step-icon"><FaComments /></div>
                            <h4 className="step-title">4. Dapatkan Feedback</h4>
                            <p className="text-muted">Anda dapat memantau status dan melihat hasil tindak lanjut dari kami langsung di menu Riwayat Laporan di dashboard anda.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
                    
            <div className="info-pengaduan-section">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="fw-bold">Pusat Pengaduan Masyarakat</h2>
                        <p className="lead text-muted">Terima kasih telah mengunjungi layanan pengaduan masyarakat DJBC.</p>
                    </div>
                    <Row className="justify-content-center">
                        <Col lg={10}>
                            <p className="text-center mb-4">Silakan sampaikan pengaduan Anda kepada kami melalui saluran pengaduan DJBC apabila Anda:</p>
                            <ul className="checklist">
                                <li><FaCheckCircle className="icon-check" /> Mempunyai keluhan terkait pelayanan kepabeanan dan cukai;</li>
                                <li><FaCheckCircle className="icon-check" /> Mengetahui informasi dugaan pelanggaran di bidang kepabeanan dan cukai; dan</li>
                                <li><FaCheckCircle className="icon-check" /> Mengetahui adanya sikap dan perilaku Pegawai Bea dan Cukai yang diduga melanggar ketentuan disiplin dan/atau kode etik.</li>
                            </ul>
                            <hr className="my-5" />
                        </Col>
                    </Row>
                    
                    <h3 className="text-center mb-4">Saluran Pengaduan</h3>
                    <Row>
                        <Col md={6} className="mb-4">
                            <Card className="h-100">
                                <Card.Body className="p-4">
                                    <Card.Title as="h5" className="fw-bold mb-3">A. Sistem Aplikasi Pengaduan Online</Card.Title>
                                    <Card.Text>
                                        Anda dapat menyampaikan pengaduan secara online melalui website ini. Setiap pengaduan akan mendapatkan nomor tiket untuk memantau perkembangan, menambahkan data, dan menjaga kerahasiaan identitas Anda. Sampaikan informasi pengaduan Anda dengan lengkap dan jelas, agar kami dapat menindaklanjuti pengaduan dengan efektif.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} className="mb-4">
                            <Card className="h-100">
                                <Card.Body className="p-4">
                                    <Card.Title as="h5" className="fw-bold mb-3">B. Saluran Pengaduan Lainnya</Card.Title>
                                    <Card.Text className="text-muted mb-3">
                                        Apabila mengalami kesulitan, Anda dapat menggunakan saluran di bawah ini:
                                    </Card.Text>
                                    <ul className="contact-list">
                                        <li><FaPhone className="icon" /> (021) 1500 225 (Bravo Bea Cukai)</li>
                                        <li><FaFax className="icon" /> (021) 4890966</li>
                                        <li><FaEnvelope className="icon" /> pengaduan.beacukai@customs.go.id</li>
                                        <li><FaMapMarkerAlt className="icon" /> Surat: d.a. Direktur Kepatuhan Internal di setiap Kantor Bea Cukai</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default HomePage;