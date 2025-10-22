// File: src/components/Footer.js

import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
import KemenkeuLogo from '../assets/images/Becuk2.png'; 

const Footer = () => {
    return (
        <footer className="footer-beacukai">
            <Container>
                <Row className="text-center text-md-start align-items-center">
                    {/* Kolom Logo Kemenkeu */}
                    <Col md={2} className="mb-3 text-center text-md-start">
                        <img
                            src={KemenkeuLogo}
                            alt="Kementerian Keuangan Republik Indonesia"
                            className="img-fluid me-4"
                            style={{ maxHeight: '100px' }} // Diperbesar menjadi 100px
                        />
                    </Col>

                    {/* Kolom Alamat */}
                    <Col md={5} className="mb-3">
                        <h5>Direktorat Jenderal Bea dan Cukai</h5>
                        <p className="mb-0">
                            Jl. Jenderal Ahmad Yani By Pass, Rawamangun, Jakarta Timur - 13230
                        </p>
                        <p>
                            Kantor Pusat : 1500225
                        </p>
                    </Col>

                    {/* Kolom Media Sosial */}
                    <Col md={5} className="text-center text-md-end">
                        <h5>Hubungi Kami</h5>
                        <div className="social-icons">
                            <a href="https://www.instagram.com/beacukairi/" target="_blank" rel="noopener noreferrer" className="me-2">
                                <FaInstagram size={30} />
                            </a>
                            <a href="https://www.facebook.com/beacukairi" target="_blank" rel="noopener noreferrer" className="me-2">
                                <FaFacebook size={30} />
                            </a>
                            <a href="https://www.youtube.com/user/beacukairi" target="_blank" rel="noopener noreferrer">
                                <FaYoutube size={30} />
                            </a>
                        </div>
                    </Col>
                </Row>
                <hr style={{ borderColor: 'var(--beacukai-yellow)' }} />
                <Row>
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} Hak Cipta Direktorat Jenderal Bea dan Cukai</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;