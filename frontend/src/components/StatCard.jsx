// File: src/components/StatCard.js

import { Card, Col } from 'react-bootstrap';

const StatCard = ({ title, value, icon, bgColor }) => {
    return (
        <Col md={4}>
            <Card className="stat-card" style={{ backgroundColor: bgColor }}>
                <Card.Body>
                    <div className="stat-card-info">
                        <h5>{title}</h5>
                        <h3>{value}</h3>
                    </div>
                    <div className="stat-card-icon">
                        {icon}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default StatCard;