<<<<<<< Updated upstream

import { useState } from 'react'
import './App.css'
import PageAccedi from './components/PageAccedi'
=======
import { useState } from "react";
import "./App.css";
import EditProfile from "./components/EditProfile";
import PageAccedi from "./components/PageAccedi";
import NewsFeed from "./components/NewsFeed";
import Profile from "./pages/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddExperience from "./components/AddExperience";
>>>>>>> Stashed changes

function App() {
  // stato
  const[token, settoken]=useState<string>("")

//  funzione per cambiare lo stato di key
  const HandletokenChange=(value:string)=>{
    settoken(value)
  }

  // funzione per inviare il form
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
  };


  return (
    <>
<<<<<<< Updated upstream
      <PageAccedi token={token} ChangeToken={HandletokenChange} onSubmit={handleSubmit} />
=======
     
>>>>>>> Stashed changes
    </>
  )
}

export default App
