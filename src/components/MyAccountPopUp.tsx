import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

interface UserData {
  name: string;
  surname: string;
  img: string;
  email: string;
}

const MyAccountPopUp = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`, // Your token
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
        setUser({
          name: data.name || "Utente sconosciuto",
          surname: data.surname || "Utente sconosciuto",
          img: data.image || "https://placehold.co/200x200",
          email: data.email || "Email non disponibile",
        });
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!user) {
    // Ritorna un indicatore di caricamento finché i dati non sono disponibili
    return <p>Caricamento...</p>;
  }
  return (
    <div className=" bg-transparent flex flex-column justify-content-center align-items-center">
      <div>
        <img
          src={user!.img}
          alt="user image"
          className=" rounded-circle img-fluid border border-1 border-black"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      </div>
      <h2 className="fw-bold">
        {user!.name} {user!.surname}
      </h2>
      <p>{user!.email}</p>
    </div>
  );
};

export default MyAccountPopUp;
