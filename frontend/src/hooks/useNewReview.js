import axios from 'axios';
import { errUtils } from '../utils/errUtils';

export const useNewReview = () => {
    const { goError } = errUtils()
    const sendNewRev = async (review, id, location, user) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/campgrounds/${id}/reviews`, { review }, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data
        } catch (e) {
            goError(e, location)
        }
    }
    return { sendNewRev }
}