import { Container, Row, Col } from "react-bootstrap";
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



const MyJobs = () => {
  const [allJobs, setAllJobs] = useState<Job[]>([]); // Stato che contiene tutti i lavori
  const [visibleJobs, setVisibleJobs] = useState<Job[]>([]); // Stato che contiene solo i lavori visibili (10 alla volta)
  const [currentPage, setCurrentPage] = useState(1); // La pagina corrente per la paginazione
  const jobsPerPage = 10; // Numero di lavori da caricare per pagina
  const[search, setSearch]=useState("")



  const GetJobs = (query:string="") => {
    let URL="https://strive-benchmark.herokuapp.com/api/jobs"
    if(query) {
        URL=`https://strive-benchmark.herokuapp.com/api/jobs?search=${query}`
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
      })
      .catch((err) => {
        console.log("errore", err);
      });
  };

 

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
  setVisibleJobs((prevJobs) => [...prevJobs, ...nextJobs])};

  return (
    <>
      <MyNewNavBar search={search} setSearch={setSearch} />
      <Container fluid>
        <Row className=" justify-content-center mt-5">
          <Col className="col col-11 col-md-4 col-lg-3 mb-2 p-0 me-md-3">
           <UserProfile />
          </Col>
          <Col className="col col-11 col-md-7 col-lg-6 bg-light rounded-3 card">
            <h5 className=" mt-3">Le principali offerte di lavoro per te </h5>
            <p className="text-secondary small">
              In base al tuo profilo, alle tue preferenze e ad attività come
              candidature, ricerche e salvataggi
            </p>
            {visibleJobs.map((job) => {
              return <CardJobs key={job._id} job={job} />;
            })}
    <div className="text-center"> <hr /><a onClick={loadMoreJobs} className="mt-3 text-black fw-bolder ">
              Visualizza altri
            </a></div>
            
          </Col>
        </Row>
      </Container>
      <MyFooter/>
    </>
  );
};

export default MyJobs;
