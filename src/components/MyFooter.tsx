import { Col, Container, Form, Row } from "react-bootstrap";
import "../App.css";

const MyFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Container
            className="mt-5"
            style={{ backgroundColor: "#F4F2EE" }}
        >
            <Row className="justify-content-around">
                <Col>
                    <small className="footer-text fw-bold">About</small>
                    <br></br>
                    <small className="footer-text fw-bold">
                        Professional Community Policies
                    </small>
                    <Form.Select
                        aria-label="legal-stuff"
                        style={{
                            color: "#7c7c7c",
                            fontSize: "0.777rem",
                            fontWeight: "bold",
                            border: "none",
                            paddingLeft: "0px",
                            width: "130px",
                            backgroundColor: "#F4F2EE",
                        }}
                    >
                        <option className="footer-text fw-bold"> Privacy & Terms </option>
                        <option className="footer-text fw-bold"> Privacy Policy </option>
                        <option className="footer-text fw-bold">User Agreement</option>
                        <option className="footer-text fw-bold">Page Terms</option>
                        <option className="footer-text fw-bold ">Cookie Policy</option>
                        <option className="footer-text fw-bold">Copyright Policy</option>
                        <option className="footer-text fw-bold">
                            Your California privacy choices
                        </option>
                    </Form.Select>
                    <small className="footer-text fw-bold">Sales Solutions</small>
                    <br></br>
                    <small className="footer-text fw-bold">Safety Center</small>
                </Col>
                <Col>
                    <small className="footer-text fw-bold">Accessibility</small>
                    <br></br>
                    <small className="footer-text fw-bold">Careers</small>
                    <br></br>
                    <small className="footer-text fw-bold">Ad Choices</small>
                    <br></br>
                    <small className="footer-text fw-bold">Mobile</small>
                </Col>

                <Col>
                    <small className="footer-text fw-bold">Talent Solutions</small>
                    <br></br>
                    <small className="footer-text fw-bold">Marketing Solutions</small>
                    <br></br>
                    <small className="footer-text fw-bold">Advertising</small>
                    <br></br>
                    <small className="footer-text fw-bold">Small Business</small>
                </Col>
                <Col>
                    <div className="d-flex">
                        <span>
                            <i
                                className="bi bi-question-circle-fill fs-5"
                                style={{ color: "#7c7c7c" }}
                            ></i>
                        </span>{" "}
                        <span className="ms-2">
                            <small
                                style={{
                                    color: "#7c7c7c",
                                    fontSize: "0.800rem",
                                    fontWeight: "bold",
                                }}
                            >
                                Questions?
                            </small>
                            <p className="footer-text mb-2">Visit our Help Center.</p>
                        </span>
                    </div>

                    <div className="d-flex">
                        <span>
                            <i
                                className="bi bi-gear-fill fs-5"
                                style={{ color: "#7c7c7c" }}
                            ></i>{" "}
                        </span>
                        <span className="ms-2">
                            <small
                                style={{
                                    color: "#7c7c7c",
                                    fontSize: "0.800rem",
                                    fontWeight: "bold",
                                }}
                            >
                                Manage your account and privacy
                            </small>
                            <p className="m-0 small mb-2 footer-text">Go to your Settings.</p>
                        </span>
                    </div>

                    <div className="d-flex">
                        <span>
                            <i
                                className="bi bi-shield-shaded fs-5"
                                style={{ color: "#7c7c7c" }}
                            >
                                {" "}
                            </i>
                        </span>
                        <span className="ms-2">
                            <small
                                style={{
                                    color: "#7c7c7c",
                                    fontSize: "0.800rem",
                                    fontWeight: "bold",
                                }}
                            >
                                Recommendation transparency
                            </small>
                            <p className="m-0 small mb-2 footer-text">
                                Learn more about Recommended Content.
                            </p>
                        </span>
                    </div>
                </Col>
                <Col>
                    <p className="mb-1 footer-text">Select Language</p>
                    <Form.Select
                        aria-label="language-selection"
                        style={{
                            color: "#7c7c7c",
                            fontSize: "0.777rem",
                            border: "1px solid black",
                        }}
                    >
                        <option className="footer-text">English &#40;English&#41;</option>
                        <option
                            className="footer-text"
                            value="Italian"
                        >
                            Italian
                        </option>
                        <option
                            className="footer-text"
                            value="Japanese"
                        >
                            Japanese
                        </option>
                        <option
                            className="footer-text"
                            value="German"
                        >
                            German
                        </option>
                    </Form.Select>
                </Col>
            </Row>
            <Row>
                <p className="mb-1 mt-5 footer-text">
                    LinkedIn Corporation &copy; {currentYear}
                </p>
            </Row>
        </Container>
    );
};

export default MyFooter;
