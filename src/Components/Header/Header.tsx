import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const Tpath = window.location.pathname
  
  // AUTH CONTEXT APIS
  const { dispatch, user } = useContext(AuthContext)

  // LOGOUT USER
  const navigate = useNavigate()
  const handleLogout = (event: any) => {
    event.preventDefault();
    toast('Logout successfully!')
    dispatch({ type: "LOGOUT" })
    navigate("/")
    window.location.reload()
  }

  return (
    <Navbar expand="lg" className="bg-transparent shadow-sm">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-auto d-flex justify-content-center align-items-center">
            <Nav.Link href='/create-events'>
              <span className={Tpath === '/create-events' ? 'activecls btn_nav_logout' : 'btn_nav_logout'}>Create Events</span>
            </Nav.Link>
            <Nav.Link href='/profile'>
              <span className={Tpath === '/profile' ? 'activecls btn_nav_logout' : 'btn_nav_logout'}>Profile</span>
            </Nav.Link>
            <Nav.Link href='#'>
              <span className='btn_nav_logout' onClick={handleLogout}>Logout</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer />
    </Navbar>
  )
}

export default Header