import { Container, Row, Col, Spinner, Button } from "react-bootstrap";
import CardJobs from "./CardJobs";
import { useEffect, useState } from "react";
import MyNewNavBar from "./MyNewNavBar";
import UserProfile from "./UserProfile";
import MyFooter from "./MyFooter";

interface Job {
  _id: string;
  title: string;
  company_name: string;
  description: string;
  category: string;
  candidate_required_location: string;
  job_type: string;
  publication_date: string;
  salary: string;
  url: string;
}

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
const MyJobs = () => {
  const [allJobs, setAllJobs] = useState<Job[]>([]); // Stato che contiene tutti i lavori
  const [visibleJobs, setVisibleJobs] = useState<Job[]>([]); // Stato che contiene solo i lavori visibili (10 alla volta)
  const [currentPage, setCurrentPage] = useState(1); // La pagina corrente per la paginazione
  const jobsPerPage = 10; // Numero di lavori da caricare per pagina
  const [search, setSearch] = useState("");
  const [loading, setloading] = useState(true);
  const [user, setUser] = useState<Partial<User>>({});
  const token = localStorage.getItem("userToken");

  const GetJobs = (query: string = "") => {
    let URL = "https://strive-benchmark.herokuapp.com/api/jobs";
    if (query) {
      URL = `https://strive-benchmark.herokuapp.com/api/jobs?search=${query}`;
    }

    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("errore nel ricevere i dati");
        }
      })
      .then((arrayOfJobs) => {
        console.log(arrayOfJobs);
        setAllJobs(arrayOfJobs.data);
        setVisibleJobs(arrayOfJobs.data.slice(0, jobsPerPage));
        setloading(false);
      })
      .catch((err) => {
        console.log("errore", err);
      });
  };

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

  useEffect(() => {
    GetJobs(search);
  }, [search]);

  const loadMoreJobs = () => {
    const nextPage = currentPage + 1; // Aumenta la pagina corrente
    setCurrentPage(nextPage);

    const nextJobs = allJobs.slice(
      nextPage * jobsPerPage - jobsPerPage,
      nextPage * jobsPerPage
    );
    setVisibleJobs((prevJobs) => [...prevJobs, ...nextJobs]);
  };

  return (
    <>
      <MyNewNavBar search={search} setSearch={setSearch} />
      <Container fluid>
        <Row className=" justify-content-center mt-5">
          <Col className="col col-11 col-md-4 col-lg-3 mb-2 p-0 me-md-3">
            <UserProfile />
          </Col>
          <Col className="col col-11 col-md-7 col-lg-6 bg-light card mb-3">
            <Container>
              <Row>
                <Col className="col col-9">
                  <h4 className="mt-3">
                    {user.name}, stai cercando un nuovo lavoro?
                  </h4>
                  <p className="text-secondary small">
                    Aggiungi le tue preferenze per trovare offerte di lavoro
                    rilevanti e ricevere notifiche sulle nuove posizioni aperte.
                  </p>
                  <div className=" d-flex mb-2">
                    <Button variant="primary" className="rounded-pill me-2">
                      Cerco attivamente
                    </Button>
                    <Button variant="outline-primary" className="rounded-pill ">
                      Occasionalmente do un occhiata
                    </Button>
                  </div>
                </Col>
                <Col className="col col-3">
                  {" "}
                  <img
                    className=" img-fluid"
                    src="./images/uomo.jpg"
                    alt=""
                  />{" "}
                </Col>
              </Row>
            </Container>

            <h5 className=" mt-3">Le principali offerte di lavoro per te </h5>
            <p className="text-secondary small">
              In base al tuo profilo, alle tue preferenze e ad attività come
              candidature, ricerche e salvataggi
            </p>
            {loading && <Spinner animation="border" variant="primary" />}
            {visibleJobs.map((job) => {
              return <CardJobs key={job._id} job={job} />;
            })}
            <div className="text-center">
              {" "}
              <hr />
              <a onClick={loadMoreJobs} className="mt-3 text-black fw-bolder ">
                Visualizza altri
              </a>
            </div>
          </Col>
        </Row>
      </Container>
      <MyFooter />
    </>
  );
};

export default MyJobs;
