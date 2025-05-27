import axios from 'axios';
import { errUtils } from '../utils/errUtils';

export const useShowCamp = () => {
    const { goError } = errUtils()
    const sendNewCamp = async (id, location) => {
        try {
            // const response = await axios.get(`http://localhost:4000/api/campgrounds/${id}`)
            const response = await axios.get(`https://yelpcampreact.onrender.com/api/campgrounds/${id}`)
            return response?.data
        } catch (e) {
            goError(e, location)
        }
    }
    return { sendNewCamp }
}