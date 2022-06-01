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
         <Container key={id} style={{ justifyContent: 'center', paddingTop: "2vh", paddingBottom: "1vh" }}>
            <Row className={ButtonText === "Reply" ? 'shadow p-3 mb-3 rounded questionCard questionCardAdmin' : 'shadow p-3 mb-3 rounded questionCard questionCardDashboard'}>
               <Col sm={12} md={12} lg={12} >
                  <h5 className="boldFonts">
                     QUESTION
                  </h5>
               </Col>
               <Col sm={12} md={12} lg={12}>
                  <pre className="lightFonts">
                     <Highlighted text={quest} highlight={keyword} />
                  </pre>
               </Col>
               <Col md={11} lg={11} sm={12} style={{ display: "flex" }}>
                  <Link to={`/api/dashboard/answers/${id}`} style={{ marginLeft: "auto", marginTop: "5vh" }}>
                     <Button className="btn-block w-100" variant="dark" type="button" >
                        <span className="lightFonts">{ButtonText}</span>
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

export default QuestionCard

