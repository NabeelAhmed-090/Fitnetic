import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Button, Container } from "react-bootstrap";
import './QuestionCard.css'
import axios from "axios";
import Highlighted from "./Highlight";

const QuestionCard = ({ quest, id, ButtonText, keyword = "" }) => {
   return (
      <>
         <hr />
         <Container style={{ justifyContent: 'center', paddingTop: "2vh", paddingBottom: "1vh" }}>
            <Row className="shadow p-3 mb-3 rounded questionCard" style={ButtonText === "Reply" ? questionCardAdmin : questionCardDashBoard}>
               <Col sm={12} md={12} lg={12} >
                  <h5 >
                     QUESTION
                  </h5>
               </Col>
               <Col sm={12} md={12} lg={12}>
                  <pre >
                     <Highlighted text={quest} highlight={keyword} />
                  </pre>
               </Col>
               <Col md={11} lg={11} sm={12} style={{ display: "flex" }}>
                  <Link to={`/api/dashboard/answers/${id}`} style={{ marginLeft: "auto", marginTop: "5vh" }}>
                     <Button className="btn-block w-100" variant="dark" type="button" >
                        {ButtonText}
                     </Button>
                  </Link>
               </Col>
               {ButtonText === "Reply" ? (
                  <Col md={1} lg={1} sm={12} style={{ display: "flex" }}>
                     <Button className="btn-block w-100" onClick={async () => {
                        await axios.delete(`/api/dashboard/remove/${id}`)
                        window.location.reload(false);
                     }} style={{ marginLeft: "auto", marginTop: "5vh" }} variant="dark" type="submit" >
                        <i className="fa-solid fa-trash"></i>
                     </Button>
                  </Col>) : ''
               }
            </Row>
         </Container>
      </>
   )
}

const questionCardDashBoard = {
   minHeight: "10vh",
   maxHeight: "20%",
   textDecoration: "none",
   minWidth: "35vw",
   maxWidth: "65%",
   backgroundColor: "#F0F0F0"
}

const questionCardAdmin = {
   minHeight: "10vh",
   maxHeight: "20%",
   textDecoration: "none",
   minWidth: "35vw",
   maxWidth: "100%",
   backgroundColor: "#F0F0F0"
}
export default QuestionCard

