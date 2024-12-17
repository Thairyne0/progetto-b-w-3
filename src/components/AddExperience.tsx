import { ChangeEvent, useState } from "react"
import { Button, Form } from "react-bootstrap"
//interfaccia con i campi del form
interface ExperienceForm {
    role: string,
    company: string,
    startDate: string,
    endDate: string | null, // può essere null
    description: string,
    area: string,
    hybrid: boolean

}

const AddExperience = () => {
    //tipo dello stato è l'interface, imposto i valori iniziali
    const [form, setForm] = useState<ExperienceForm>({

        role: '',
        company: '',
        startDate: '',
        endDate: null, // può essere null
        description: '',
        area: '',
        hybrid: false

    })

    // const [image, setImage] = useState<File | null>(null)  //oggetto file

    //funzione per caricare l'immagine
    // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setImage(e.target.files[0]);
    //     }
    // };
    //crea il formData per inviare i dati (serve per l'invio dei file come immagini) e invia con fetch post
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formDataJson = {
            role: form.role,
            company: form.company,
            startDate: form.startDate,
            endDate: form.endDate || "",
            description: form.description,
            area: form.area,
            hybrid: form.hybrid.toString()
        };

        //se c'è l'immagine, la metto
        // if (image) {
        //     formData.append("image", image);
        // }


        try {
            const response = await fetch('https://striveschool-api.herokuapp.com/api/profile/:675fe42a0ea286001528b928/experiences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxMzM4Zjc0YTg2ODAwMTVkYjU1MDgiLCJpYXQiOjE3MzQ0MjM0MzksImV4cCI6MTczNTYzMzAzOX0.FDictyrEQTuSrwL-vVijXHNmMtJuNlp5cdGtobh4suY'
                },
                body: JSON.stringify(formDataJson)
            })


            if (response.ok) {
                //resetta il form
                setForm({
                    role: '',
                    company: '',
                    startDate: '',
                    endDate: null,
                    description: '',
                    area: '',
                    hybrid: false
                })


            } else { throw new Error("Errore nel caricamento dell'esperienza") }
        } catch (error) {
            console.log(error)
        }
    }


    //gestisce i campi input del form (quando vengono modificati). Aggiorna lo stato a ogni modifica.

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        // name è role
        const { name, value, type, checked } = e.target;  //mi prende quello che digito
        setForm((form) => ({
            ...form,

            //tra quadre significa che uso il valore della variabile come nome della proprietà: la proprietà è checkbox? è selezionata(checked)? se sì, riporta il suo valore nello stato
            [name]: type === 'checkbox' ? checked : value
        }))

    }

    return (

        <Form onSubmit={handleSubmit} >
            <Form.Group className="mb-3" >
                <Form.Label>Ruolo</Form.Label>
                <Form.Control type="text" placeholder="Ruolo ricoperto" name="role" value={form.role} onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Azienda</Form.Label>
                <Form.Control type="text" placeholder="Nome azienda" name="company" value={form.company} onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Data inizio</Form.Label>
                <Form.Control type="month" name="startDate" value={form.startDate} onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Data fine</Form.Label>
                {/* può non avere una fine, metto O stringa vuota */}
                <Form.Control type="month" name="endDate" value={form.endDate || ''} onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Descrizione</Form.Label>
                <Form.Control type="text" placeholder="I tuoi compiti all'interno dell'azienda" name="description" value={form.description} onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Sede dell'azienda</Form.Label>
                <Form.Control type="text" placeholder="Luogo in cui ha sede l'azienda" name="area" value={form.area} onChange={handleInput} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Ibrido/Smart Working" name="hybrid" checked={form.hybrid} onChange={handleInput} /></Form.Group>
            {/* <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Aggiungi un'immagine</Form.Label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {/* così accetta solo file che sono immagini */}
            {/* </Form.Group> */}

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default AddExperience