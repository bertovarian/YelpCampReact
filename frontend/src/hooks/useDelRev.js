import axios from 'axios';
import { errUtils } from '../utils/errUtils';

export const useDelRev = () => {
    const { goError } = errUtils()
    const deleteRev = async (revID, id, location, user) => {
        try {
            // const response = await axios.delete(`http://localhost:4000/api/campgrounds/${id}/reviews/${revID}`, {
            const response = await axios.delete(`https://yelpcampreact.onrender.com/api/campgrounds/${id}/reviews/${revID}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data
        }
        catch (e) {
            goError(e, location)
        }
    }
    return { deleteRev }
}
