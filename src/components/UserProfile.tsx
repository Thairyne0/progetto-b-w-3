import React, { useState, useEffect } from "react";
import { Container, Card, Row, Col, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faUserGroup, faEnvelope, faCalendar, faSquare } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

// Definizione dell'interfaccia per i dati utente
interface User {
  name?: string;
  role?: string;
  location?: string;
  profileViews?: number;
  premiumOffer?: string;
  profileImage?: string;
  backgroundImage?: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>({}); 

  useEffect(() => {
    // Carica i dati utente da localStorage
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const userData: User = JSON.parse(token); 
        setUser(userData);
      } catch (error) {
        console.error("Errore nel parsing dei dati utente", error);
      }
    }
  }, []);

  return (
    <Container>
      <Card style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
        {/* Intestazione Profilo con Immagine di Sfondo Dinamica */}
        <Card.Img
          src={user.backgroundImage || "https://via.placeholder.com/400x100"}
          alt="background"
        />
        <Card.Body className="text-start">
          {/* Immagine Profilo */}
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto",
              marginTop: "-40px",
              border: "3px solid white",
            }}
          >
            <img
              src={user.profileImage || "https://via.placeholder.com/80"}
              alt="Profile"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          {/* Informazioni Dinamiche */}
          <h5 className="mt-2">{user.name || "Nome Utente"}</h5>
          <p className="text-muted">{user.role || "Ruolo non disponibile"}</p>
          <p className="text-muted">
            {user.location || "Località non disponibile"}
          </p>
          {/* Sezione Analitica */}
          <Row className="justify-content-start">
            <Col xs="auto">
              <p style={{ fontSize: "14px" }} className="m-0">
                <strong>Profile viewers</strong>{" "}
                <span style={{ color: "blue" }}>
                  {user.profileViews || 0}
                </span>
              </p>
            </Col>
          </Row>
          {/* Link per Reactivate Premium */}
          <p className="mt-2" style={{ fontSize: "14px" }}>
            <FontAwesomeIcon icon={faSquare} />{" "}
            <a
              href="#reactivate"  // Puoi modificare questo link per fare una navigazione vera o aggiungere una logica per l'azione
              style={{
                color: "orange",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Reactivate Premium: <strong>{user.premiumOffer || "50% Off"}</strong>
            </a>
          </p>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item> <FontAwesomeIcon icon={faBookmark} /> Saved items</ListGroup.Item>
          <ListGroup.Item> <FontAwesomeIcon icon={faUserGroup} /> Groups</ListGroup.Item>
          <ListGroup.Item> <FontAwesomeIcon icon={faEnvelope} /> Newsletters</ListGroup.Item>
          <ListGroup.Item> <FontAwesomeIcon icon={faCalendar} /> Events</ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default UserProfile;
