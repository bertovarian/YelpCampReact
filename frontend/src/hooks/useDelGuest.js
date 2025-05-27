import axios from 'axios';
import { errUtils } from '../utils/errUtils';
import { useLogout } from './useLogout';
export const useDelGuest = () => {
    const { logout } = useLogout()
    const { goError } = errUtils()
    const deleteGuest = async (token, location, aux = false) => {
        try {
            // await axios.delete(`http://localhost:4000/api/guest`, {
            await axios.delete(`https://yelpcampreact.onrender.com/api/guest`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            logout(aux)
        }
        catch (e) {
            goError(e, location)
        }
    }
    return { deleteGuest }
}

