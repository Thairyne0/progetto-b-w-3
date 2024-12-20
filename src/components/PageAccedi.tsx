import { useEffect, useState } from "react";
import { Navbar, Container, Row, Col, Form, Button, Alert, Fade } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface PageAccediProps {
  token: string;
  ChangeToken: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  handleAlert: (status: boolean) => void;
  alert: boolean;
}

const PageAccedi = (props: PageAccediProps) => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false)

  const handleLogin = () => {
    if (props.token.startsWith('.')) {
      setShowAlert(true)

    } else {
      setShowAlert(false)
      navigate('./profile')
    }
  };

  useEffect(() => {
    if (props.token === '') {
      setShowAlert(false)

      return;
    }

    if (props.token.startsWith('.')) {
      setShowAlert(true)
      return
    }

    if (props.token !== '') {
      fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            props.handleAlert(false)
            setShowAlert(false); // Resetta l'alert se il token è valido
          } else {
            props.handleAlert(true); // Mostra l'alert se la risposta è negativa
          }
        })
        .catch(() => {
          props.handleAlert(true); // Mostra l'alert se la fetch fallisce
        });
    }
  }, [props.onSubmit]);

  return (
    <>
      <Navbar className="bg-body-light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/public/images/LI-Logo.png "
              style={{
                maxHeight: "70px",
                maxWidth: '100px',
              }}
              className="d-inline-block align-top img-fluid"
              alt="LinkedIn logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>


      <Container>

        <Row>
          <Col className="col-6 m-auto shadow p-3 mb-5 bg-body-tertiary rounded">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Bearer Token</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={props.token}
                  onChange={(e) => {
                    props.ChangeToken(e.target.value);
                  }}
                />
                <Form.Text id="passwordHelpBlock" muted>
                  Insert your Bearer Token
                </Form.Text>
              </Form.Group>


              <Button className="custom-button" type="button" onClick={handleLogin}>

                Accedi
              </Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="col-6 m-auto">
            <p>
              Non hai un account Linkedin?{" "}
              <a
                href="https://strive.school/linkedin-registration"
                target="_blank"
              >
                Iscriviti ora
              </a>
            </p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          {showAlert && (<Alert variant="danger" className="w-25 text-center">Il token inserito non è valido!</Alert>)}</Row>
      </Container >
    </>
  );
};

export default PageAccedi;
