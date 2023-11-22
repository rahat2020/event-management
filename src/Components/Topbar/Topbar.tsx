import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image, } from 'react-bootstrap';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import './Topbar.css';

const Topbar = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-transparent border-0">

        <Container>
          <Navbar.Brand href="/">
            <Image src='/assets/logo.png' alt="logo"
              style={{ width: '10rem' }}
              loading='lazy'
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex justify-content-center align-items-center">

              <Nav.Link href="#" >
                <div className="d-flex justify-content-center align-items-center ">
                  <span className='nav_profile_con'>
                    <PermIdentityIcon className='profileIcon' />
                  </span>
                </div>
              </Nav.Link>
              <Nav.Link href="#" style={{ fontSize: '.94rem' }}>
                <div className="notifications">
                  <NotificationsNoneIcon />
                  <span className="notification_num">9</span>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Topbar