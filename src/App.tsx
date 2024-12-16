import './App.css'
import HeroSection from './components/HeroSection'
import EditProfile from './components/EditProfile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />       
        <Route path="/edit-profile" element={<EditProfile />} /> 
      </Routes>
    </Router>
  )
}

export default App
