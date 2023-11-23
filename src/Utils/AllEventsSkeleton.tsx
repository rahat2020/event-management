import { Card, Col, Row, Placeholder, Button } from 'react-bootstrap';

const AllEventsSkeleton = () => {
    return (
        <div>
            <Card>
                <Row>
                    <Col md={5}>
                        <div className="bg-light h-100 w-100"></div>
                    </Col>
                    <Col md={5}>
                        <Card.Body>
                            <Placeholder as={Card.Title} animation="glow">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="glow">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                            <Placeholder.Button variant="light" xs={6} />
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default AllEventsSkeleton