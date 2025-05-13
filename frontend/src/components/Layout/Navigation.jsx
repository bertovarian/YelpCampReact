import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useDelGuest } from '../../hooks/useDelGuest';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCreateGuest } from '../../hooks/useCreateGuest';


function Navigation() {
    const location = useLocation()
    const { logout } = useLogout()
    const { deleteGuest } = useDelGuest()
    const { createGuest } = useCreateGuest()
    const { user } = useAuthContext()

    const handleLogout = async () => {
        const confirmed = window.confirm('Are you sure you want to log out?');
        if (!confirmed) {
            return;
        }
        if ((user?.username).includes('guest')) {
            await deleteGuest(user.token, location)
        } else {
            logout();
        }
    };

    //HACEMOS EL LOGIN AUTOMATICO DEL USUARIO
    const handleGuest = async () => {
        await createGuest(location)
    }

    return (
        <>
            <Navbar style={{ borderRadius: '25px', width: '70%' }} className='mt-1 mx-auto' sticky="top" bg="dark" data-bs-theme="dark" collapseOnSelect expand="lg">
                <Container fluid className='mx-md-2'>
                    <Navbar.Brand href="#home">YelpCamp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            {/* <Nav.Link as={Link} to={"/"}>Home</Nav.Link> */}
                            <Nav.Link as={Link} to={"/campgrounds"}>Campgrounds</Nav.Link>
                            <Nav.Link as={Link} to={"/campgrounds/new"}>New Campground</Nav.Link>
                        </Nav>
                        <Nav className='ms-auto'>
                            {user && (<>
                                <Nav.Link onClick={handleLogout} >Log out</Nav.Link>
                                {user.username.includes('guest') && (
                                    <Nav.Link as={Link} to={"/signup"}>Save</Nav.Link>
                                )}
                                <Navbar.Text className='ms-md-2 text-info'>{user.username}</Navbar.Text>
                            </>)}
                            {!user && (<>
                                <Nav.Link onClick={handleGuest}>Guest</Nav.Link>
                                <Nav.Link as={Link} to={"/login"}>Login</Nav.Link>
                                <Nav.Link as={Link} to={"/signup"}>Signup</Nav.Link>
                            </>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;