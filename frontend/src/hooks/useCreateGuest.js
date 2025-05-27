import axios from 'axios';
import { errUtils } from '../utils/errUtils';
import ShortUniqueId from 'short-unique-id';
import { useAuthContext } from './useAuthContext';


export const useCreateGuest = () => {
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const { goError } = errUtils()
    const { dispatch } = useAuthContext()

    const createGuest = async (location) => {
        try {
            const invitado = { username: `guest-${randomUUID()}` }
            // const response = await axios.post('http://localhost:4000/api/guest', { invitado }, {
            const response = await axios.post('https://yelpcampreact.onrender.com/api/guest', { invitado }, {
                headers: { 'Content-Type': 'application/json' }
            })
            const { data } = response
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({ type: 'LOGIN', payload: data })
        }
        catch (e) {
            goError(e, location)
        }
    }
    return { createGuest }
}

