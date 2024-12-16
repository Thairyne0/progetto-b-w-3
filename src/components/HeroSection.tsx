import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const imgHeroStyle = {
    borderRadius: "50%",
    width: "9em",
    height: "9em",
    position: "relative" as React.CSSProperties["position"],
    zIndex: "1",
    top: "90%",
    left: "15%",
    transform: "translate(-50%, -50%)",
  };

  const cameraButtonStyle = {
    position: "absolute" as React.CSSProperties["position"],
    top: "15%",
    right: "30%",
    zIndex: 2,
    backgroundColor: "white",
    border: "none",
    borderRadius: "50%",
    padding: "0.5em",
  };

  const buttonStyles = (hovered: boolean) => ({
    backgroundColor: hovered ? "blue" : "white",
    border: "blue 1px solid",
    color: hovered ? "white" : "blue",
    margin: "0.5em",
    borderRadius: "30px",
    padding: "0.25em 1em",
    cursor: "pointer",
  });

  const containerImg = {
    position: "relative" as React.CSSProperties["position"],
    display: "inline-block",
    left: "10%",
    top: "90%",
  };

  const [hoveredButton1, setHoveredButton1] = useState(false);
  const [hoveredButton2, setHoveredButton2] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    surname: '',
    username: '',
    bio: '',
    title: '',
    area: '',
    image: '',   

  })

  useEffect(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzVmZTQyYTBlYTI4NjAwMTUyOGI5MjgiLCJpYXQiOjE3MzQzNDgyMDIsImV4cCI6MTczNTU1NzgwMn0.SJckLJO8QVlGPUJQYCZM4ftYV_vnB58ae91FqnJcb6o", // Your token
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch data");
        }
      })

      .then((data) => {
        console.log(data);
        setProfileData({
            name: data.name,
            surname: data.surname,
            username: data.username,
            bio: data.bio,
            title: data.title,
            area: data.area,
            image: data.image,  
        })
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <section className="m-5">
        <div
          style={{
            backgroundImage: "url(https://placehold.co/400)",
            height: "200px",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            // zIndex: 1,
          }}
        >
          <div style={containerImg}>
            <img
              style={imgHeroStyle}
              alt="profile-picture"
              src="https://placecats.com/300/200"
            ></img>
            <button style={cameraButtonStyle}>
              <i className="bi bi-camera"></i>
            </button>
          </div>
        </div>
        <div className="border border-2 p-5 ">
          <h1>{profileData.name} {profileData.surname}</h1>
          <h2>{profileData.title}</h2>
          <p>{profileData.area}</p>
          <a
            href="
            #"
          >
            {" "}
            Informazioni di contatto
          </a>
          <div className="hero-buttons">
            <button
              style={buttonStyles(hoveredButton1)}
              onMouseEnter={() => setHoveredButton1(true)}
              onMouseLeave={() => setHoveredButton1(false)}
            >
              Modifica Profilo
            </button>
            <button
              style={buttonStyles(hoveredButton2)}
              onMouseEnter={() => setHoveredButton2(true)}
              onMouseLeave={() => setHoveredButton2(false)}
            >
              Aggiungi sezione del profilo
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
