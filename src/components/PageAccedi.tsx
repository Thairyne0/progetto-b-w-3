import { Navbar, Container, Row, Col, Form } from "react-bootstrap";

const PageAccedi = () => {
  return (
    <>
    <Navbar className="bg-body-light">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="/images/logo.png"
            style={{
            
              maxHeight: "70px",
            }}
            className="d-inline-block align-top img-fluid"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
    <Container>
   <Row>
    <Col className="col-6 m-auto shadow p-3 mb-5 bg-body-tertiary rounded">
    <Form.Label htmlFor="inputPassword5"> Bearer Token</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock"
      />
      <Form.Text id="passwordHelpBlock" muted>
        Insert your Bearer Token
      </Form.Text>

    </Col>
   </Row>
    </Container>
    </>
  );
};

export default PageAccedi;
