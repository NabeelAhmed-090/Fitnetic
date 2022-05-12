import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import './AnswerCard.css'


const AnswerCard = ({ answer }) => {
    return (
        <Container style={{ justifyContent: 'center', paddingTop: "1vh", paddingBottom: "1vh" }}>
            <Row className="shadow p-3 mb-2 rounded answerCard">
                <Col sm={12} md={12} lg={12}>
                    <pre >
                        {answer}
                    </pre>
                </Col>
            </Row>
        </Container>
    )
}

export default AnswerCard