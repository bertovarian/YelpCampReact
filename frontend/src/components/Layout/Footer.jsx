import { Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light py-3 mt-auto ">
            <Container>
                <Row className='text-center'>
                    <span>&copy; 2025 YelpCamp. All rights reserved.</span>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;