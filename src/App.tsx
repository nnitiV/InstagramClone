import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/home"
import Reels from "./components/reels"
import ShortVideos from "./components/shortVideos"
import Header from "./components/Header";
import { useState } from "react";
import Direct from "./components/chat";
import "./index.css"
import UserProfile from "./components/userProfile";

function App() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActiveFavorite, setIsActiveFavorite] = useState<boolean>(false);



  return (
    <Router>
      <Header toggleMenu={setIsActive} isActive={isActive} isActiveFavorite={isActiveFavorite} toggleFavorite={setIsActiveFavorite} />
      <Routes>
        <Route path="/" element={<Home toggleMenu={() => setIsActive(false)} toggleFavorite={() => setIsActiveFavorite(false)} />} />
        <Route path="/discover" element={<Reels toggleMenu={() => setIsActive(false)} toggleFavorite={() => setIsActiveFavorite(false)} />} />
        <Route path="/shortFormat" element={<ShortVideos toggleMenu={() => setIsActive(false)} toggleFavorite={() => setIsActiveFavorite(false)} />} />
        <Route path="/direct" element={<Direct toggleMenu={() => setIsActive(false)} toggleFavorite={() => setIsActiveFavorite(false)} />} />
        <Route path="/profile/:id" element={<UserProfile toggleMenu={() => setIsActive(false)} toggleFavorite={() => setIsActiveFavorite(false)} />} />
      </Routes>
    </Router>
  )
}

export default App
