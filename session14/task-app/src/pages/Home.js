import React, { useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default function Home() {   
    useEffect(() => {
        document.title = "Welcome to UTask"
    }, [])
    
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center container-fluid p-0 m-0"
      style={{
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
      }}
    >
      <Container fluid className='p-0 m-0'>
        <Row className="w-100 p-0 m-0">
          <Col md={6} className="d-flex flex-column justify-content-center align-items-start px-5">
            <h1 className="display-2 fw-bold mb-3 text-white" style={{ textShadow: "2px 2px 8px #0002" }}>
              UTask
            </h1>
            <h3 className="fw-light mb-4 text-white-50">
              Your modern workspace for organizing, tracking, and completing tasks.
            </h3>
            <ul className="mb-4 text-white" style={{ fontSize: "1.2rem", listStyleType: "none" }}>
              <li>✔️ Smart task lists & reminders</li>
              <li>✔️ Personal profile & settings</li>
              <li>✔️ Fast, secure, and easy to use</li>
            </ul>
            <div className="d-flex gap-3">
              <Button as={Link} to="/login" variant="light" size="lg" className="fw-bold shadow">
                Get Started
              </Button>
              <Button as={Link} to="/about" variant="outline-light" size="lg" className="fw-bold">
                Learn More
              </Button>
            </div>
          </Col>
          <Col md={6} className="d-none d-md-flex align-items-center justify-content-center">
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80"
              alt="Task Management"
              className="img-fluid rounded-4 shadow-lg"
              style={{ maxHeight: '420px', border: '4px solid #fff3' }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
