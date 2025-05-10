import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFillGeoAltFill, BsCurrencyDollar, BsFillPersonCheckFill, BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import Slider from "react-slick";

const CampgroundDetails = ({ camping, user, handleEraseCamp }) => {
    return (
        <>
            <Card className="p-0 mb-2">
                <Slider dots={true} infinite={camping.image.length > 1} speed={600} slidesToShow={1} slidesToScroll={1}>
                    {camping.image.map((ele) => (
                        <div key={ele.url}>
                            <Card.Img variant="top" src={ele.show} />
                        </div>
                    ))}
                </Slider>
                <Card.Body>
                    <Card.Title>{camping.title}</Card.Title>
                    <Card.Text>{camping.description}</Card.Text>
                </Card.Body>
            </Card>
            <Row className="d-flex fst-italic fw-semibold mb-2 py-3">
                <Col xs={(user?.username === camping?.author?.username) ? { span: 9 } : { span: 12 }} className="d-flex flex-wrap">
                    <div className="mx-2 my-1 text-break">
                        <BsFillGeoAltFill color="blue" /> {camping.location}
                    </div>
                    <div className="mx-2 my-1 text-break">
                        <BsCurrencyDollar color="green" /> {camping.price}/night
                    </div>
                    <div className="mx-2 my-1 text-break">
                        <BsFillPersonCheckFill color="darkorange" /> {camping.author.username}
                    </div>
                </Col>
                {user?.username === camping?.author?.username && (
                    <Col xs={{ span: 3 }} className="d-flex justify-content-end my-auto">
                        <NavLink to={`/campgrounds/${camping._id}/edit`}>
                            <Button title="Edit Campground" style={{ borderRadius: '50%' }} variant="outline-primary" className="mx-1">
                                <FiEdit />
                            </Button>
                        </NavLink>
                        <Button
                            title="Delete Campground"
                            style={{ borderRadius: '50%' }}
                            variant="outline-danger"
                            className="mx-1"
                            onClick={handleEraseCamp}
                        >
                            <BsTrash />
                        </Button>
                    </Col>
                )}
            </Row>
        </>
    );
};

export default CampgroundDetails;