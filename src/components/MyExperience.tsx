import { useEffect, useState } from "react";
import CardExperience from "./CardExperience";
import IExperience from "../types/Experience";

const MyExperience = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);

  const getExperience = () => {
    fetch(
      "https://striveschool-api.herokuapp.com/api/profile/:5d925e677360c41e0046d1f5/experiences"
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

