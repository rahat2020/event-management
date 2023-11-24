import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Topbar from './Components/Topbar/Topbar'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import SingleEvent from './pages/SingleEvent/SingleEvent'
import NotFound from './pages/NotFound'
import Profile from './pages/Profile/Profile'
import Events from './pages/Events/Events'
import {useContext} from 'react';
import { AuthContext } from './context/AuthContext'
import { useGetUserDataByEmailQuery } from './redux/api/apiSlice'

function App() {
  // AUTH CONTEXT APIS
  const { user } = useContext(AuthContext)
  // REDUX QUERIES
  const { data: userData } = useGetUserDataByEmailQuery(user)

  return (
    <BrowserRouter>
      <Topbar />
      {
        !userData ? '' : <Header />
      }
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
