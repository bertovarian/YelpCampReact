import { useEffect } from "react"
import { Outlet } from "react-router-dom"
// import Navigation from "../Navigation"

import Footer from "./Footer"
import { jwtDecode } from 'jwt-decode';
import { useLogout } from '../../hooks/useLogout';
import { useGuestToken } from "../../hooks/useGuestToken";
import { useAuthContext } from "../../hooks/useAuthContext"
import { useDelGuest } from "../../hooks/useDelGuest";
import Navigation from "./Navigation";

const Boilerplate = () => {
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const { guestToken } = useGuestToken()
    const { deleteGuest } = useDelGuest()

    useEffect(() => {
        const checkExpToken = async () => {
            if (user) {
                const currentTime = Date.now() / 1000;
                const decodedToken = jwtDecode(user.token);
                const { exp } = decodedToken
                const diff = exp - currentTime
                const location = '/'
                const aux = true
                console.log('TIME LEFT BOILERPLATE JSX===>', diff, 'seconds')
                if (diff < 0) {
                    if (user?.username.includes('guest')) {
                        const token = await guestToken(user, location, aux)
                        if (token) {
                            await deleteGuest(token, location, aux)
                        }
                    } else {
                        logout(aux)
                    }
                }
            }
        }
        checkExpToken()
    }, [user])

    return (
        <div style={{ background: 'whitesmoke' }} className="d-flex flex-column min-vh-100">
            <Navigation />
            {/* <Container fluid className="flex-grow-1 mt-5"> */}
            <Outlet className="flex-grow-1 mt-1" />
            {/* </Container> */}
            <Footer />
        </div>
    )
}

export default Boilerplate