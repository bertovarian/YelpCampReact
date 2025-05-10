import React from 'react';
import { Accordion, Card, Row, Col, Button } from 'react-bootstrap';
import { Rating } from '@mui/material';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { BsTrash } from "react-icons/bs";

const ReviewsAccordion = ({ reviews, user, handleEraseRev, getBgColor }) => {
    return (
        <Accordion defaultActiveKey="0" className="reviews-container mt-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header><h5 className='text-black text-end'>Reviews</h5></Accordion.Header>
                <Accordion.Body style={{ background: 'whitesmoke' }} className='p-1'>
                    {reviews.map((ele) => (
                        <Card className='mb-1' key={ele._id}>
                            <Card.Header className={`d-flex bg-primary bg-opacity-25 my-auto ${getBgColor(ele.rating)}`}>
                                <Rating
                                    name="static-rating"
                                    value={ele.rating}
                                    readOnly
                                    precision={1}
                                    icon={<FaStar style={{ color: 'orange' }} />}
                                    emptyIcon={<FaRegStar />}
                                    size='small'
                                />
                                <Card.Subtitle className='ms-auto'>
                                    {ele.author.username}
                                </Card.Subtitle>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col xs={(ele?.author?.username === user?.username) ? { span: 10 } : { span: 10 }} >
                                        <Card.Text>
                                            {ele.body}
                                        </Card.Text>
                                    </Col>
                                    {ele?.author?.username === user?.username && (
                                        <Col xs={{ span: 2 }} className='my-auto d-flex justify-content-end'>
                                            <Button style={{ borderRadius: '100%' }} onClick={() => handleEraseRev(ele._id)} size='sm' variant="outline-secondary">
                                                <BsTrash />
                                            </Button>
                                        </Col>
                                    )}
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default ReviewsAccordion;