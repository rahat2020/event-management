import { Container } from "react-bootstrap"
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import './Events.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../context/AuthContext";
import { useContext } from 'react'
import { useGetUserDataByEmailQuery } from "../../redux/api/apiSlice";
import ProfileNav from "../Profile/ProfileNav/ProfileNav";
import CreateEvents from "./CreateEvents/CreateEvents";
import ViewEvents from "./ViewEvents/ViewEvents";

const Events = () => {

    // AUTH CONTEXT APIS
    const { user } = useContext(AuthContext)

    // REDUX QUERIES
    const { data: userData } = useGetUserDataByEmailQuery(user)

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
                        <span style={{ color: '#FF5324', borderBottom: '2px solid #FF5324' }}> your posts</span>
                    </h3>
                </div>

                <div className="shadow p-3">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first" className="tabone">Create events</Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item>
                                        <Nav.Link eventKey="second" className="">View events</Nav.Link>
                                    </Nav.Item>

                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <ProfileNav />
                                        <CreateEvents />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="second">
                                        <ProfileNav />
                                        <ViewEvents />
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

export default Events  