import { useLocation, NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, AlertHeading } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert';

const NotFoundPage = () => {
    const location = useLocation()
    console.log(location)
    return (
        <Row className='vh-100'>
            <Col className='d-flex justify-content-center align-items-center p-0'>
                <Alert variant="warning" className='d-flex flex-column justify-content-center align-items-center w-100 h-100'>
                    <AlertHeading>
                        <h1 className='text-center mx-2'>
                            Error 404 - Page Not Found ⛔
                        </h1>
                    </AlertHeading>

                    <h3 className='my-5 mx-2'>Sorry, the page you are looking for ➡️ <strong>{location.pathname}</strong> ⬅️ does not exist.</h3>
                    <NavLink className='my-5' to={'/campgrounds'}>
                        <Button variant="info">Go to Homepage</Button>
                    </NavLink>
                </Alert>
            </Col>
        </Row>
    );
};

export default NotFoundPage;