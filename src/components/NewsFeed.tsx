import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faNewspaper, faFile } from "@fortawesome/free-solid-svg-icons"; 
import "bootstrap/dist/css/bootstrap.min.css";


interface Post {
  _id: string;
  username: string;
  text: string;
  createdAt: string;
  image?: string; 
}

const NewsFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>("");

  // Endpoint API principale
  const API_URL = "https://striveschool-api.herokuapp.com/api/posts/";

  const API_HEADERS = {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYwMmQ0ZjBlYTI4NjAwMTUyOGI5NjciLCJpYXQiOjE3MzQzNTYzMDMsImV4cCI6MTczNTU2NTkwM30.phVh9zVHPzoKzSOfmqoy-1YEIt4uO9h8tyuHSXJX_vU", // Token da sostituire
  };

  
  useEffect(() => {
    fetchPosts();
  }, []);

  // Funzione per recuperare le notizie
  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: API_HEADERS,
      });
      if (!response.ok) throw new Error("Errore nel recupero delle notizie");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Errore nel recupero dei post:", error);
    }
  };

  // Funzione per creare una nuova notizia/post
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

      if (!response.ok) throw new Error("Errore nella creazione della notizia");
      setNewPost(""); // Resetta il campo input
      fetchPosts(); // Ricarica la lista delle notizie
    } catch (error) {
      console.error("Errore nella creazione del post:", error);
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
        </div>

        
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

      {/* Lista delle notizie */}
      <div className="mt-4">
        {posts.length > 0 ? (
          posts.slice(15, 25).map((post) => (
            <div
              key={post._id}
              className="bg-white p-3 mb-3 border rounded shadow-sm d-flex"
            >
              
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="rounded-circle me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              )}
              <div>
                {/* Header */}
                <div className="d-flex justify-content-between">
                  <h6 className="mb-0 fw-bold">{post.username}</h6>
                  <small className="text-muted">
                    {new Date(post.createdAt).toLocaleString()}
                  </small>
                </div>
               
                <p className="mb-1">{post.text}</p>
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
