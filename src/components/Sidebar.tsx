import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";

interface Contact {
  _id: string;
  name: string;
  surname: string;
  title: string;
  image: string;
}

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]); // Stato per i contatti
  const [loading, setLoading] = useState<boolean>(true); // Stato per il caricamento

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/profile/",
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYwMmQ0ZjBlYTI4NjAwMTUyOGI5NjciLCJpYXQiOjE3MzQzNTYzMDMsImV4cCI6MTczNTU2NTkwM30.phVh9zVHPzoKzSOfmqoy-1YEIt4uO9h8tyuHSXJX_vU", // Token da sostituire
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Errore API: ${response.status} ${response.statusText}`
        );
      }

      const data: Contact[] = await response.json();
      setContacts(data); // Imposta i contatti nello stato
    } catch (error) {
      console.error("Errore nel caricamento dei contatti:", error);
    } finally {
      setLoading(false); // Imposta lo stato di caricamento a false
    }
  };

  useEffect(() => {
    fetchContacts(); // Carica i contatti al montaggio del componente
  }, []);

  if (loading) {
    return <div className="text-center mt-3">Caricamento...</div>;
  }

  return (
    <div className="d-flex flex-column p-3 text-start bg-white shadow rounded-3 mb-5 mb-md-2">
      <div className="mb-3">
        <h6 className="fw-bold">Lingua del profilo</h6>
        <p className="text-muted mb-0">Italiano</p>
      </div>

      <div className="mb-3">
        <h6 className="fw-bold">Profilo pubblico e URL</h6>
        <p className="text-primary mb-0">
          <a href="#" target="_blank" className="text-decoration-none"></a>
        </p>
      </div>

      <hr />

      {/* Persone che potresti conoscere */}
      <div>
        <h6 className="fw-bold mb-3">Persone che potresti conoscere</h6>
        {contacts.length > 0 ? (
          contacts.slice(5, 10).map((contact) => (
            <div
              key={contact._id}
              className="d-flex align-items-center mb-3 border p-2 rounded"
            >
              <img
                src={contact.image}
                alt={`${contact.name} ${contact.surname}`}
                className="rounded-circle me-3"
                width="50"
                height="50"
              />
              <div>
                <p className="fw-bold mb-0">
                  {contact.name} {contact.surname}
                </p>
                <p className="text-muted mb-1">
                  {contact.title || "Titolo non disponibile"}
                </p>
                <button className="btn btn-sm btn-outline-dark">
                  <i className="fa fa-user-plus"></i> Collegati
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">Nessun contatto trovato.</p>
        )}
      </div>
    </div>
  );
};

export default ContactsList;
