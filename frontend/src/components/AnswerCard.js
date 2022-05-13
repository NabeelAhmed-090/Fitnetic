import React from "react";
import { Col, Row } from "react-bootstrap";
import './AnswerCard.css'


const AnswerCard = ({ answer }) => {
    return (
        <Row className="shadow p-3 mb-2 rounded bg-white answerCard">
            <Col sm={12} md={12} lg={12}>
                <pre >
                    {answer}
                </pre>
            </Col>
        </Row>
    )
}

export default AnswerCard