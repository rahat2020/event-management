import { useEffect, useState } from 'react';
import './AllEvents.css';
import { Card, Button, Container, Row, Col, Image, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useGetAllEventsQuery } from '../../redux/api/apiSlice';


const eventData = [
  {
    "id": 1,
    "title": "marrige ceremony",
    "desc": " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi provident cupiditate, consequatur natus iusto repellat inventore accusantium facilis repellendus blanditiis perspiciatis amet neque dolor? Eveniet pariatur quidem molestias ad impedit?",
    "startTime": "10:54 AM",
    "startDate": "November 24, 2023",
    "location": "avc hall",
    "photo": "https://5.imimg.com/data5/DO/SS/FB/SELLER-63370074/marriage-event-500x500.jpg",
  },
  {
    "id": 2,
    "title": "marrige outfeild",
    "desc": " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi provident cupiditate, consequatur natus iusto repellat inventore accusantium facilis repellendus blanditiis perspiciatis amet neque dolor? Eveniet pariatur quidem molestias ad impedit?",
    "startTime": "10:54 AM",
    "startDate": "November 24, 2023",
    "location": "avc hall",
    "photo": "https://content.jdmagicbox.com/comp/ahmedabad/e5/079pxx79.xx79.121031110024.s1e5/catalogue/marriage-event-management-ellis-bridge-ahmedabad-event-management-companies-o2hy6.jpg",
  },
  {
    "id": 2,
    "title": "marrige inner stage",
    "desc": " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi provident cupiditate, consequatur natus iusto repellat inventore accusantium facilis repellendus blanditiis perspiciatis amet neque dolor? Eveniet pariatur quidem molestias ad impedit?",
    "startTime": "10:54 AM",
    "startDate": "November 27, 2023",
    "location": "avc hall",
    "photo": "https://5.imimg.com/data5/CF/MA/MY-11451915/event-planning-500x500.jpg",
  },
  {
    "id": 4,
    "title": "marrige hall stage",
    "desc": " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi provident cupiditate, consequatur natus iusto repellat inventore accusantium facilis repellendus blanditiis perspiciatis amet neque dolor? Eveniet pariatur quidem molestias ad impedit?",
    "startTime": "10:54 AM",
    "startDate": "November 25, 2023",
    "location": "avc hall",
    "photo": "https://svmahal.in/wp-content/uploads/2018/03/marriage.jpg",
  },
  {
    "id": 5,
    "title": "beach destination",
    "desc": " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi provident cupiditate, consequatur natus iusto repellat inventore accusantium facilis repellendus blanditiis perspiciatis amet neque dolor? Eveniet pariatur quidem molestias ad impedit?",
    "startTime": "10:54 AM",
    "startDate": "November 30, 2023",
    "location": "avc hall",
    "photo": "https://english.cdn.zeenews.com/sites/default/files/2022/05/28/1047568-resort-wedding.jpg",
  },
]
const AllEvents = () => {
  const [data, setData] = useState([])
  // console.log(data)
  useEffect(() => {
    setData(eventData);
  }, [])


  // REDUX QUERIES
  const { data: eventsData } = useGetAllEventsQuery(undefined)
  console.log(eventsData)

  // SEARACH QUERY DATA
  const [searchQuery, setSearchQuery] = useState('');
  // const filteredData = currentItems?.filter(item =>
  //     (item?.title?.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item?.category?.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item?.desc?.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (item?.author?.toLowerCase().includes(searchQuery.toLowerCase()))
  // );
  
  return (
    <Container className='my-5'>
      <div className="d-flex justify-content-center align-items-center">
        <h3 className='event_Head_title'>All <span className='event_half'>events</span></h3>
      </div>

      <div className="d-flex justify-content-between align-items-center py-3">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search events by name"
            className="me-2 border border-1 shadow-sm"
            aria-label="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            defaultValue={searchQuery}
          />
        </Form>
        <div className="d-flex justify-content-between align-items-center">
          <Form.Select aria-label="Default select example" className="border border-1 shadow-sm text-secondary" >
            <option>select events</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <Button className="commonBtn_blue ms-2">Filter</Button>
        </div>
      </div>


      {
        data?.map((item: { "title": string, "desc": string, "photo": string, "location": string, "startDate": string, "startTime": string }, i: number) =>
          <Card key={i} className='card_wrapper my-3 border-0 rounded '>
            <Card.Body>
              <Row>
                <Col md={5}>
                  <div className="eventImg_container d-flex justify-content-center align-items-center">
                    <Image src={item?.photo} alt={item?.title} className='event_img' />
                  </div>
                </Col>
                <Col md={7}>
                  <div className="d-flex justify-content-start align-items-start flex-column">
                    <Card.Title style={{ fontSize: "1.4rem", fontWeight: "bold", textTransform: "capitalize" }}>{item?.title}</Card.Title>
                    <Card.Text>
                      {item?.desc}
                      <div className="d-flex justify-content-between align-items-center my-2 w-75">
                        <span><strong>Location:</strong> {item?.location}</span>
                        <span><strong>Date:</strong> {item?.startDate}</span>
                        <span><strong>Time:</strong> {item?.startTime}</span>
                      </div>
                    </Card.Text>
                    <Link to="/single-event/1212" className='text-decoration-none'>
                      <Button className='commonBtn_blue'>View more</Button>
                    </Link>
                  </div>
                </Col>
              </Row>

            </Card.Body>
          </Card>

        )
      }

    </Container>
  )
}

export default AllEvents