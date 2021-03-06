import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import axios from "axios";
import { useParams } from "react-router-dom";
import AnswerCard from '../../components/AnswerCard';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import settingPNG from '../../Image/setting.png'
import './DashboardAnswers.css'


const DashboardAnswers = () => {
  // const admins = ['nabeel@gmail.com', 'laiba@gmai.com', 'hadiya@gmail.com', 'ayesha@gmail.com']
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState("")
  const [reply, setReply] = useState("")
  const userLogin = useSelector((state) => state.userLogin)
  const adminLogin = useSelector((state) => state.adminLogin)
  const { userInfo } = userLogin
  const { adminInfo } = adminLogin
  const { id } = useParams()
  const [verify, setVerify] = useState(true)
  useEffect(() => {
    async function getAnswers() {
      const result = await axios.get(`/api/dashboard/answers/${id}`)
      const { data } = result
      const { questions, answer, user } = data

      if ((userInfo && user.localeCompare(userInfo.email) === 0) || adminInfo) {
        setVerify(true)
      }
      else {
        setVerify(false)
      }
      setQuestion(questions)
      setAnswers(answer)
    }
    getAnswers()
  }, [])

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
                  <h5 className="headings fonts">
                    <b>
                      QUESTION
                    </b>
                  </h5>
                </Container>

              </Col>
              <Col sm={12} md={12} lg={12}>
                <Container>
                  <pre className="fonts">
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
              <Container>
                <pre >
                  {
                    answers.map((i) => {
                      return <AnswerCard key={i} answer={i} />
                    })
                  }
                </pre>
              </Container>
            </Col>
            {verify ?
              <>
                <Col md={10} sm={12} lg={10} className="mt-1">
                  <Container>
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

                    <Form.Text id="postAReply" className="mb-5" muted>
                      <p style={{ marginLeft: "2vh" }}> <br />Max Characters (400)<br />Current Characters ({reply.length}/400)</p>
                    </Form.Text>
                  </Container>
                </Col>
                <Col md={2} sm={12} lg={2} className="mt-1">
                  <Button className="btn-block w-100" type="button" variant="dark" onClick={postAReply}>Reply</Button>
                </Col>
              </>
              : ''}
          </Row>
        </Container>
      }
    </div >
  )
}

export default DashboardAnswers