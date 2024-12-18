import { Container, Row, Col } from "react-bootstrap"

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
  interface JobProps{
    job:Job
  }

const CardJobs=(props:JobProps)=>{
    return(
        <Container>
        <Row>
            <Col className="col col-2 " >
            <img className="img-fluid" src="https://placecats.com/300/200" alt="foto" />
            </Col>
            <Col className="col col-10">
            <h5 className="text-primary m-0">{props.job.title}</h5>
            <p><span>{props.job.company_name} -</span> <span>{props.job.candidate_required_location}-</span> <span>{props.job.job_type}</span></p>
            <hr />
            </Col>
        </Row>
     </Container>
    )
}
export default CardJobs