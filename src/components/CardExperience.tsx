import { Col, Row, Card, Button, Modal, Form } from "react-bootstrap";
import IExperience from "../types/Experience";

import { useState } from "react";

// {
//     "role": "Full Stack Web Developer",
//     "company": "FizzBuzz",
//     "startDate": "2022-06-16",
//     "endDate": "2023-06-16", // può essere null
//     "description": "Implementing new features",
//     "area": "Milan",
//     "username": "mario88", // SERVER GENERATED
//     "image": ..., // SERVER GENERATED, modificabile
//     "createdAt": 2023-06-16T19:58:31.019Z", // SERVER GENERATED
//     "updatedAt": "2023-06-16T19:58:31.019Z", // SERVER GENERATED
//     "__v": 0 // SERVER GENERATED
//     "_id": "5d925e677360c41e0046d1f5" // SERVER GENERATED
//   }

// Creo la card per ogni esperienza dell'utente

interface ExperienceProps {
  experience: IExperience;
  token: string | null;
  profileId: string;
  //aggiungo onEdit e onDelete per gestire le due azioni
  onDelete: (experienceId: string) => void;
  onEdit: (experience: IExperience) => void;
}

//interfaccia per il modale che serve a modificare una particolare esperienza
interface ModalProps {
  experience: IExperience;
  //void significa che è una funzione senza valore di ritorno. Infatti serve solo a chiudere il modale, non restituisce niente che possa poi essere riutilizzato dal componente
  onHide: () => void;
  show: boolean;
  //void perché qui non torna nulla, torna nel parent. aggiorna lo stato nel parent
  onEdit: (experience: IExperience) => void;
}
const CardExperience = (props: ExperienceProps) => {
  //stato per gestire il modale e il form di modifica dell'esperienza
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState<IExperience>({
    ...props.experience,
  });

  //metodo per modificare l'esperienza, legato al modale

  //changeEvent è un tipo di evento di react che viene triggerato quando cambia il valore di un campo input di un form. I tipi invece indicano il campo input e la textarea
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //destrutturo, dico che devo prendere queste due proprietà  da e.target Name è l'attributo del campo input, value quello che ci scrivo. (e.target è il campo input)
    const { name, value } = e.target; //comse scriverle separate: const name = e.target.name const value = e.target.value

    // aggiorno lo stato di formData a partire dai dati precedenti, cambio solo quelli modificati. name è tra parentesi quadre perché così accedo a ogni proprietà senza bisogno di scriverle una a una.
    setFormData({ ...formData, [name]: value });
  };

  //funzione per gestire l'invio del form di modifica dell'esperienza
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (props.token) {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${props.profileId}/experiences/${props.experience._id}`,

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        //aggiorna i dati nel componente padre (è una funzione che si passa). In realtà non ho capito bene, ho seguito un tutorial
        props.onEdit(formData);
        setModalShow(false); //chiudo il modale
      } else {
        throw new Error("Errore nella modifica dell'esperienza");
      }
    }
  };

  //metodo delete per eliminare l'esperienza
  const handleDelete = async () => {
    if (props.token) {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${props.profileId}/experiences/${props.experience._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      if (response.ok) {
        //chiama onDelete per cancellare l'esperienza selezionata (su cui premo il cestino)
        props.onDelete(props.experience._id);
      } else {
        throw new Error("Errore nell'eliminazione dell'esperienza");
      }
    }
  };

  //modale. Gli passo le props che dovrò utilizzare al suo interno
  function MyVerticallyCenteredModal(props: ModalProps) {
    //destrutturo props, prendo questi valori (è come scrivere props.experience, props.onHide...)
    const { experience, onHide, show } = props;
    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={onHide}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {experience.role}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={handleSubmit}
            className="w-100"
          >
            <Form.Group className="mb-3 w-75">
              <Form.Label className="fs-5">Ruolo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ruolo ricoperto"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 w-75">
              <Form.Label className="fs-5">Azienda</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome azienda"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </Form.Group>
            <span className="d-flex">
              <Form.Group className="mb-3 w-25">
                <Form.Label className="fs-5">Data inizio</Form.Label>
                <Form.Control
                  type="month"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 w-25 ms-5">
                <Form.Label className="fs-5">Data fine</Form.Label>
                <Form.Control
                  type="month"
                  name="endDate"
                  value={formData.endDate || ""}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </span>
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="I tuoi compiti all'interno dell'azienda"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <span className="d-flex align-items-center flex-wrap">
              <Form.Group
                className="mb-3"
                style={{ width: "280px" }}
              >
                <Form.Label className="fs-5">Sede dell'azienda</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Luogo in cui ha sede l'azienda"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group
                className="ms-5 mt-4 align-self-center fs-6"
                controlId="formBasicCheckbox"
              >
                <Form.Check
                  type="checkbox"
                  label={<span className="ms-2">Ibrido/Smart Working</span>}
                  name="hybrid"
                  checked={formData.hybrid}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </span>

            <Button
              id="submitButton"
              type="submit"
              className="my-4 fw-bold pt-2 px-3 rounded-pill border-0 custom-button"

            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <Row className="justify-content-center mt-3">
        {/* <Col className="col col-10 col-md-10">
          <Row className="g-2"> */}
        <Col className="col-3 col-md-2 d-flex align-self-center ">
          <img
            src={props.experience.image}
            alt="Profile"
            className="img-fluid rounded-start"
            style={{
              objectFit: "contain",
              height: "80px",
              width: "80px",
              minWidth: "50px",
              minHeight: "50px",
            }}
          />
        </Col>
        <Col className="col-9 col-md-10">
          <Card.Body className="d-flex flex-column">
            <span className="align-self-end justify-content-center">
              <Button
                style={{ backgroundColor: "transparent" }}
                className="small p-1 border-0 me-2"
                onClick={() => setModalShow(true)}
              >
                <i className="bi bi-pencil-square text-black fs-5"></i>
              </Button>

              <MyVerticallyCenteredModal
                experience={props.experience}
                show={modalShow}
                onHide={() => setModalShow(false)}
                onEdit={props.onEdit}
              />

              <Button
                style={{ backgroundColor: "transparent" }}
                className="small p-1 border-0"
                onClick={handleDelete}
              >
                <i className="bi bi-trash3 text-black fs-5"></i>
              </Button>
            </span>
            <Card.Title className="mb-0">
              {props.experience.role}
            </Card.Title>
            <Card.Text className="text-muted m-0">
              <small>
                {props.experience.company}
                <br />
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                }).format(new Date(props.experience.startDate))}{" "}
                -{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                }).format(
                  new Date(props.experience.endDate || new Date())
                )}{" "}
                ·{" "}
                {(() => {
                  const start = new Date(props.experience.startDate);
                  const end = props.experience.endDate
                    ? new Date(props.experience.endDate)
                    : new Date();
                  const months = Math.floor(
                    (end.getTime() - start.getTime()) /
                    (1000 * 3600 * 24 * 30)
                  );
                  const years = Math.floor(months / 12);
                  const remainingMonths = months % 12;

                  if (years > 0) {
                    return `${years} yr${years > 1 ? "s" : ""}`;
                  } else if (remainingMonths > 0) {
                    return `${remainingMonths} month${remainingMonths > 1 ? "s" : ""
                      }`;
                  } else {
                    return "0 months";
                  }
                })()}
              </small>
              <br />
              <small>{props.experience.area}</small>
            </Card.Text>
            <p className="m-0">{props.experience.description}</p>
            <Card.Text>Translation, Microsoft Word and +2 skills</Card.Text>
          </Card.Body>
        </Col>
      </Row>
      {/* </Col>
      </Row> */}
      <hr />
    </>
  );
};

export default CardExperience;
