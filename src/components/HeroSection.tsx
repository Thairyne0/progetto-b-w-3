import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenProps from "../types/Hero";

const HeroSection = (props:TokenProps) => {
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
    name: "",
    surname: "",
    username: "",
    bio: "",
    title: "",
    area: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  useEffect(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      headers: {
        Authorization:
          `Bearer ${props.token}`, // Your token
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
        });
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <section className="m-0 mt-5 m-md-5 bg-white rounded-3">
        <div
          className=" rounded-top-3"
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
              src={profileData.image}
            ></img>
            <button style={cameraButtonStyle}>
              <i className="bi bi-camera"></i>
            </button>
          </div>
        </div>
        <div className="border border-2 p-5 rounded-bottom-3">
          <h1>
            {profileData.name} {profileData.surname}
          </h1>
          <h2>{profileData.title}</h2>
          <p>{profileData.area}</p>
          <p>{profileData.bio}</p>
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
              onClick={handleEditProfile}
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
