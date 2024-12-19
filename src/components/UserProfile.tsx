import React, { useState, useEffect } from "react";
import { Container, Card, Row,  ListGroup , Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faUserGroup, faEnvelope, faCalendar,  } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

// Definizione dell'interfaccia per i dati utente
interface User {
  _id: string;
  name: string;
  surname: string;
  title: string;
  username: string;
  email: string;
  area: string;
  bio: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profileImage?: string;
  backgroundImage?: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>({}); 
  const token = localStorage.getItem("userToken");

  useEffect(() => {

    fetch( "https://striveschool-api.herokuapp.com/api/profile/me",{
      headers: {
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json",
      },
    } )
    .then((response)=>{
      if(response.ok){
      return response.json()
    }else{throw new Error}
  } )
  .then((profilo)=>{
    console.log("profilo", profilo)
    setUser(profilo);
  })
    .catch((err)=>{
      console.log(err)
    })
  }, []);

  return (
    
      <Card >
        {/* Sfondo statico */}
        <div
          style={{
            backgroundColor: '#e9ecef',
            height: '80px',
          }}
        >
          <img
            src="https://via.placeholder.com/400x100" // Sostituisci con la tua immagine di sfondo
            alt="Card Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
  
        {/* Immagine del profilo */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            transform: 'translateY(-50%)',
          }}
        >
          <img
            src="https://via.placeholder.com/100" // Sostituisci con l'immagine del profilo
            alt="Profile"
            style={{
              borderRadius: '50%',
              border: '3px solid white',
              width: '80px',
              height: '80px',
            }}
          />
        </div>
  
        {/* Contenuto della card */}
        <Card.Body className="text-center" style={{ transform: 'translateY(-20px)' }}>
          <Card.Title> <span>{user.name}</span> <span>{user.surname}</span></Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {user.title}
          </Card.Subtitle>
          <Card.Text>{user.area}</Card.Text>
          <Button variant="outline-secondary" className="w-100 mb-2">
            + Esperienza
          </Button>
        </Card.Body>
      </Card>
);
};
  


export default UserProfile;
