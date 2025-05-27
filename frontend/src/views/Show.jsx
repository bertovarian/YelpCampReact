import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from '../hooks/useAuthContext';
import { useToast } from '../hooks/useToast';
import { useShowCamp } from '../hooks/useShowCamp';
import { useNewReview } from '../hooks/useNewReview';
import { useDelRev } from '../hooks/useDelRev';
import { useDelCamp } from '../hooks/useDelCamp';
import './Show-page.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Slick-arrows.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import ForecastSlider from '../components/Show/ForecastsSlider'
import MapContainer from '../components/Show/MapContainer';
import CampgroundDetails from '../components/Show/CampgroundDetails';
import ReviewsAccordion from '../components/Show/ReviewsAccordion';
import ReviewModal from '../components/Show/ReviewModal';
import Spinner from '../components/Spinner'; // Import your Spinner

const Show = () => {
    // Extract the campground ID from the URL parameters
    const { id } = useParams();

    // State to store campground data
    const [camping, setCamping] = useState(null);

    // State to store weather forecast data
    const [forecast, setForecast] = useState([]);

    // State to control the visibility of the review modal
    const [show, setShow] = useState(false);

    // State to show spinner when deleting
    const [deleting, setDeleting] = useState(false);

    // Context to get the current authenticated user
    const { user } = useAuthContext();

    // React Router hooks for navigation and location
    const navigate = useNavigate();
    const location = useLocation();

    // Custom hooks for API calls
    const { sendNewCamp } = useShowCamp();
    const { sendNewRev } = useNewReview();
    const { deleteRev } = useDelRev();
    const { deleteCamp } = useDelCamp();
    const { toasting } = useToast();

    // Base route for navigation
    const home = '/campgrounds';

    // React Hook Form setup for form validation and control
    const { register, control, handleSubmit, reset, formState: { errors, dirtyFields } } = useForm({
        mode: 'onChange'
    });

    // Function to close the review modal
    const handleClose = () => setShow(false);

    // Function to open the review modal
    const handleShow = () => setShow(true);

    // Function to handle review submission
    const onSubmit = async (review) => {
        const updatedCamp = await sendNewRev(review, id, location, user);
        reset(); // Clears the form after submitting the review
        handleClose(); // Closes the modal
        setCamping(updatedCamp); // Updates the campground data
        toast("Review created correctly", { position: 'top-center' });
    };

    // Function to delete the campground
    const handleEraseCamp = async () => {
        if (!user) {
            return navigate("/login", { state: { from: location } });
        }
        setDeleting(true); // Show spinner
        await deleteCamp(id, location, user);
        // Optionally, you can setDeleting(false) if you want to hide spinner after navigation
    };

    // Function to delete a review
    const handleEraseRev = async (revID) => {
        const updatedCamp = await deleteRev(revID, id, location, user);
        setCamping(updatedCamp); // Updates the campground data
        toast("Review deleted correctly", { position: 'top-center' });
    };

    // Function to determine the background color based on the review rating
    const getBgColor = (rating) => {
        if (rating >= 4) return 'bg-success bg-opacity-25';
        if (rating === 3) return 'bg-warning bg-opacity-25';
        if (rating >= 2) return 'bg-danger bg-opacity-25';
        return 'bg-danger bg-opacity-25';
    };

    // Function to fetch the weather forecast for the campground location
    const fetchForecast = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
            );
            const data = await response.json();
            setForecast(data.list.slice(0, 15)); // Get the first 15 forecasts (45 hours)
        } catch (error) {
            console.error("Error fetching weather forecast:", error);
        }
    };

    // Validation rules for the review form
    const validations = {
        body: { required: "Body review is required" },
        rating: {
            required: "Rating is required",
            min: { value: 1, message: "Rating must be greater than 0" },
            max: { value: 5, message: "Rating must be less than or equal to 5" }
        }
    };

    // Fetch campground data when the component mounts
    useEffect(() => {
        const getCamping = async () => {
            const response = await sendNewCamp(id, home);
            setCamping(response);
        };
        getCamping();
        toasting(); // Show toast notifications if needed
    }, []);

    // Fetch weather forecast when campground data is available
    useEffect(() => {
        if (camping && camping.geometry) {
            const [lon, lat] = camping.geometry.coordinates;
            fetchForecast(lat, lon);
        }
    }, [camping]);

    return (
        <Container fluid>
            <ToastContainer />

            {deleting ? (
                <Spinner texto="Deleting campground..." />
            ) : !camping ? (
                // Show your custom Spinner while campground info is loading
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "40vh" }}>
                    <Spinner texto="Loading campground..." />
                </div>
            ) : (
                <Row>
                    {/* Left Column: Campground Details */}
                    <Col lg={{ span: 5, offset: 2 }} className='my-2'>
                        <>
                            <CampgroundDetails
                                camping={camping}
                                user={user}
                                handleEraseCamp={handleEraseCamp}
                            />
                            <NavLink to='/campgrounds'>
                                <Button variant="outline-secondary" size='sm'>
                                    Campgrounds
                                </Button>
                            </NavLink>
                            {user && (
                                <Button className='mx-2' variant="outline-dark" size='sm' onClick={handleShow}>
                                    Add Review
                                </Button>
                            )}
                        </>
                    </Col>

                    {/* Right Column: Map, Forecast, Reviews, and Modal */}
                    <Col lg={{ span: 3 }} className='my-2'>
                        {/* Map Container */}
                        {camping?.geometry?.coordinates && <MapContainer coordinates={camping.geometry.coordinates} />}

                        {/* Weather Forecast Slider */}
                        {forecast.length > 0 && <ForecastSlider forecast={forecast} />}

                        {/* Review Modal */}
                        {user && (
                            <ReviewModal
                                show={show}
                                handleClose={handleClose}
                                onSubmit={onSubmit}
                                control={control}
                                register={register}
                                validations={validations}
                                errors={errors}
                                dirtyFields={dirtyFields}
                                handleSubmit={handleSubmit}
                            />
                        )}

                        {/* Reviews Accordion */}
                        {camping && (
                            <ReviewsAccordion
                                reviews={camping.review}
                                user={user}
                                handleEraseRev={handleEraseRev}
                                getBgColor={getBgColor}
                            />
                        )}
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default Show;