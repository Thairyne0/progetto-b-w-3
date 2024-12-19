import {Row, Col } from "react-bootstrap"
import { formatDistanceToNow } from 'date-fns'; 


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
  const formatPublicationDate = (dateString: string) => {
    const date = new Date(dateString); 
    return formatDistanceToNow(date, { addSuffix: true }); 
  };
    return(
        
        <Row>
            <Col className="col col-4 col-md-2  " >
            <img className="img-fluid" src="https://cdn.discordapp.com/attachments/1297816537327210496/1319266581095649361/image.png?ex=6765563f&is=676404bf&hm=4cbc96ff1ddd00b4687388d87d47a37767cb2fb166d143b53564e4ad8be98a33& " alt="foto" />
            </Col>
            <Col className="col col-8 col-md-10 ">
            <h5 className="text-primary m-0">{props.job.title}</h5>
            <p><span>{props.job.company_name} -</span> <span>{props.job.candidate_required_location}-</span> <span>{props.job.job_type}</span></p>
            <p> <span >Data di pubblicazione: </span><span className=" fw-bold"> {formatPublicationDate(props.job.publication_date)}</span></p>

            <hr />
            </Col>
        </Row>
     
    )
}
export default CardJobs