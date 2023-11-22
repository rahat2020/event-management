import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Card, Dropdown, Image, } from 'react-bootstrap';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import './Header.css'

const Header = () => {
  const Tpath  = window.location.pathname
  return (
    <Navbar expand="lg" className="bg-transparent shadow-sm">

      <Container>
        {/* <Navbar.Brand href="/">
          <Image src='/assets/logo.png' alt="logo"
            style={{ width: '10rem' }}
            loading='lazy'
          />
        </Navbar.Brand> */}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto me-auto d-flex justify-content-center align-items-center">

            <Nav.Link href='/create-events' >
                <span className={Tpath === '/all-events' ? 'activecls btn_nav_logout' : 'btn_nav_logout'}> Create Events</span>
            </Nav.Link>

            <Nav.Link href='#'>
              <span className='btn_nav_logout'>Logout</span>
            </Nav.Link>

            <Nav.Link href='/profile'>
              <span className='btn_nav_logout'>Profile</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header