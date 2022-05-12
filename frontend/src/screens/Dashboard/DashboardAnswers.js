import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import AnswerCard from '../../components/AnswerCard';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import settingPNG from '../../Image/setting.png'
import './DashboardAnswers.css'


const DashboardAnswers = () => {
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState("")
  const [reply, setReply] = useState("")
  const { id } = useParams()
  useEffect(() => {
    async function getAnswers() {
      const result = await axios.get(`/api/dashboard/answers/${id}`)
      const { data } = result
      const { questions, answer } = data
      setQuestion(questions)
      setAnswers(answer)
    }
    getAnswers()
  }, [answers])

  const postAReply = async () => {
    if (reply.length !== 0) {
      var config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(`/api/dashboard/reply/${id}`,
        { reply },
        config)
      setReply("")
    }

  }

  return (
    <div>
      <Container style={{ justifyContent: 'center', paddingTop: "2vh", paddingBottom: "1vh" }}>
        <Row>
          <Col md={7} sm={12} lg={7}>

            <Row style={{ height: "30vh", textDecoration: "none", minWidth: "35vw", backgroundColor: "#F0F0F0" }} className="shadow p-3 mb-3 rounded">

              <Col sm={12} md={12} lg={12} >
                <Container>
                  <h5 className="headings">
                    <b>
                      QUESTION
                    </b>
                  </h5>
                </Container>

              </Col>
              <Col sm={12} md={12} lg={12}>
                <Container>
                  <pre >
                    {question}
                  </pre>
                </Container>
              </Col>
            </Row>

          </Col>
          <Col style={{ maxHeight: "35vh" }} md={5} sm={12} lg={5}>
            <div style={{ height: "100%" }}>
              <img
                className="d-block w-100"
                src={settingPNG}
                alt="First slide"
                style={{ height: "100%", width: "100%" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
      {

        <Container style={{ justifyContent: 'center', paddingTop: "2vh", paddingBottom: "1vh" }}>
          <Row style={{ minHeight: "10vh", maxHeight: "20%", textDecoration: "none", minWidth: "35vw", backgroundColor: "#F0F0F0" }} className="shadow p-3 mb-3 rounded">
            <Col sm={12} md={12} lg={12} >
              <Container>
                <h5 className="headings">
                  <b>
                    ANSWERS
                  </b>
                </h5>
              </Container>
            </Col>
            <Col sm={12} md={12} lg={12}>
              <pre >
                {
                  answers.map((i) => {
                    return <AnswerCard key={i} answer={i} />
                  })
                }
              </pre>
            </Col>
            <Col md={10} sm={12} lg={10} className="mt-1">
              <Form.Control onChange={(event) => {
                if (event.target.value.length <= 400)
                  setReply(event.target.value)
              }
              }
                type="text"
                placeholder='Reply to the thread'
                id="postAReply"
                aria-describedby="postAReplyBlock"
                value={reply}
              />
              <Form.Text id="postAReply" muted>
                Your reply should not be more than 400 characters.
              </Form.Text>
            </Col>
            <Col md={2} sm={12} lg={2} className="mt-1">
              <Button className="btn-block w-100" type="button" variant="dark" onClick={postAReply}>Reply</Button>
            </Col>
          </Row>
        </Container>
      }
    </div>
  )
}

export default DashboardAnswers