import { useEffect, useState } from "react";
import CardExperience from "./CardExperience";
import IExperience from "../types/Experience";
import { useNavigate } from "react-router-dom";

import ProfileData from "../types/profileData";
import { Button, Col, Row } from "react-bootstrap";

interface myExperienceProps {
  profilo: ProfileData;
  token: string | null;
}

const MyExperience = (props: myExperienceProps) => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  console.log("questo", props.token);
  console.log("questo", props.profilo._id);
  const navigate = useNavigate();

  const handleNavigateRoute = () => {
    navigate("/add-experience");
  };

  //    fetch per trovare le eseprienze dell'utente tramite l'id del profilo
  const getExperience = () => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${props.profilo._id}/experiences`,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel recupero dei dati ");
        }
      })
      .then((arrayOfExperience) => {
        console.log(arrayOfExperience);
        setExperiences(arrayOfExperience);
      })
      .catch((err) => {
        console.log("errore", err);
      });
  };

  useEffect(() => {
    getExperience();
  }, [props.profilo._id]);
  //filtra le esperienze e restituisce un array senza l'esperienza eliminata
  const handleDeleteExperience = (id: string) => {
    setExperiences(experiences.filter((experience) => experience._id !== id));
  };
  //mappa le esperienze, se l'id corrisponde a quello dell'esperienza aggiornata, la sostituisce, altrimenti non fa niente. handleEditExperience è passata al figlio (CardExperience) come onEdit
  const handleEditExperience = (updatedExperience: IExperience) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp._id === updatedExperience._id ? updatedExperience : exp
      )
    );
  };

  return (
    <>
      <section className="  mt-3 col col-12 col-md-11 col-lg-11 bg-white shadow rounded-3 ">
        <Row className=" justify-content-center">
          <Col className="col col-10 col-md-10 mt-3  rounded-2 ps-2">
            {/* <h5 className="text-muted m-0">Esperienza</h5>
            <small className="m-0 text-mute mb-2">
              Metti in risalto i risultati raggiunti e ottieni fino a 2 volte in
              più visualizzazioni del profilo e collegamenti{" "}
            </small> */}
            {/* <Row className="g-2 mt-1"> */}
            {/* <Col className="col col-4 col-md-2  d-flex align-items-baseline ">
                <i className="bi bi-briefcase-fill px-3 py-2 border border-secondary text-secondary rounded-2"></i>
              </Col> */}
            {/* <Col className="col-8 col-md-8 col-lg-11"> */}
            {/* <Card.Body>
                  <small className="m-0 text-secondary">Qualifica</small>
                  <Card.Text className="text-secondary m-0">
                    <small>organizzazione</small>
                    <br />

                    <small className="text-secondary">2023-presente</small>
                  </Card.Text>
                </Card.Body> */}
            {/* </Col> */}

            <Button

              size="sm"
              onClick={handleNavigateRoute}
              className="mt-2 mb-3 text-light border-0 py-2 px-4 rounded-pill custom-button"

            >
              Aggiungi esperienza
            </Button>
            {/* </Row> */}

            {experiences.map((experience) => {
              return (
                <CardExperience
                  key={experience._id}
                  experience={experience}
                  token={props.token}
                  profileId={props.profilo._id}
                  onDelete={handleDeleteExperience}
                  onEdit={handleEditExperience}
                />
              );
            })}
          </Col>
        </Row>
      </section>
    </>
  );
};

export default MyExperience;
