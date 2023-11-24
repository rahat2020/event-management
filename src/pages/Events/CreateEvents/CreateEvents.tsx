import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { useCreateNewEventMutation, useGetUserDataByEmailQuery } from '../../../redux/api/apiSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import axios from 'axios';

const CreateEvents = () => {
    // AUTH CONTEXT APIS
    const { user } = useContext(AuthContext)

    // REDUX QUERIES
    const { data: userData } = useGetUserDataByEmailQuery(user)
    const [CreateNewEvent] = useCreateNewEventMutation()

    // EVENTS CREATE FUNCTIONS
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [location, setLocations] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [file, setFile] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")

    const handleCreateEvents = async (event: any) => {
        event.preventDefault()

        if (!title || !desc || !location || !startDate || !endDate || !startTime || !endTime) {
            Swal.fire({
                icon: 'error',
                title: "feild can not be empty"
            })
        } else {
            try {
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "upload");
                const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/rahatdev1020/image/upload", data)
                const { url } = uploadRes.data
                const obj = {
                    title, desc, location, startDate, endDate, startTime, endTime, photos: url, category, price, owner: userData
                }
                const res = await CreateNewEvent(obj)
                if (res && 'data' in res) {
                    if (res?.data === "Event created") {
                        Swal.fire({
                            icon: "success",
                            title: "Event created"
                        })
                        setTitle("")
                        setDesc("")
                        setCategory("")
                        setEndDate("")
                        setStartDate("")
                        setStartTime("")
                        setEndTime("")
                        setPrice("")
                        setFile("")
                        setLocations("")
                    }
                } else {
                    console.error('Unhandled error:', res.error);
                }

            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: "Can not create event"
                })
            }

        }

    }


    return (
        <div>
            <Form className="border-top py-2 shadow-sm p-3 rounded">
                <Row className="mb-3 gy-3">
                    <Col md={4}>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label className="text-muted   fw-bold">Title</Form.Label>
                            <Form.Control type="email"
                                placeholder="Enter email"
                                className="border-0 shadow-sm rounded text-muted"
                                value={title}
                                onChange={(e: any) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label className="text-muted  fw-bold">Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Dhaka"
                                className="border-0 shadow-sm rounded text-muted"
                                value={location}
                                onChange={(e: any) => setLocations(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formGridPassword">
                            <Form.Label className="text-muted  fw-bold">Start Date</Form.Label>
                            <Form.Control
                                type="date"
                                className="border-0 shadow-sm rounded text-muted"
                                value={startDate}
                                onChange={(e: any) => setStartDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3" controlId="formGridEndDate1">
                            <Form.Label className="text-muted  fw-bold">End Date</Form.Label>
                            <Form.Control
                                type='date'
                                className="border-0 shadow-sm rounded text-muted"
                                value={endDate}
                                onChange={(e: any) => setEndDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridStartTime">
                                <Form.Label className="text-muted  fw-bold">Start Time</Form.Label>
                                <Form.Control
                                    type='time'
                                    className="border-0 shadow-sm rounded text-muted"
                                    value={startTime}
                                    onChange={(e: any) => setStartTime(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEndTime">
                                <Form.Label className="text-muted fw-bold">End Time</Form.Label>
                                <Form.Control
                                    type='time'
                                    className="border-0 shadow-sm rounded text-muted"
                                    value={endTime}
                                    onChange={(e: any) => setEndTime(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEndTime">
                                <Form.Label className="text-muted  fw-bold">Photo</Form.Label>
                                <Form.Control
                                    type='file'
                                    className="border-0 shadow-sm rounded text-muted"
                                    onChange={(e: any) => setFile(e.target.files[0])}
                                />
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEndTime">
                                <Form.Label className="text-muted  fw-bold">Price</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='1254'
                                    className="border-0 shadow-sm rounded text-muted"
                                    value={price}
                                    onChange={(e: any) => setPrice(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formGridState">
                            <Form.Label>Category</Form.Label>
                            <Form.Select onChange={(e: any) => setCategory(e.target.value)} value={category}>
                                <option>choose category</option>
                                <option value="Marriage">Marriage</option>
                                <option value="Festibal">Festibal</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Travel">Travel</option>
                                <option value="Picnic">Picnic</option>
                                <option value="Camping">Camping</option>
                                <option value="Tracking">Tracking</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className='text-muted fw-bold'>Descriptions</Form.Label>
                            <Form.Control as="textarea" rows={3} value={desc} onChange={(e: any) => setDesc(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Button className='commonBtn_red' onClick={handleCreateEvents}>
                            Create
                        </Button>
                    </Col>
                </Row>
            </Form>
            <ToastContainer />
        </div>
    )
}

export default CreateEvents