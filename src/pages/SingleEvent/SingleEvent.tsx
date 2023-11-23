import { Card, Button, Container, Row, Col, Image, Table, Form } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import './SingleEvent.css';
import { useEffect, useContext, useState } from 'react';
import { useAttandInTheEventMutation, useGetSingleEventsQuery, useGetUserDataByEmailQuery, useUpdateEventMutation } from '../../redux/api/apiSlice';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import UpdateSingleEvent from './UpdateSingleEvent/UpdateSingleEvent';
import logo from '../../assets/logo2.png';

type AttandanceList = {
    "_id": string,
    "username": string,
    "photos": string,
    "email": string,
}

const SingleEvent = () => {
    const { id } = useParams()

    // AUTH CONTEXT APIS
    const { user } = useContext(AuthContext)

    // REDUX QUERIES
    const { data: userData } = useGetUserDataByEmailQuery(user)
    const { data } = useGetSingleEventsQuery(id)
    const [AttandInEvent] = useAttandInTheEventMutation()
    // console.log("SingleEvent_data", data)
    // console.log("userData", userData)

    // ATTAND IN THE EVENT
    const handleAttandInTheEvent = async (event: any) => {
        event.preventDefault();
        try {
            const obj = {
                id: id,
                username: userData?.username,
                email: userData?.email,
                photos: userData?.photo,
            }

            const res = await AttandInEvent(obj)
            if (res?.data === "attandce confirmed") {
                Swal.fire({
                    icon: "success",
                    title: "Attandance is confirmed",
                })
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Attandance is not confirmed",
            })
        }
    }

    // SHOW MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    // GO TO TOP
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    // IF USER IS NOT LOGGED IN 
    const handleUnAuthorizedUser = (e: any) => {
        e.preventDefault()
        Swal.fire({
            icon: 'info',
            title: 'Please sign in to access'
        })
    }

    return (
        <Container className="my-5">
            <Card className='Single_card_wrapper my-3 border-0 rounded '>
                <Card.Body>
                    <Row>
                        <Col md={5}>
                            <div className="SingleEventImg_container d-flex justify-content-center align-items-center">
                                <Image src={
                                    data?.photos ?
                                        data.photos :
                                        "https://5.imimg.com/data5/DO/SS/FB/SELLER-63370074/marriage-event-500x500.jpg"}
                                    alt={data?.title}
                                    className='SingleEvent_img'
                                />
                            </div>
                        </Col>
                        <Col md={7}>
                            <div className="d-flex justify-content-start align-items-start flex-column">
                                <Card.Title style={{ fontSize: "1.4rem", fontWeight: "bold", textTransform: "capitalize", color: '#333' }}>
                                    {data?.title}
                                </Card.Title>
                                <Card.Text className='w-100'>
                                    <span className='text-secondary w-100'>{data?.desc}</span>
                                    <div className="d-flex justify-content-between align-items-center my-2 w-100">
                                        <span><strong>Location:</strong> {data?.location}</span>
                                        <span><strong>Date:</strong> {data?.startDate}</span>
                                        <span><strong>Start Time:</strong> {data?.startTime}</span>
                                        <span><strong>EndTime:</strong> {data?.startTime}</span>
                                    </div>
                                </Card.Text>
                                <h6 style={{ fontWeight: "bold", textTransform: "capitalize", color: '#333' }}>Event Attandance:</h6>
                                <Table striped="columns" bordered>
                                    <thead>
                                        <tr>
                                            <th>S/N</th>
                                            <th className='text-center'>Name</th>
                                            <th className='text-center'>Photo</th>
                                            <th className='text-center'>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data?.attandance?.map((item: AttandanceList, index: number) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td className='text-center'>{item?.username ? item.username : 'N/A'}</td>
                                                    <td className='text-center'>
                                                        <Image
                                                            src={
                                                                item?.photos ?
                                                                    item?.photos :
                                                                    "https://i.pinimg.com/originals/7d/34/d9/7d34d9d53640af5cfd2614c57dfa7f13.png"
                                                            }
                                                            alt="rahat"
                                                            loading='lazy'
                                                            style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'contain' }} />
                                                    </td>
                                                    <td className='text-center'>{item?.email ? item.email : 'N/A'}</td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-between align-items-center  w-50">
                                    {
                                        user === "" ?
                                            <>
                                                <Button className='commonBtn_blue' onClick={handleUnAuthorizedUser}>Attand now</Button>
                                                <Button className='commonBtn_blue' onClick={handleUnAuthorizedUser}>Edit Event</Button>
                                            </>
                                            :
                                            <>
                                                {
                                                    data?.attandance?.length === 0 ?
                                                        <Button className='commonBtn_blue' onClick={handleAttandInTheEvent}>Attand now</Button>
                                                        :
                                                        <Button variant='secondary' disabled >Already joined</Button>

                                                }
                                                    <Button className='commonBtn_blue' onClick={handleShow}>Edit Event</Button>
                                                {/* <Link to={`/update-event/${data?._id}`} className='text-decoration-none'>
                                                </Link> */}

                                            </>
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <>
                <Modal show={show} onHide={handleClose} size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Image src={logo} alt="logo" style={{width:'10rem'}}/>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateSingleEvent id={id} setShow={setShow}/>
                    </Modal.Body>
                </Modal>
            </>
        </Container>
    )
}

export default SingleEvent