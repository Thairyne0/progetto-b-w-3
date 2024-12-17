import { Navbar, Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
interface  PageAccediProps {
    token: string;
    ChangeToken: (value: string) => void;
    onSubmit: (event: React.FormEvent) => void;}
    
    
    const PageAccedi = (props:PageAccediProps) => {
        
        const navigate=useNavigate()


  return (
    <>
      <Navbar className="bg-body-light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="/images/download.png "
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
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Bearer Token</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                value={props.token} onChange={(e)=>{props.ChangeToken(e.target.value)}} />
                <Form.Text id="passwordHelpBlock" muted>
                  Insert your Bearer Token
                </Form.Text>
              </Form.Group>

              <Button  variant="primary" type="button" onClick={()=>{navigate("/profile")}}>
                Accedi
              </Button>
            </Form>
          </Col>
        </Row>
          <Row>
            <Col className="col-6 m-auto" >
               <p>Non hai un account Linkedin? <a href="https://strive.school/linkedin-registration" target="_blank">Iscriviti ora</a></p>

            </Col>
          </Row>
      </Container>
    </>
  );
};

export default PageAccedi;
