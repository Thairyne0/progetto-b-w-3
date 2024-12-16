import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function MyNewNavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary flex align-items-center">
      <Container fluid>
        <a href="">
          <h2 className="px-2 fw-bold bg-primary d-inline-block text-light rounded me-3 mt-1">
            in
          </h2>
        </a>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "300px" }}
            navbarScroll
          >
            <Form className="d-flex me-5">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="btn btn-primary">Cerca</Button>
            </Form>
            <Nav.Link href="#action1" className="fw-bold">
              <i className="bi bi-house-heart-fill me-1"></i>
              Home
            </Nav.Link>
            <Nav.Link href="#action2" className="fw-bold">
              <i className="bi bi-people-fill  me-1"></i>
              Rete
            </Nav.Link>
            <Nav.Link href="#action2" className="fw-bold">
              <i className="bi bi-suitcase-lg-fill  me-1"></i>
              Lavoro
            </Nav.Link>
            <Nav.Link href="#action2" className="fw-bold">
              <i className="bi bi-chat-dots-fill  me-1"></i>
              Messaggistica
            </Nav.Link>
            <Nav.Link href="#action2" className="fw-bold">
              <i className="bi bi-bell-fill  me-1"></i>
              Notifiche
            </Nav.Link>
            <NavDropdown title="Account" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <NavDropdown
            title="Per le aziende"
            id="navbarScrollingDropdown"
            className="d-lg-none"
          >
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Per le aziende"
            id="navbarScrollingDropdown"
            className="d-none d-lg-block"
            drop="start"
          >
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNewNavBar;
