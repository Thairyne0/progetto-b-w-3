import { Col, Row, Card } from "react-bootstrap";
import IExperience from "../types/Experience";

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

interface ExperienceProps {
  experience: IExperience;
}

const CardExperience = (props: ExperienceProps) => {
  return (
    <Col>
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
            <Card.Title className="mb-0">{props.experience.role}</Card.Title>
            <Card.Text className="text-muted">
              <small>{props.experience.company}</small>
              <br />
              <small>
                {props.experience.startDate} -
                {props.experience.endDate
                  ? props.experience.endDate
                  : "Present"}
                ·
                {Math.floor(
                  Math.abs(
                    new Date(props.experience.endDate || new Date()).getTime() -
                      new Date(props.experience.startDate).getTime()
                  ) /
                    (1000 * 3600 * 24 * 30)
                ) < 12
                  ? `${Math.floor(
                      Math.abs(
                        new Date(
                          props.experience.endDate || new Date()
                        ).getTime() -
                          new Date(props.experience.startDate).getTime()
                      ) /
                        (1000 * 3600 * 24 * 30)
                    )} months`
                  : `${Math.floor(
                      Math.abs(
                        new Date(
                          props.experience.endDate || new Date()
                        ).getTime() -
                          new Date(props.experience.startDate).getTime()
                      ) /
                        (1000 * 3600 * 24 * 365)
                    )} yrs`}
              </small>
              <br />
              <small>{props.experience.area}</small>
            </Card.Text>
            <p>{props.experience.description}</p>
            <Card.Text>Translation, Microsoft Word and +2 skills</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Col>
  );
};

export default CardExperience;
