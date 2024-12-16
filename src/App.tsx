// import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./App.css";
import EditProfile from "./components/EditProfile";
// import PageAccedi from "./components/PageAccedi";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // // stato
  // const [token, settoken] = useState<string>("");

  // //  funzione per cambiare lo stato di key
  // const HandletokenChange = (value: string) => {
  //   settoken(value);
  // };

  // // funzione per inviare il form
  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  // };

  return (
    <>
      <BrowserRouter>
      
<Routes>
  <Route path="/" element={<Navigate to="/profile" />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/edit-profile" element={<EditProfile />} />
</Routes>
      </BrowserRouter>
      {/* <PageAccedi
        token={token}
        ChangeToken={HandletokenChange}
        onSubmit={handleSubmit}
      /> */}
    </>
  );
}

export default App;
