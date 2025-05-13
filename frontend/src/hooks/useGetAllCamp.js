import axios from 'axios';
import { errUtils } from '../utils/errUtils';

export const useGetAllCamp = () => {
    const { goError } = errUtils()
    const getAllCamp = async (location = '/') => {
        try {
            const response = await axios.get('http://localhost:4000/api/campgrounds');
            return response?.data
        } catch (e) {
            goError(e, location)
        }
    }
    return { getAllCamp }
}