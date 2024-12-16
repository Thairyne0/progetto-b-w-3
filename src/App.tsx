import { useState } from "react";
import "./App.css";
import EditProfile from "./components/EditProfile";
import PageAccedi from "./components/PageAccedi";

import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // stato
  const [token, settoken] = useState<string>("");

  //  funzione per cambiare lo stato di key
  const HandletokenChange = (value: string) => {
    settoken(value);
  };

  // funzione per inviare il form
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <PageAccedi
        token={token}
        ChangeToken={HandletokenChange}
        onSubmit={handleSubmit}
      />} />
          <Route path="/profile" element={<Profile token={token} />} />
          <Route path="/edit-profile" element={<EditProfile></EditProfile>} />
        </Routes>
      </BrowserRouter>
     
    </>
  );
}

export default App;
