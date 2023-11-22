import { Card, Button, Container, Row, Col, Image, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './SingleEvent.css';
import { useState, useEffect } from 'react';

const SingleEventData = {
    "id": 1,
    "title": "marrige ceremony",
    "desc": " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi provident cupiditate, consequatur natus iusto repellat inventore accusantium facilis repellendus blanditiis perspiciatis amet neque dolor? Eveniet pariatur quidem molestias ad impedit?",
    "startTime": "10:54 AM",
    "startDate": "November 24, 2023",
    "location": "avc hall",
    "photo": "https://5.imimg.com/data5/DO/SS/FB/SELLER-63370074/marriage-event-500x500.jpg",
}

const SingleEvent = () => {
    // GO TO TOP
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    return (
        <Container className="my-5">
            <Card className='Single_card_wrapper my-3 border-0 rounded '>
                <Card.Body>
                    <Row>
                        <Col md={5}>
                            <div className="SingleEventImg_container d-flex justify-content-center align-items-center">
                                <Image src={SingleEventData?.photo} alt={SingleEventData?.title} className='SingleEvent_img' />
                            </div>
                        </Col>
                        <Col md={7}>
                            <div className="d-flex justify-content-start align-items-start flex-column">
                                <Card.Title style={{ fontSize: "1.4rem", fontWeight: "bold", textTransform: "capitalize", color: '#333' }}>
                                    {SingleEventData?.title}
                                </Card.Title>
                                <Card.Text>
                                    <span className='text-secondary'>{SingleEventData?.desc}</span>
                                    <div className="d-flex justify-content-between align-items-center my-2 w-100">
                                        <span><strong>Location:</strong> {SingleEventData?.location}</span>
                                        <span><strong>Date:</strong> {SingleEventData?.startDate}</span>
                                        <span><strong>Start Time:</strong> {SingleEventData?.startTime}</span>
                                        <span><strong>EndTime:</strong> {SingleEventData?.startTime}</span>
                                    </div>
                                </Card.Text>
                                <h6 style={{ fontWeight: "bold", textTransform: "capitalize", color: '#333' }}>Event Attandance:</h6>
                                <Table striped="columns" bordered>
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th className='text-center'>Name</th>
                                            <th className='text-center'>Photo</th>
                                            <th className='text-center'>From</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td className='text-center'>Mark</td>
                                            <td className='text-center'>
                                                <Image
                                                    src="https://i.pinimg.com/originals/7d/34/d9/7d34d9d53640af5cfd2614c57dfa7f13.png" alt="rahat"
                                                    loading='lazy'
                                                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'contain' }} />
                                            </td>
                                            <td className='text-center'>Chattogram</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-between align-items-center  w-50">
                                    <Link to="/single-event/1212" className='text-decoration-none'>
                                        <Button className='commonBtn_blue'>Attand now</Button>
                                    </Link>
                                    <Button className='commonBtn_blue'>Edit Event</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </Container>
    )
}

export default SingleEvent