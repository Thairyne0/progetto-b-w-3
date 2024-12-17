import { useState, useEffect } from "react";
import UploadImg from "./UploadImg";
import Form from "react-bootstrap/Form";
import MyNewNavBar from "./MyNewNavBar";

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

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzYxMzM4Zjc0YTg2ODAwMTVkYjU1MDgiLCJpYXQiOjE3MzQ0MjM0MzksImV4cCI6MTczNTYzMzAzOX0.FDictyrEQTuSrwL-vVijXHNmMtJuNlp5cdGtobh4suY";

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
  };

  return (
    <div>
      <header>
        <MyNewNavBar></MyNewNavBar>
      </header>
      <main>
        <div className="container border border-2 mt-5 d-flex flex-column shadow-sm bg-white rounded-3">
          <h1 className="text-center mt-5 text-primary fw-bold">
            Edit Profile
          </h1>

          <Form className="p-5 d-flex flex-column">
            <div className="mb-2 d-flex flex-column">
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
            <div className="mb-2 d-flex flex-column">
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
            <div className="mb-2 d-flex flex-column">
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
            <div className="mb-2 d-flex flex-column">
              <label className="fw-bold">Bio</label>
              <Form.Control
                id="bio-input"
                type="textarea"
                as="textarea"
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({ ...profileData, bio: e.target.value })
                }
              />
            </div>
            <div className="mb-2 d-flex flex-column">
              <label className="fw-bold">Title</label>
              <Form.Control
                type="text"
                value={profileData.title}
                onChange={(e) =>
                  setProfileData({ ...profileData, title: e.target.value })
                }
              />
            </div>
            <div className="mb-2 d-flex flex-column">
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

            <div className="mt-2">
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
              style={{ width: "150px", padding: "0.25em 1em" }}
              className="btn-sm border border-primary rounded-pill bg-white text-primary float-start mt-3"
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
