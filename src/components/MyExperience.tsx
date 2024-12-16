import { useEffect, useState } from "react";
import CardExperience from "./CardExperience";
import IExperience from "../types/Experience";
import TokenProps from "../types/Hero";


const MyExperience = (props:TokenProps) => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  

//    fetch per trovare le eseprienze dell'utente tramite l'id del profilo
  const getExperience = () => {
    fetch(
      `https://striveschool-api.herokuapp.com/api/profile/:${props.token}/experiences`
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

  return (
    <>
    <section className="m-0 mt-5 m-md-5 bg-white rounded-3">
  <h4>Experience</h4>
    {experiences.map((e) => {
    return (
    <CardExperience experience={e} />)
  })}
  </section>
  </>
)}

export default MyExperience;

