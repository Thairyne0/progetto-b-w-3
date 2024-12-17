import { useEffect, useState } from "react";
import CardExperience from "./CardExperience";
import IExperience from "../types/Experience";

import { Card, Row, Col, Button, } from "react-bootstrap";
import ProfileData from "../types/profileData";

 
interface myExperienceProps{
    profilo:ProfileData
    token:string
}


const MyExperience = (props:myExperienceProps) => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  console.log("questo", props.token)
  console.log("questo", props.profilo._id)

//    fetch per trovare le eseprienze dell'utente tramite l'id del profilo
  const getExperience = () => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/profile/${props.profilo._id}/experiences`, {
        headers: {
            Authorization:
              `Bearer ${props.token}`,
        
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

  return (
    <>
    <section className="m-0 mt-5 m-md-5 bg-white rounded-3">
  <h4>Experience</h4>
  <Col className="col col-10 border border-muted  rounded-2 ms-3 ps-2" >
        <h5  className="text-muted m-0">Esperienza</h5>
         <small className="m-0 text-secondary mb-2">Metti in risalto i risultati raggiunti e ottieni fino a 2 volte in più visualizzazioni del profilo e collegamenti  </small>
      <Row className="g-2">
        <Col className="col-2 col-md-2 mt-3 col-lg-1 ">
        <i className="bi bi-briefcase-fill px-3 py-2 border border-secondary text-muted rounded-2"></i>
        </Col>
        <Col className="col-10 col-md-10 col-lg-11">
          <Card.Body>
            <small className="m-0 text-muted">Qualifica</small>
            <Card.Text className="text-muted m-0">
              <small>organizzazione</small>
              <br />
              
              <small className="text-muted">2023-presente</small>
            </Card.Text>
            <Button variant="outline-primary" size="sm">Aggiungi esperienza</Button>
          </Card.Body>
        </Col>
      </Row>
    </Col>
            
          
    {experiences.map((e) => {
    return (
    <CardExperience experience={e} />)
  })}
  </section>
  </>
)}

export default MyExperience;

