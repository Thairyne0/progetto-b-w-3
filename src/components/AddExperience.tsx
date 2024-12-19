import { ChangeEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import UploadImg from "./UploadImg";
import MyNewNavBar from "./MyNewNavBar";

import { useNavigate } from "react-router-dom";

// Interface with form fields
interface ExperienceForm {
  role: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description: string;
  area: string;
}

interface AddExperienceProps {
  userId: string;
  token: string | null;
}

const AddExperience = ({ userId, token }: AddExperienceProps) => {
  //   const [experienceId, setExperienceId] = useState<string | null>(null);
  //   const navigate=useNavigate()

  const navigate = useNavigate();
  // Set the initial state of the form including imageUrl
  const [form, setForm] = useState<ExperienceForm>({
    role: "",
    company: "",
    startDate: "",
    endDate: null,
    description: "",
    area: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("File selezionato:", file);

      setSelectedImage(file);
    } else {
      console.log("Nessun file selezionato");
    }
  };

  const handleUpload = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!selectedImage) {
        reject("No image selected");
        return;
      }

      const formData = new FormData();
      formData.append("experience", selectedImage);

      console.log("Form data for upload:", formData);

      fetch(
        `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${localStorage.getItem(
          "expID"
        )}/picture`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
          body: formData,
        }
      )
        .then((response) => {
          if (!response.ok) {
            reject("Failed to upload image");
            console.log(response);
            return;
          }
          return response.json();
        })
        .then((data) => {
          resolve();
          console.log(data);
          //   onSuccess(data.imageUrl);
        })
        .catch((error) => {
          reject(error.message || "An error occurred");
        });
    });
  };

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
        const data = await response.json();
        const experienceId = data._id;
        console.log(experienceId);
        localStorage.setItem("expID", experienceId);
        console.log(localStorage.getItem("expID"));
        // setExperienceId(experienceId);

        //seconda fetch per recuperare l'id delle esperienze
        const secondResponse = await fetch(
          `https://striveschool-api.herokuapp.com/api/profile/${userId}/experiences/${localStorage.getItem(
            "expID"
          )}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (secondResponse.ok) {
          const experienceDetails = await secondResponse.json();
          const imageId = experienceDetails._id;
          console.log(imageId);
          //   setExperienceId(imageId);
          handleUpload();
          console.log("experienceId", experienceId);
        } else {
          throw new Error("Errore recupero experienceId");
        }

        //reset form
        setForm({
          role: "",
          company: "",
          startDate: "",
          endDate: null,
          description: "",
          area: "",
        });
        navigate("/profile");
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

  //   // Gestisce l'URL dell'immagine caricata (dal componente UploadImg)
  //   const handleImageSuccess = (url: string) => {
  //     setForm((form) => ({ ...form, imageUrl: url }));
  //   };

  //   // Gestisce gli errori del caricamento immagine
  //   const handleImageError = (error: string) => {
  //     console.error(error);
  //   };

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
                    {/* <Form.Check
                      type="checkbox"
                      label={<span className="ms-2">Ibrido/Smart Working</span>}
                      name="hybrid"
                      checked={form.hybrid}
                      onChange={handleInput}
                    /> */}
                  </Form.Group>
                </span>

                <div>
                  <label htmlFor="uploadImg">Upload Image:</label>
                  <input
                    id="uploadImg"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleUpload()
                        .then(() => {
                          console.log("Upload successful");
                        })
                        .catch((error) => {
                          console.log(error);
                          //   onError(error);
                        });
                    }}
                    disabled={!selectedImage}
                  >
                    Upload
                  </button>
                </div>

                {/* soluzione di chatGpt  { &&} */}
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
