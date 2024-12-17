import { ChangeEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
//interfaccia con i campi del form
interface ExperienceForm {
    role: string;
    company: string;
    startDate: string;
    endDate: string | null; // può essere null
    description: string;
    area: string;
    hybrid: boolean;
}

const AddExperience = () => {
    //tipo dello stato è l'interface, imposto i valori iniziali
    const [form, setForm] = useState<ExperienceForm>({
        role: "",
        company: "",
        startDate: "",
        endDate: null, // può essere null
        description: "",
        area: "",
        hybrid: false,
    });
    //funzione per rendere la data come mese-anno
    // const formattedDate = (date: string) => {
    //     return new Date(date).toLocaleDateString('it-IT', { month: 'numeric', year: 'numeric' })

    // }

    // const [image, setImage] = useState<File | null>(null)  //oggetto file

    //funzione per caricare l'immagine
    // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setImage(e.target.files[0]);
    //     }
    // };
    //crea il formData per inviare i dati (serve per l'invio dei file come immagini) e invia con fetch post
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formDataJson = {
            role: form.role,
            company: form.company,
            startDate: form.startDate,
            endDate: form.endDate || "",
            description: form.description,
            area: form.area,
            hybrid: form.hybrid.toString(),
        };

        //se c'è l'immagine, la metto
        // if (image) {
        //     formData.append("image", image);
        // }

        try {
            const response = await fetch(
                "https://striveschool-api.herokuapp.com/api/profile/:675fe42a0ea286001528b928/experiences",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxMzM4Zjc0YTg2ODAwMTVkYjU1MDgiLCJpYXQiOjE3MzQ0MjM0MzksImV4cCI6MTczNTYzMzAzOX0.FDictyrEQTuSrwL-vVijXHNmMtJuNlp5cdGtobh4suY",
                    },
                    body: JSON.stringify(formDataJson),
                }
            );

            if (response.ok) {
                //resetta il form
                setForm({
                    role: "",
                    company: "",
                    startDate: "",
                    endDate: null,
                    description: "",
                    area: "",
                    hybrid: false,
                });
            } else {
                throw new Error("Errore nel caricamento dell'esperienza");
            }
        } catch (error) {
            console.log(error);
        }
    };

    //gestisce i campi input del form (quando vengono modificati). Aggiorna lo stato a ogni modifica.

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        // name è role
        const { name, value, type, checked } = e.target; //mi prende quello che digito
        setForm((form) => ({
            ...form,

            //tra quadre significa che uso il valore della variabile come nome della proprietà: la proprietà è checkbox? è selezionata(checked)? se sì, riporta il suo valore nello stato
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    return (
        <Container fluid>
            <Row>
                <Col className="col-5 m-auto shadow p-3 mb-5 bg-body-tertiary rounded justify-content-center d-flex">
                    <Form onSubmit={handleSubmit} className="w-100">
                        <Form.Group className="mb-3 w-75">
                            <Form.Label className=" fs-5">Ruolo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ruolo ricoperto"
                                name="role"
                                value={form.role}
                                onChange={handleInput}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 w-75">
                            <Form.Label className="fs-5">Azienda</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nome azienda"
                                name="company"
                                value={form.company}
                                onChange={handleInput}
                            />
                        </Form.Group>
                        <span className="d-flex">
                            <Form.Group className="mb-3 w-25">
                                <Form.Label className="fs-5">Data inizio</Form.Label>
                                <Form.Control
                                    type="month"
                                    name="startDate"
                                    value={form.startDate}
                                    onChange={handleInput}
                                />
                                {/* { */}
                                {/* form.startDate && (<p>{formattedDate(form.startDate)}</p>) */}
                                {/* } */}
                            </Form.Group>
                            <Form.Group className="mb-3 w-25 ms-5">
                                <Form.Label className="fs-5">Data fine</Form.Label>
                                {/* può non avere una fine, metto O stringa vuota */}
                                <Form.Control
                                    type="month"
                                    name="endDate"
                                    value={form.endDate || ""}
                                    onChange={handleInput}
                                />
                                {/* formato data corretto! {form.endDate && (<p>{formattedDate(form.endDate)}</p>)} */}
                            </Form.Group>
                        </span>
                        <Form.Group className="mb-3">
                            <Form.Label className="fs-5">Descrizione</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="I tuoi compiti all'interno dell'azienda"
                                name="description"
                                value={form.description}
                                onChange={handleInput}
                            />
                        </Form.Group>
                        <span className="d-flex align-items-center flex-wrap">
                            <Form.Group
                                className="mb-3"
                                style={{ width: "280px" }}
                            >
                                <Form.Label className="fs-5">Sede dell'azienda</Form.Label>
                                {/* si potrebbe implementare l'api di google per far sì che si possa mettere un indirizzo reale */}
                                <Form.Control
                                    type="text"
                                    placeholder="Luogo in cui ha sede l'azienda"
                                    name="area"
                                    value={form.area}
                                    onChange={handleInput}
                                />
                            </Form.Group>
                            <Form.Group
                                className="ms-5 mt-4 align-self-center fs-6"

                                controlId="formBasicCheckbox"
                            >
                                <span className=""><Form.Check
                                    type="checkbox"
                                    label={
                                        <span className="ms-2">
                                            Ibrido/Smart Working
                                        </span>
                                    }
                                    name="hybrid"
                                    checked={form.hybrid}
                                    onChange={handleInput}
                                /></span>
                            </Form.Group>
                        </span>
                        {/* <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Aggiungi un'immagine</Form.Label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {/* così accetta solo file che sono immagini */}
                        {/* </Form.Group> */}

                        <Button id="submitButton"

                            type="submit"
                            className="my-4 fw-bold pt-2 px-3" style={{ borderRadius: '30px' }}
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddExperience;
