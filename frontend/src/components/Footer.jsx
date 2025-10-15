// File: src/components/Footer.js

import { Container, Row, Col } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer-beacukai">
            <Container>
                <Row className="text-center text-md-start">
                    {/* Kolom Alamat */}
                    <Col md={6} className="mb-3">
                        <h5>Direktorat Jenderal Bea dan Cukai</h5>
                        <p className="mb-0">
                            Jl. Jenderal Ahmad Yani By Pass, Rawamangun, Jakarta Timur - 13230
                        </p>
                        <p>
                            Kantor Pusat : 1500225
                        </p>
                    </Col>

                    {/* Kolom Media Sosial */}
                    <Col md={6} className="text-center text-md-end">
                        <h5>Hubungi Kami</h5>
                        <div>
                            <a href="https://www.instagram.com/beacukairi/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </a>
                            <a href="https://www.facebook.com/beacukairi" target="_blank" rel="noopener noreferrer">
                                <FaFacebook />
                            </a>
                            <a href="https://www.youtube.com/user/beacukairi" target="_blank" rel="noopener noreferrer">
                                <FaYoutube />
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