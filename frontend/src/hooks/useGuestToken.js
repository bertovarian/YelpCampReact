import axios from 'axios';
import { errUtils } from '../utils/errUtils';
import { useLogout } from './useLogout';
export const useGuestToken = () => {
    const { goError } = errUtils()
    const { logout } = useLogout()
    const guestToken = async (user, location, aux = false) => {
        try {
            const invitado = { username: user.username }
            const response = await axios.post(`http://localhost:4000/api/token`, { invitado }, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data.token
        } catch (e) {
            //this if is in case the user was already deleted in the cron backend script
            if (e?.response?.data?.error === 'User not found') {
                logout(aux)
            } else {
                goError(e, location)
            }
        }
    }
    return { guestToken }
}

