import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Container, Row, Button, Card, ListGroup, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useToast } from '../hooks/useToast';
import { useGetAllCamp } from '../hooks/useGetAllCamp';
import { useAuthContext } from '../hooks/useAuthContext';
import './Campgrounds.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapWithClusters from '../components/AllCamp/MapWithClusters';
import Spinner from "../components/Spinner";


const Campgrounds = () => {
    // State to store the list of campsites
    const [campsites, setCampsites] = useState(null);

    // Context to get the current user
    const { user } = useAuthContext();

    // Custom hook for toast notifications
    const { toasting } = useToast();

    // Custom hook to fetch all campgrounds
    const { getAllCamp } = useGetAllCamp();

    // Fetch all campgrounds when the component mounts
    useEffect(() => {
        const getCampsites = async () => {
            const response = await getAllCamp(); // Fetch campgrounds from the backend
            setCampsites(response); // Update state with the fetched data
        };
        getCampsites();
    }, []);

    // Trigger toast notifications when the user changes
    useEffect(() => {
        toasting();
    }, [user]);

    return (
        <Container fluid>
            <ToastContainer theme="colored" />

            {/* Show spinner while loading */}
            {campsites === null ? (
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "40vh" }}>
                    <Spinner texto={'Loading...'} />
                </div>
            ) : (
                <>
                    <h1 className="mt-3 text-center">All Campgrounds</h1>
                    <Row className='ms-lg-4'>
                        <Col lg={{ span: 8, offset: 2 }}>
                            <MapWithClusters campsites={campsites} />
                        </Col>
                    </Row>
                    <Row className="justify-content-start p-3 offset-lg-2 offset-sm-1">
                        <div>
                            <Link className='my-0' to='/campgrounds/new'>
                                Add campground
                            </Link>
                        </div>
                        {campsites.map((ele) => (
                            <Card key={ele._id} className='mt-2 col-lg-3 mx-lg-3 col-sm-5 mx-sm-1 my-5 p-0'>
                                <Card.Img className='campground-img' alt='no image' variant="top" src={ele?.image[0]?.show} />
                                <Card.Body>
                                    <Card.Title>{ele.title}</Card.Title>
                                    <Card.Text className='text-primary'>
                                        {ele.location}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>
                                        <span><b>{ele.price}</b> $/night</span>
                                    </ListGroup.Item>
                                </ListGroup>
                                <Card.Footer className='p-0'>
                                    <NavLink to={`/campgrounds/${ele._id}`}>
                                        <Button className='col-12' variant="info">
                                            <span>More Info</span>
                                        </Button>
                                    </NavLink>
                                </Card.Footer>
                            </Card>
                        ))}
                    </Row>
                </>
            )}
        </Container>
    );
};

export default Campgrounds;