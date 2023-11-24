import { Button, Container } from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import './Profile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileNav from "./ProfileNav/ProfileNav";
import Swal from "sweetalert2";
import { useState } from "react";
import { useGetUserDataByEmailQuery, useUpdateUserDataMutation } from "../../redux/api/apiSlice";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {

    // AUTH CONTEXT APIS
    const { dispatch, user } = useContext(AuthContext)

    // REDUX QUERIES
    const { data: userData } = useGetUserDataByEmailQuery(user)
    const [UpdateUser] = useUpdateUserDataMutation()
    console.log('userData', userData)

    // UPDATE USER FORM
    const [username, setUserName] = useState(userData?.username || "")
    const [password, setUser_Password] = useState(userData?.password || "")
    const [email, setUser_Email] = useState(userData?.email || "")
    const [file, setUser_Photo] = useState(userData?.photo || "")

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (file === '') {
                const Object = {
                    id: userData?._id,
                    userId: userData?._id,
                    username: username || userData?.username || "",
                    password: password || userData?.password || "",
                    email: email || userData?.email || "",
                    photo: file || userData?.photo || "",
                }
                console.log('object', Object)
                const res = await UpdateUser(Object)
                if (res && 'data' in res) {
                    if (res?.data?.message === "user updated") {
                        Swal.fire({
                            icon: 'success',
                            title: 'User updated successfully',
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'User Update failed',
                        })
                    }
                } else {
                    console.error('Unhandled error:', res.error);
                }


            } else if (file) {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "upload");
                const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/rahatdev1020/image/upload", data);
                const { url } = uploadRes.data;
                const Object = {
                    id: userData?._id,
                    userId: userData?._id,
                    username: username || userData?.username || "",
                    password: password || userData?.password || "",
                    email: email || userData?.email || "",
                    photo: url || userData?.photo || "",
                }
                const res = await UpdateUser(Object)
                console.log('res', res)
                if (res && 'data' in res) {
                    if (res?.data?.message === "user updated") {
                        Swal.fire({
                            icon: 'success',
                            title: 'User updated successfully',
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'User Update failed',
                        })
                    }
                } else {
                    console.error('Unhandled error:', res.error);
                }
            }

        } catch (err) {
            console.log(err)

            err && Swal.fire({
                icon: 'error',
                title: 'Input operations failed',
            })
        }

    }

    // LOGOUT USER
    const navigate = useNavigate()
    const handleLogout = (event: any) => {
        event.preventDefault();
        toast('Logout successfully!')
        dispatch({
            type: "LOGOUT",
            payload: ''
        })
        navigate("/")
        window.location.reload()
    }

    // IF THERE IS NO USER (CHECKING USER LOGGED IN OR NOT)
    if (!user) {
        typeof window !== "undefined" ? window.location.replace("/") : false;
    }

    return (
        <div className="py-5" data-aos="fade-up">
            <Container>
                <div className="d-flex text-start py-3">
                    <h3 className="text-capitalize">
                        <span style={{ borderBottom: '2px solid #333' }}>
                            {userData?.username}</span>
                        <span style={{ color: '#FF5324', borderBottom: '2px solid #FF5324' }}> your profile</span>
                    </h3>
                </div>

                <div className="shadow p-3">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first" className="tabone">Home</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second" className="">Update informations</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="third" className="" onClick={handleLogout}>Logout</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>

                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <ProfileNav />
                                        <Form className="border-top py-2 shadow-sm p-3 rounded">
                                            <Row className="mb-3 gy-3">
                                                <Col md={4}>
                                                    <Form.Group controlId="formGridEmail">
                                                        <Form.Label className="text-muted">Username</Form.Label>
                                                        <Form.Control type="email" placeholder="Enter email" defaultValue={userData?.username} className="border-0 shadow-sm rounded text-muted" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Group controlId="formGridEmail">
                                                        <Form.Label className="text-muted">Email</Form.Label>
                                                        <Form.Control type="email" placeholder="Enter email" defaultValue={userData?.email} className="border-0 shadow-sm rounded text-muted" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Group controlId="formGridPassword">
                                                        <Form.Label className="text-muted">Password</Form.Label>
                                                        <Form.Control type="password" placeholder="Password" defaultValue={userData?.password} className="border-0 shadow-sm rounded text-muted" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                                        <Form.Label className="text-muted">Address</Form.Label>
                                                        <Form.Control placeholder="1234 Main St" defaultValue="dhaka, bangladesh" className="border-0 shadow-sm rounded text-muted" />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Row className="mb-3">
                                                        <Form.Group as={Col} controlId="formGridCity">
                                                            <Form.Label className="text-muted">City</Form.Label>
                                                            <Form.Control defaultValue="dhaka" className="border-0 shadow-sm rounded text-muted" />
                                                        </Form.Group>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="second">
                                        <ProfileNav />
                                        <Form className="border-top py-2 shadow-sm p-3 rounded">
                                            <Row className="mb-3 gy-3">
                                                <Col md={6}>
                                                    <Form.Group controlId="formGridEmail">
                                                        <Form.Label className="text-muted">Username</Form.Label>
                                                        <Form.Control type="email" placeholder="Enter email" defaultValue={userData?.username} className="border-0 shadow-sm rounded text-muted"
                                                            onChange={(e) => setUserName(e.target.value)} />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="formGridEmail">
                                                        <Form.Label className="text-muted">Email</Form.Label>
                                                        <Form.Control type="email" placeholder="Enter email"
                                                            defaultValue={userData?.email} className="border-0 shadow-sm rounded text-muted"
                                                            onChange={(e) => setUser_Email(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="formGridPassword">
                                                        <Form.Label className="text-muted">Password</Form.Label>
                                                        <Form.Control type="password" placeholder="Password"
                                                            defaultValue={userData?.password}
                                                            className="border-0 shadow-sm rounded text-muted"
                                                            onChange={(e) => setUser_Password(e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-3" controlId="formGridAddress1">
                                                        <Form.Label className="text-muted">Image</Form.Label>
                                                        <Form.Control type="file" className="border-0 shadow-sm rounded text-muted"
                                                            onChange={(e:any) => setUser_Photo(e.target.files[0])}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={12}>
                                                    <Button variant="outline-secondary w-100 text-capitalize" size="sm"
                                                        onClick={handleSubmit}>Update</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Tab.Pane>

                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                    <ToastContainer />
                </div>
            </Container>
        </div>
    )
}

export default Profile 