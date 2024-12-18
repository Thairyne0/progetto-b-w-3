import { useState } from "react";
import "./App.css";
import EditProfile from "./components/EditProfile";
import PageAccedi from "./components/PageAccedi";

import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddExperience from "./components/AddExperience";
import Homepage from "./pages/Homepage";
import { Alert } from "react-bootstrap";
import MyJobs from "./components/MyJobs";


function App() {
  // stato
  const [token, settoken] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);
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

  const updateProfileData = (newData: Partial<typeof profileData>) => {
    setProfileData((prevData) => ({ ...prevData, ...newData }));
  };

  // funzione per l'alert
  const handleAlert = (status: boolean) => {
    setAlert(status);
  };

  //  funzione per cambiare lo stato di key
  const HandletokenChange = (value: string) => {
    settoken(value);
    localStorage.setItem("userToken", value);
  };

  // funzione per inviare il form
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <BrowserRouter>
        {alert && (
          <Alert variant="danger">Il token inserito non è valido!</Alert>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <PageAccedi
                handleAlert={handleAlert}
                alert={alert}
                token={token}
                ChangeToken={HandletokenChange}
                onSubmit={handleSubmit}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                handleAlert={handleAlert}
                token={localStorage.getItem("userToken")}
                profileData={profileData}
                updateProfileData={updateProfileData}
              />
            }
          />
          <Route path="/edit-profile" element={<EditProfile></EditProfile>} />
          <Route
            path="/add-experience"
            element={
              <AddExperience
                token={localStorage.getItem("userToken")}
                userId={profileData._id}
              />
            }
          />
          <Route path="/home" element={<Homepage></Homepage>} />
          <Route path="/jobs" element={<MyJobs/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
