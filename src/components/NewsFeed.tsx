import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faNewspaper, faFile } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

// Definizione dei tipi per i Post e i Commenti
interface Post {
  _id: string;
  username: string;
  text: string;
  createdAt: string;
  image: string;
}

interface Comment {
  _id: string;
  postId: string;
  comment: string;
  rate: string; // La valutazione è una stringa
  elementId: string; // L'elementId è l'ID del post
  createdAt: string;
}

const NewsFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({}); // Commenti per ogni postId
  const [newPost, setNewPost] = useState<string>(""); // Nuovo post da creare
  const [newComment, setNewComment] = useState<Record<string, { comment: string; rate: string }>>({}); // Commenti da inviare

  // URL e headers per le API
  const API_URL = "https://striveschool-api.herokuapp.com/api/posts/";
  const API_HEADERS = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3NDc1YmFlZGU3ODAwMTU3OTM2MTEiLCJpYXQiOjE3MzQ0NDg2MTAsImV4cCI6MTczNTY1ODIxMH0.9M3_iOp0WjTJTZA02nb1HfnKBK_QRacWehSalKJwcYI", // Token da sostituire con quello corretto
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Funzione per recuperare i post
  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: API_HEADERS,
      });
      if (!response.ok) throw new Error("Errore nel recupero dei post");
      const data = await response.json();
      setPosts(data);

      // Recuperiamo i commenti per ogni post
      data.forEach((post: Post) => fetchComments(post._id));
    } catch (error) {
      console.error("Errore nel recupero dei post:", error);
    }
  };

  // Funzione per recuperare i commenti di un post
  const fetchComments = async (postId: string) => {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments?elementId=${postId}`,
        {
          method: "GET",
          headers: API_HEADERS,
        }
      );

      if (!response.ok) throw new Error("Errore nel recupero dei commenti");

      const data = await response.json();
      const limitedComments = data.slice(0, 5); // Limitiamo a 5 commenti
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: limitedComments,
      }));
    } catch (error) {
      console.error("Errore nel recupero dei commenti:", error);
    }
  };

  // Funzione per creare un nuovo post
  const createPost = async () => {
    if (!newPost) return;

    const postData = {
      text: newPost,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_HEADERS.Authorization,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error("Errore nella creazione del post");
      setNewPost(""); // Resetta il campo input
      fetchPosts(); // Ricarica la lista dei post
    } catch (error) {
      console.error("Errore nella creazione del post:", error);
    }
  };

  // Funzione per creare un nuovo commento
  const createComment = async (postId: string) => {
    const { comment, rate } = newComment[postId];
    if (!comment || !rate) return;

    const commentData = {
      comment: comment,
      rate: rate,
      elementId: postId, // L'elementId è l'ID del post
    };

    try {
      const response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_HEADERS.Authorization,
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) throw new Error("Errore nella creazione del commento");
      setNewComment((prev) => ({ ...prev, [postId]: { comment: "", rate: "" } })); // Resetta i campi input
      fetchComments(postId); // Ricarica i commenti del post
    } catch (error) {
      console.error("Errore nella creazione del commento:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Form per creare una nuova notizia */}
      <div className="mt-3 bg-white p-3 border rounded shadow-sm">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Start a post, try writing with AI"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button className="btn btn-success" onClick={createPost}>
            Post
          </button>
          <Container className="text-center">
            <Row>
              <Col>
                <FontAwesomeIcon icon={faImages} size="2x" className="text-primary" /> <span>Media</span>
              </Col>
              <Col>
                <FontAwesomeIcon icon={faNewspaper} size="2x" className="text-danger" /><span>Contribute Expertise</span>
              </Col>
              <Col>
                <FontAwesomeIcon icon={faFile} size="2x" className="text-success" /> <span>Write Article</span>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Lista dei post */}
      <div className="mt-4">
        {posts.length > 0 ? (
          posts.slice(25, 35).map((post) => (
            <div key={post._id} className="bg-white p-3 mb-3 border rounded shadow-sm d-flex">
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              )}
              <div>
                <div className="d-flex justify-content-between">
                  <h6 className="mb-0 fw-bold">{post.username}</h6>
                  <small className="text-muted">{new Date(post.createdAt).toLocaleString()}</small>
                </div>
                <p className="mb-1">{post.text}</p>

                {/* Sezione dei commenti */}
                <div className="mt-3">
                  <h6>Commenti:</h6>
                  <div>
                    {comments[post._id]?.map((comment) => (
                      <div key={comment._id}>
                        <p>
                          <strong>{comment.comment}</strong> - <span>{comment.rate}⭐</span>
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Form per aggiungere un nuovo commento */}
                  <div className="input-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Aggiungi un commento..."
                      value={newComment[post._id]?.comment || ""}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [post._id]: { ...prev[post._id], comment: e.target.value },
                        }))
                      }
                    />
                    <input
                      type="number"
                      className="form-control ms-2"
                      placeholder="Valutazione (1-5)"
                      value={newComment[post._id]?.rate || ""}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [post._id]: { ...prev[post._id], rate: e.target.value },
                        }))
                      }
                    />
                    <button className="btn btn-pill" style={{ backgroundColor: '#378FE9' }} onClick={() => createComment(post._id)}>
                      Commenta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Caricamento notizie in corso...</p>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
