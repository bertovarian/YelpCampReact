import { useEffect } from 'react';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { Container, Row, Col, Button, AlertHeading } from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert';


const PageError = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { error, custom, status, path } = location.state || {};


    useEffect(() => {
        if (!error) {
            navigate('/campgrounds');
        }
    }, []);

    useEffect(() => {
        console.log('THIS IS LOCATION STATE ===>', location.state)
    }, []);


    return (
        <Row className='vh-100'>
            <Col className='d-flex justify-content-center align-items-center'>
                <Alert variant="danger" className='d-flex flex-column justify-content-center align-items-center w-100 h-100'>
                    <AlertHeading>
                        <h1 className='mb-5'> Error - {status} ⛔</h1>
                    </AlertHeading>
                    <h3 className='my-5'>
                        {error} ➡️ {custom}
                    </h3>
                    <NavLink to={path}>
                        <Button>GO BACK</Button>
                    </NavLink>
                </Alert>
            </Col>
        </Row>
    );
};

export default PageError;