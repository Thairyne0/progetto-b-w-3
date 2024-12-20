import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

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
  const [user, setUser] = useState<Partial<User>>({});
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error();
        }
      })
      .then((profilo) => {
        console.log("profilo", profilo);
        setUser(profilo);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="border-0 bg-white shadow rounded-3">
      {/* Sfondo statico */}
      <div
        style={{
          backgroundColor: "#e9ecef",
          height: "80px",
        }}
      >
        <img
          src="./images/dow.jpg"
          alt="Card Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          className=" rounded-top-2"
        />
      </div>

      {/* Immagine del profilo */}
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          transform: "translateY(-50%)",
        }}
      >
        <img
          src={user.image || "https://via.placeholder.com/300x80"}
          alt="Profile"
          style={{
            borderRadius: "50%",
            border: "3px solid white",
            width: "80px",
            height: "80px",
          }}
        />
      </div>

      {/* Contenuto della card */}
      <Card.Body
        className="text-center py-0"
        style={{ transform: "translateY(-20px)" }}
      >
        <Card.Title>
          {" "}
          <span>{user.name}</span> <span>{user.surname}</span>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.title}</Card.Subtitle>
        <Card.Text className="small">{user.area}</Card.Text>
        <Button variant="outline-secondary" className="w-100 mb-2">
          + Esperienza
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserProfile;
