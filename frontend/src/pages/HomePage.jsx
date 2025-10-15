// File: src/pages/HomePage.jsx

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // <-- Import Link
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

            <Container className="mt-5">
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
        </>
    );
}

export default HomePage;
