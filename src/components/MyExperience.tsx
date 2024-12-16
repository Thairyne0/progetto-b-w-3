import { useEffect, useState } from "react";
import CardExperience from "./CardExperience";
import IExperience from "../types/Experience";

const MyExperience = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);


//    fetch per trovare le eseprienze dell'utente tramite l'id del profilo
  const getExperience = () => {
    fetch(
      "https://striveschool-api.herokuapp.com/api/profile/:{id profilo}/experiences"
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
  }, []);

  return experiences.map((e) => {
    return <CardExperience experience={e} />;
  });
};
export default MyExperience;

