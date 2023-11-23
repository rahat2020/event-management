import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image, Tab, Tabs, Form, Button, Card } from 'react-bootstrap';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Topbar.css';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png'
import { useGetUserDataByEmailQuery, useLoginMutation, useRegisterMutation } from '../../redux/api/apiSlice';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {

  // OFFCANVAS OPEN AND CLOSE 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // CONTEXT API
  const { dispatch, user } = useContext(AuthContext)

  // REDUX API
  const [LoginData] = useLoginMutation()
  const [RegisterData] = useRegisterMutation()
  const { data: userData } = useGetUserDataByEmailQuery(user)
  // console.log('userdata', userData)


  // LOGIN PARTS HERE
  const [username, setUserName] = useState("")
  const [password, setUser_Password] = useState("")

  // LOGIN FUNCTIONALITIES
  const handleLogin = async (e) => {
    e.preventDefault()
    const object = {
      username,
      password
    }
    if (!username || !password) {
      toast('Field can not be empty')
    } else if (password.length <= 6) {
      toast('Password must greater than 6 characters')
    } else {
      try {
        const res = await LoginData(object)
        console.log('login', res.data)
        if (res?.data?.message === "Login successful") {
          toast('Logged in Successfully')
          dispatch({ type: "LOGIN_SUCCESS", payload: res?.data?.email });
        } else if (res?.error?.data === "wrong credentials") {
          toast('User not found')
        } else {
          toast('Login Failed')
        }
      } catch (e) {
        console.log(e)
        e && toast('Login Failed')
      }
    }
  }

  // USER REGISTERS STATES
  const [usernameReg, setUserNameReg] = useState("")
  const [passwordReg, setUser_PasswordReg] = useState("")
  const [email, setUser_Email] = useState("")
  const [file, setFile] = useState("")
  const [terms, setUser_Terms] = useState("")


  // USER REGISTRATION FUNCTIONS
  const handleRegistration = async (e) => {
    e.preventDefault()
    if (!usernameReg || !passwordReg || !email || !file || !terms) {
      toast('Field can not be empty')
    } else if (passwordReg.length <= 6) {
      toast('Password must greater than 6 characters')
    } else {
      try {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/rahatdev1020/image/upload", data)
        const { url } = uploadRes.data
        // console.log('cloudinary', url)
        const object = {
          username: usernameReg,
          password: passwordReg,
          email,
          photo: url,
          terms,
        }
        const res = await RegisterData(object)
        console.log('register', res)
        if (res?.data === "registration successfull") {
          toast('Registration Successfull, now login to access the profile')
        } else if (res.error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: `${res.error.data}`
          })
        }
      } catch (e) {
        console.log(e)
        e && Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
        })
      }
    }
  }

  // LOGOUT USER
  const navigate = useNavigate()
  const handleLogout = () => {
    Swal.fire({
      icon: 'success',
      title: 'Thanks for being with us',
    })
    dispatch({ type: "LOGOUT" })
    navigate("/")
    window.location.reload()

  }

  return (
    <div>
      <Navbar expand="lg" className="bg-transparent border-0">
        <Container>
          <Navbar.Brand href="/">
            <Image src={logo} alt="logo"
              style={{ width: '10rem' }}
              loading='lazy'
            />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex justify-content-center align-items-center">

              <Nav.Link href="#" onClick={handleShow}>
                <div className="d-flex justify-content-center align-items-center ">
                  {
                    !userData ? <span className='sign_btn'>Sign in</span> :
                      <span className='nav_profile_con'>
                        <Image
                          src={userData?.photo}
                          alt={userData?.username}
                          style={{ width: "40px", height: "40px", borderRadius: '50%', objectFit: 'contain' }}
                        />
                      </span>
                  }
                </div>
              </Nav.Link>
              <Nav.Link href="#" style={{ fontSize: '.94rem' }} >
                <div className="notifications">
                  <NotificationsNoneIcon />
                  <span className="notification_num">9</span>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ToastContainer />
      <Offcanvas show={show} onHide={handleClose} end>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {
              userData === '' ? <span className=' text-secondary'>Welcome, start your journey from here!</span> : 'User panel'
            }
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {

            !userData ?
              <Tabs
                defaultActiveKey="login"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="login" title="Login">
                  <Form className='p-3 py-5 shadow-sm rounded'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Enter username"
                        className='border-0 rounded shadow'
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password"
                        className='border-0 rounded shadow'
                        onChange={(e) => setUser_Password(e.target.value)}
                      />
                    </Form.Group>

                    <div className="d-grid w-100">
                      <Button variant="outline-secondary fw-bold border-0 shadow rounded" type="submit" onClick={handleLogin}>
                        Login
                      </Button>
                    </div>
                  </Form>
                </Tab>


                <Tab eventKey="register" title="Registration">
                  <Form className='p-3 py-5 shadow-sm rounded'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="text" placeholder="Enter username"
                        className='border-0 rounded shadow'
                        onChange={(e) => setUserNameReg(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="email" placeholder="Enter email"
                        className='border-0 rounded shadow'
                        onChange={(e) => setUser_Email(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control type="file" className='border-0 rounded shadow text-muted'
                        onChange={(e: any) => setFile(e.target.files[0])} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                      <Form.Control type="password" placeholder="Password"
                        className='border-0 rounded shadow'
                        onChange={(e) => setUser_PasswordReg(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" id="formGridCheckbox">
                      <Form.Check type="checkbox"
                        label="I accept terms & conditions"
                        onClick={() => setUser_Terms('yes')}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" id="formGridCheckbox">
                      <Nav.Link href="/privacy-policy">Read Privacy Policy</Nav.Link>
                    </Form.Group>
                    <div className="d-grid w-100">
                      <Button variant="outline-secondary fw-bold border-0 shadow rounded" type="submit"
                        onClick={handleRegistration}>
                        Registration
                      </Button>
                    </div>
                  </Form>
                </Tab>
              </Tabs>

              :
              <Card className='border-0 shadow'>
                <div className="d-flex justify-content-center align-items-center p-2">
                  <Card.Img variant="top" src={userData?.photo ? userData?.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9DBm4up7xkDQKhfO1kvAAwU8Grk36ZywnngllVU&s"}
                    style={{ width: '8rem', height: '8rem', objectFit: 'cover', borderRadius: '50%' }}
                    alt="Rahat"
                  />
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title className='text-secondary'>Name:</Card.Title>
                    <Card.Title className='text-secondary'>{userData?.username}</Card.Title>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title className='text-secondary'>Status:</Card.Title>
                    <Card.Title className='text-secondary'>Online</Card.Title>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Title className='text-secondary'>Total Posts:</Card.Title>
                    <Card.Title className='text-secondary'>9</Card.Title>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">

                    <Nav.Link href="/profile" className='text-decoration-none' >
                      <Button className='commonBtn_blue' size='sm'>Profile</Button>
                    </Nav.Link>
                    <Button className='commonBtn_red' size='sm' onClick={handleLogout}>Logout</Button>
                  </div>

                </Card.Body>
              </Card>
          }

        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default Topbar