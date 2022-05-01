import React from "react";
import { Col,Row, Button, Container } from "react-bootstrap";

const QuestionCard=({quest})=>{
     return(
         <Container style={{ justifyContent: 'center', paddingTop: "3vh", paddingBottom:"2vh"}}>
        <Row style={{ minHeight:"10vh", maxHeight:"20%", textDecoration:"none", minWidth: "35vw", maxWidth: "70%"  }} className="shadow p-3 mb-5 bg-white rounded">
        <Col sm={12} md={12} lg={12} >
            <h5 >
               QUESTION
            </h5>
         </Col>
         <Col sm={12} md={12} lg={12}>
            <pre >
               {quest}
            </pre>
         </Col>
         <Col md={12} lg={12} sm={12} style={{ display: "flex" }}>
            <Button  variant="dark" type="button" style={{ marginLeft: "auto", marginTop: "5vh" }}>
                Answer               
            </Button>
        </Col>              
         </Row>
         </Container>
     )
}
export default QuestionCard