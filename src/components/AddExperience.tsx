import { ChangeEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
// Import the UploadImg component
import UploadImg from "./UploadImg";
import MyNewNavBar from "./MyNewNavBar";

import { useNavigate} from "react-router-dom";

// Interface with form fields
interface ExperienceForm {
  role: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
  area: string;
  hybrid: boolean;
  imageUrl: string | null; // Add imageUrl to store the uploaded image URL
}

interface AddExperienceProps {
  userId: string;
  token: string | null;
}

const AddExperience = ({ userId, token }: AddExperienceProps) => {

  const navigate=useNavigate()
  // Set the initial state of the form including imageUrl
  const [form, setForm] = useState<ExperienceForm>({
    role: "",
    company: "",
    startDate: "",
    endDate: null,
    description: "",
    area: "",
    hybrid: false,
    imageUrl: null,
  });

  // Funzione per caricare i dati del form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataJson = {
      role: form.role,
      company: form.company,
      startDate: form.startDate,
      endDate: form.endDate || "",
      description: form.description,
      area: form.area,
      hybrid: form.hybrid.toString(),
      imageUrl: form.imageUrl || "", // Send image URL if available
      };

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formDataJson),
        }
      );

      if (response.ok) {
        // Reset the form after successful submission
        setForm({
          role: "",
          company: "",
          startDate: "",
          endDate: null,
          description: "",
          area: "",
          hybrid: false,
          imageUrl: null,
        });
        navigate("/profile")
      } else {
        throw new Error("Errore nel caricamento dell'esperienza");
      }
    } catch (error) {
      console.log(error);
    }

  };

  // Gestisce i campi input del form (quando vengono modificati). Aggiorna lo stato a ogni modifica.
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((form) => ({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Gestisce l'URL dell'immagine caricata (dal componente UploadImg)
  const handleImageSuccess = (url: string) => {
    setForm((form) => ({ ...form, imageUrl: url }));
  };

  // Gestisce gli errori del caricamento immagine
  const handleImageError = (error: string) => {
    console.error(error);
  };

  return (
    <div>
      <header>
        <MyNewNavBar></MyNewNavBar>
      </header>
      <main>
        <Container fluid className="mt-5">
          <Row>
            <Col className="col-5 m-auto shadow p-3 mb-5 bg-body-tertiary rounded justify-content-center d-flex">
              <Form onSubmit={handleSubmit} className="w-100">
                <Form.Group className="mb-3 w-75">
                  <Form.Label className="fs-5">Ruolo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ruolo ricoperto"
                    name="role"
                    value={form.role}
                    onChange={handleInput}
                  />
                </Form.Group>
                <Form.Group className="mb-3 w-75">
                  <Form.Label className="fs-5">Azienda</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nome azienda"
                    name="company"
                    value={form.company}
                    onChange={handleInput}
                  />
                </Form.Group>
                <span className="d-flex">
                  <Form.Group className="mb-3 w-25">
                    <Form.Label className="fs-5">Data inizio</Form.Label>
                    <Form.Control
                      type="month"
                      name="startDate"
                      value={form.startDate}
                      onChange={handleInput}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 w-25 ms-5">
                    <Form.Label className="fs-5">Data fine</Form.Label>
                    <Form.Control
                      type="month"
                      name="endDate"
                      value={form.endDate || ""}
                      onChange={handleInput}
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
                    value={form.description}
                    onChange={handleInput}
                  />
                </Form.Group>
                <span className="d-flex align-items-center flex-wrap">
                  <Form.Group className="mb-3" style={{ width: "280px" }}>
                    <Form.Label className="fs-5">Sede dell'azienda</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Luogo in cui ha sede l'azienda"
                      name="area"
                      value={form.area}
                      onChange={handleInput}
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
                      checked={form.hybrid}
                      onChange={handleInput}
                    />
                  </Form.Group>
                </span>

                {/* Image upload component */}
                <UploadImg
                  //https://striveschool-api.herokuapp.com/api/profile/%7BuserId%7D/experiences/:expId/picture
                  userId={userId}
                  apiUrl={`https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/:expId/picture`} // Provide the correct API URL
                  token={token}
                  onSuccess={handleImageSuccess}
                  onError={handleImageError}
                />
                
                <Button
                  id="submitButton"
                  type="submit"
                  className="my-4 fw-bold pt-2 px-3"
                  style={{ borderRadius: "30px" }}

                >
                  Submit
                </Button>
               
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default AddExperience;
