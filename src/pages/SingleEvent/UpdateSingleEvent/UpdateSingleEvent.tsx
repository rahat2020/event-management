import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useGetSingleEventsQuery, useUpdateEventMutation } from '../../../redux/api/apiSlice';
import Swal from 'sweetalert2';

const UpdateSingleEvent = ({ id, setShow }) => {
    // REDUX QUERIES
    const { data } = useGetSingleEventsQuery(id)
    const [UpdateEvent] = useUpdateEventMutation()
    // UPDATE EVENT
    const [title, setTitle] = useState(data?.title || "")
    const [desc, setDesc] = useState(data?.desc || "")
    const [location, setLocations] = useState(data?.location || "")
    const [startDate, setStartDate] = useState(data?.startDate || "")
    const [endDate, setEndDate] = useState(data?.endDate || "")
    const [startTime, setStartTime] = useState(data?.startTime || "")
    const [endTime, setEndTime] = useState(data?.endTime || "")
    const [file, setFile] = useState(data?.file || "")
    const [category, setCategory] = useState(data?.category || "")
    const [price, setPrice] = useState(data?.price || "")

    const handleUpdateEvent = async (e: any) => {
        e.preventDefault();
        try {
            const obj = {
                id:id,
                title: title || data?.title || "",
                desc: desc || data?.desc || "",
                location: location || data?.location || "",
                startDate: startDate || data?.startDate || "",
                endDate: endDate || data?.endDate || "",
                startTime: startTime || data?.startTime || "",
                endTime: endTime || data?.endTime || "",
                photos: file || data?.photos || "",
                category: category || data?.category || "",
                price: price || data?.price || "",
            }
            const res = await UpdateEvent(obj)
            console.log('UpdateSingleEvent', res)
            if (res?.data === "event updated") {
                Swal.fire({
                    icon: 'success',
                    title: 'Event Updated'
                })
                setShow(false)
            }

        } catch (err) {
            console.log(err)
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
                                defaultValue={data?.title}
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
                                defaultValue={data?.location}
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
                                defaultValue={data?.startDate}
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
                                defaultValue={data?.endDate}
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
                                    defaultValue={data?.startTime}
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
                                    defaultValue={data?.endTime}
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
                                    defaultValue={data?.price}
                                    onChange={(e: any) => setPrice(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formGridState">
                            <Form.Label>Category</Form.Label>
                            <Form.Select onChange={(e: any) => setCategory(e.target.value)} >
                                <option>{data?.category}</option>
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
                            <Form.Control as="textarea" rows={3} defaultValue={data?.desc} onChange={(e: any) => setDesc(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                        <Button className='commonBtn_red' onClick={handleUpdateEvent}>
                            Update
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default UpdateSingleEvent