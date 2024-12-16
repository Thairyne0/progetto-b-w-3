import 'bootstrap-icons/font/bootstrap-icons.css';


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
    position: "absolute" as React.CSSProperties['position'],
    top: "15%",
    right: "30%",
    zIndex: 2,
    backgroundColor: "white",
    border: "none",
    borderRadius: "50%",
    padding: "0.5em",
   
  };


  const containerImg = {
    position: "relative" as React.CSSProperties['position'],
     display: "inline-block" ,
     left: '10%',
     top: '90%'
  }
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
          <img style={imgHeroStyle} src="https://placecats.com/300/200"></img>
          <button style={cameraButtonStyle}><i className="bi bi-camera" ></i></button>
          </div>
        </div>
        <div className="border border-2 p-5 ">
          <h1>name surname</h1>
          <h2>title</h2>
          <p>area</p>
          <a
            href="
            #"
          >
            {" "}
            Informazioni di contatto
          </a>
          <div className="hero-buttons">
            <button>Modifica Profilo</button>
            <button>Aggiungi sezione del profilo</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
