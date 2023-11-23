import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Topbar from './Components/Topbar/Topbar'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import SingleEvent from './pages/SingleEvent/SingleEvent'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile/Profile'
import Events from './pages/Events/Events'

function App() {

  return (
    <BrowserRouter>
      <Topbar />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/single-event/:id' element={<SingleEvent />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/create-events' element={<Events />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
