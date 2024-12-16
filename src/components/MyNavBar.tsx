import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function MyNavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div className="bg-white row align-items-center justify-content-between pt-2">
        <div className="col-1">
          <a href="">
            <h2 className="px-2 fw-bold bg-primary d-inline-block text-light ms-3 rounded">
              in
            </h2>
          </a>
        </div>
        <div className="col-3 d-none d-md-block">
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Cerca
            </InputGroup.Text>
            <Form.Control
              aria-label="Cerca"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </div>
        <div className="col-5 d-none d-md-block">
          <div className="row row-cols-5 border-end border-black">
            <a href="" className="text-decoration-none text-dark">
              Home
            </a>
            <a href="" className="text-decoration-none text-dark">
              Rete
            </a>
            <a href="" className="text-decoration-none text-dark">
              Lavoro
            </a>
            <a href="" className="text-decoration-none text-dark">
              Messaggistica
            </a>
            <a href="" className="text-decoration-none text-dark">
              Notifiche
            </a>
          </div>
        </div>
        <div className="col-2">
          <Button
            variant="primary"
            onClick={handleShow}
            className="m-0 col d-md-none "
          >
            Launch
          </Button>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </div>
  );
}

export default MyNavBar;
