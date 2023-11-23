import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Container, Navbar, Image, Nav } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext';
import { useContext } from 'react';
import { useGetUserDataByEmailQuery } from '../../../redux/api/apiSlice';
import logo from '../../../assets/logo2.png'

const ProfileNav = () => {

    // AUTH CONTEXT APIS
    const { user } = useContext(AuthContext)

    // REDUX QUERIES
    const { data: userData } = useGetUserDataByEmailQuery(user)

    return (
        <Navbar expand="lg" className="bg-transparent shadow-sm">
            <Container>
                <Navbar.Brand href="/">
                    <Image src={logo} alt="logo"
                        style={{ width: '10rem', objectFit:'contain' }}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex justify-content-center align-items-center">
                        <Nav.Link style={{ fontSize: '.94rem' }}>
                            <div className="notifications">
                                <NotificationsNoneIcon />
                                <span className="notification_num">9</span>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="#" >
                            <div className="d-flex justify-content-center align-items-center ">
                                <span className='nav_profile_con'>
                                    <Image src={userData?.photo ? userData?.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9DBm4up7xkDQKhfO1kvAAwU8Grk36ZywnngllVU&s"}
                                        className="shadow"
                                        style={{ width: '3rem', height: '3rem', objectFit: 'contain', borderRadius: '50%' }} />
                                    {/* <PermIdentityIcon className='profileIcon' /> */}
                                </span>
                            </div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default ProfileNav 