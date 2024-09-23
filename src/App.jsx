import './App.css'
import { Route, Routes } from "react-router-dom";
import Footer from './components/footer'
import Header from './components/header'
import About from './pages/about'
import Home from './pages/home'
import CardPage from './pages/cardPage';
import MyCards from './pages/myCards';
import FavCards from './pages/favCards';
import ProfileUser from './pages/profileUser';
import { useDarkMode } from './contexts/darkModeContext';

function App() {
  const { darkMode } = useDarkMode();
  return (
    <div className={`min-vh-100 d-flex flex-column gap-2 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <Header />
      <main className='flex-fill'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/card/:id" element={<CardPage />} />
          <Route path="/myCards" element={<MyCards />} />
          <Route path="/favCards" element={<FavCards />} />
          <Route path="/profileUser" element={<ProfileUser />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
