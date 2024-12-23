import { useState, useEffect } from "react";
import UploadImg from "./UploadImg";
import Form from "react-bootstrap/Form";
import MyNewNavBar from "./MyNewNavBar";
import { useNavigate } from "react-router-dom";

const EditProfile: React.FC = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    surname: "",
    username: "",
    bio: "",
    title: "",
    area: "",
    image: "",
    _id: "",
  });
 const navigate=useNavigate()
  const token: string | null = localStorage.getItem("userToken");

  useEffect(() => {
    fetch("https://striveschool-api.herokuapp.com/api/profile/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfileData({
          name: data.name,
          surname: data.surname,
          username: data.username,
          bio: data.bio,
          title: data.title,
          area: data.area,
          image: data.image,
          _id: data._id,
        });
       
      })
      .catch((error) => console.error("Error fetching profile data:", error));
  }, []);

  const handleUpdateProfile = () => {
    const updatedProfile = {
      name: profileData.name,
      surname: profileData.surname,
      username: profileData.username,
      bio: profileData.bio,
      title: profileData.title,
      area: profileData.area,
      image: profileData.image,
  
    };

    fetch("https://striveschool-api.herokuapp.com/api/profile/", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to update profile");
        }
      })
      .then((data) => {
        console.log("Profile updated successfully", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    alert("Profile Updated");
    navigate("/profile")
  };

  return (
    <div>
      <header>
        <MyNewNavBar></MyNewNavBar>
      </header>
      <main>
        <div className="container mt-5 d-flex flex-column bg-white shadow rounded-3 w-75">
          <h1 className="text-center mt-5 fw-bold"
            style={{ color: '#378FE9' }}>
            Edit Profile
          </h1>

          <Form className="p-5 d-flex flex-column w-75">
            <div className="mb-2 d-flex flex-column mb-3 w-50">
              <label className="fw-bold">Name</label>
              <Form.Control
                id="name-input"
                type="text"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
              />
            </div>
            <div className="mb-2 d-flex flex-column mb-3 w-50">
              <label className="fw-bold">Surname</label>
              <Form.Control
                id="surname-input"
                type="text"
                value={profileData.surname}
                onChange={(e) =>
                  setProfileData({ ...profileData, surname: e.target.value })
                }
              />
            </div>
            <div className="mb-2 d-flex flex-column mb-3 w-50">
              <label className="fw-bold">Username</label>
              <Form.Control
                id="username-input"
                type="text"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
              />
            </div>
            <div className="mb-2 d-flex flex-column mb-3">
              <label className="fw-bold">Bio</label>
              <Form.Control
                id="bio-input"
                type="textarea"
                as="textarea"
                rows={4}
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
              />
            </div>
            <div className="mb-2 d-flex flex-column mb-3">
              <label className="fw-bold">Title</label>
              <Form.Control
                type="text"
                value={profileData.title}
                onChange={(e) =>
                  setProfileData({ ...profileData, title: e.target.value })
                }
              />
            </div>
            <div className="mb-2 d-flex flex-column mb-3">
              <label className="fw-bold">Area</label>
              <Form.Control
                id="location-input"
                type="text"
                value={profileData.area}
                onChange={(e) =>
                  setProfileData({ ...profileData, area: e.target.value })
                }
              />
            </div>

            <div className="mt-5">
              <UploadImg
                userId={profileData._id} // Use the correct userId
                apiUrl={`https://striveschool-api.herokuapp.com/api/profile/${profileData._id}/picture`} // Correct API URL
                token={token} // Token remains the same
                onSuccess={
                  (url: string) =>
                    setProfileData({ ...profileData, image: url }) // Set the image URL after success
                }
                onError={
                  (error: string) =>
                    console.error("Error uploading image:", error) // Handle error
                }
              />
            </div>

            <button
              type="button"
              onClick={handleUpdateProfile}
              style={{ width: "150px", padding: "0.25em 1em", backgroundColor: '#378FE9' }}
              className=" rounded-pill border-0 text-light mt-5 custom-button"
            >
              Save Profile
            </button>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default EditProfile;
