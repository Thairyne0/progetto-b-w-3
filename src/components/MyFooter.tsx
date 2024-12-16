import { Col, Container, Form, Row } from "react-bootstrap"
import "../App.css"



const MyFooter = () => {

    const currentYear = new Date().getFullYear()

    return (
        <Container className="mt-3">
            <Row>
                <Col className="col-xs-1 col-md-2">
                    <small className="footer-text">About</small><br></br>
                    <small className="footer-text">Professional Community Policies</small>
                    <Form.Select aria-label="legal-stuff" style={{ color: '#7c7c7c', fontSize: '0.777rem', border: 'none', paddingLeft: '0px', width: '70%' }}>
                        <option className="footer-text fw-bold"> Privacy Policy </option>
                        <option className="footer-text fw-bold" >User Agreement</option>
                        <option className="footer-text fw-bold">Page Terms</option>
                        <option className="footer-text fw-bold ">Cookie Policy</option>
                        <option className="footer-text fw-bold">Copyright Policy</option>
                        <option className="footer-text fw-bold">Your California privacy choices</option>
                    </Form.Select>
                    <small className="footer-text">Sales Solutions</small><br></br>
                    <small className="footer-text">Safety Center</small>
                </Col>
                <Col className="col-xs-1 col-md-2">
                    <small className="footer-text">Accessibility</small><br></br>
                    <small className="footer-text">Careers</small><br></br>
                    <small className="footer-text">Ad Choices</small><br></br>
                    <small className="footer-text">Mobile</small>
                </Col>
                <Col className="col-xs-1 col-md-2">
                    <small className="footer-text">Talent Solutions</small><br></br>
                    <small className="footer-text">Marketing Solutions</small><br></br>
                    <small className="footer-text">Advertising</small><br></br>
                    <small className="footer-text">Small Business</small>
                </Col>

                <Col className="col-xs-3 col-md-3">
                    <div className="d-flex"><span><i className="bi bi-question-circle-fill fs-5" style={{ color: '#7c7c7c' }}></i></span> <span className="ms-2"><small style={{ color: '#7c7c7c', fontSize: '0.800rem', fontWeight: 'bold' }}>Questions?</small><p className="footer-text">Visit our Help Center.</p></span></div>



                    <div className="d-flex"><span><i className="bi bi-gear-fill fs-5" style={{ color: '#7c7c7c' }}></i> </span><span className="ms-2"><small style={{ color: '#7c7c7c', fontSize: '0.800rem', fontWeight: 'bold' }}>Manage your account and privacy</small><p className="m-0 small mb-2 footer-text">Go to your Settings.</p></span></div>


                    <div className="d-flex"><span><i className="bi bi-shield-shaded fs-5" style={{ color: '#7c7c7c' }}> </i></span><span className="ms-2"><small style={{ color: '#7c7c7c', fontSize: '0.800rem', fontWeight: 'bold' }}>Recommendation transparency</small><p className="m-0 small mb-2 footer-text">Learn more about Recommended Content.</p></span></div>
                </Col>
                <Col className="col-xs-3 col-md-2"><p className="mb-1 footer-text">Select Language</p>
                    <Form.Select aria-label="language-selection" style={{ color: '#7c7c7c', fontSize: '0.777rem', border: '1px solid black' }}>
                        <option className="footer-text">English &#40;English&#41;</option>
                        <option className="footer-text" value="Italian">Italian</option>
                        <option className="footer-text" value="Japanese">Japanese</option>
                        <option className="footer-text" value="German">German</option>
                    </Form.Select>



                </Col>
            </Row >
            <Row>
                <p className="mb-1 mt-5 footer-text">LinkedIn Corporation &copy; {currentYear}</p>




            </Row>
        </Container >
    )
}

export default MyFooter