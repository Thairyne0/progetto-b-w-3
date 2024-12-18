import { Col, Row, Card, Button } from "react-bootstrap";
import IExperience from "../types/Experience";
import { useNavigate } from "react-router-dom";

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
  onDelete: (experienceId: string) => void;
}

const CardExperience = (props: ExperienceProps) => {
  const navigate = useNavigate()

  const handleEdit = () => {
    navigate(`/edit-profile/`)
  }


  //metodo delete per eliminare l'esperienza
  const handleDelete = async () => {
    if (props.token) {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/profile/${props.profileId}/experiences/${props.experience._id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": 'application/json',
          Authorization: `Bearer ${props.token}`
        },

      })

      if (response.ok) {
        //creo un nuovo array con filter in cui metto solo gli elementi che non hanno lo stesso id derll'esperienza che voglio eliminare
        //aggiorno lo stato con quel nuovo array
        props.onDelete(props.experience._id)
      } else { throw new Error("Errore nell'eliminazione dell'esperienza") }

    }
  }


  return (
    <>
      <Row className="justify-content-center mt-3">
        <Col className="col col-10 col-md-10">
          <Row className="g-2">
            <Col className="col-2 col-md-1 ">
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
            <Col className="col-10 col-md-11">
              <Card.Body>
                <Button onClick={() => handleEdit()}>
                  Modifica esperienza
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Elimina esperienza
                </Button><Card.Title className="mb-0">
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
                    ·
                    {" "}{(() => {
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
        </Col>
      </Row>
      <hr />
    </>
  );
};

export default CardExperience;
