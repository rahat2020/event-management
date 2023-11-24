import { useState } from 'react';
import './AllEvents.css';
import { Card, Button, Container, Row, Col, Image, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useGetAllEventsQuery } from '../../redux/api/apiSlice';
import ReactPaginate from 'react-paginate';
import AllEventsSkeleton from '../../Utils/AllEventsSkeleton';


type MapData = {
  "_id": string, "title": string, "desc": string, "photos": string, "location": string, "startDate": string, "startTime": string
}

const AllEvents = () => {

  // REDUX QUERIES
  const { data: eventsData, isLoading } = useGetAllEventsQuery(undefined)
  console.log(eventsData)

  // SEARACH QUERY EVENTS DATA
  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = eventsData?.filter((item:any) =>
    (item?.title?.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item?.location?.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item?.category?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // FILTERING EVENTS DATA BY CATEGORY
  const [filterByCategory, setFilterByCategory] = useState('all')
  console.log('filterByCategory', filterByCategory)
  const filteredDataLaunch = filteredData?.filter((item: { Marriage: string, all: string }) => {
    if (filterByCategory === 'all') {
      return true;
    }
    console.log('item of filtering', item)
    return (
      item.Marriage?.toString().toLowerCase().includes(filterByCategory.toLowerCase()) ||
      item.all?.toString().toLowerCase().includes(filterByCategory.toLowerCase())
    );
  });

  // CONTENT PAGINATIONS
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 6;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filteredDataLaunch?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredDataLaunch?.length / itemsPerPage);
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % filteredDataLaunch?.length;
    setItemOffset(newOffset)
  };

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
          <Form.Select aria-label="Default select example"
            className="border border-1 shadow-sm text-secondary" onChange={(e) => setFilterByCategory(e.target.value)} >
            <option>select category events</option>
            <option value="all">All</option>
            <option value="Marriage">Marriage</option>
            <option value="Festibal">Festibal</option>
            <option value="Adventure">Adventure</option>
            <option value="Travel">Travel</option>
            <option value="Picnic">Picnic</option>
            <option value="Camping">Camping</option>
            <option value="Tracking">Tracking</option>
          </Form.Select>
        </div>
      </div>

      {
        isLoading ?
          <AllEventsSkeleton />
          :
          <>
            {
              currentItems?.map((item: MapData, i: number) =>
                <Card key={i} className='card_wrapper my-3 border-0 rounded '>
                  <Card.Body>
                    <Row>
                      <Col md={5}>
                        <div className="eventImg_container d-flex justify-content-center align-items-center">
                          <Image src={item?.photos} alt={item?.title} className='event_img' />
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
                          <Link to={`/single-event/${item._id}`} className='text-decoration-none'>
                            <Button className='commonBtn_blue'>View more</Button>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

              )
            }
          </>
      }


      <div className="d-flex justify-content-center align-items-center w-100 mt-3 flex-wrap">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName='page-num'
          previousLinkClassName='page-num'
          nextLinkClassName='page-num'
          activeLinkClassName='active'
        />
      </div>
    </Container>
  )
}

export default AllEvents