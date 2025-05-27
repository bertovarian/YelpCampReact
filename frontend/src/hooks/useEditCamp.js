import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { errUtils } from '../utils/errUtils';

export const useEditCamp = () => {
    const { goError } = errUtils()
    const navigate = useNavigate()
    const editCamp = async (campground, id, location, user) => {
        try {
            // await axios.patch(`http://localhost:4000/api/campgrounds/${id}`, campground, {
            await axios.patch(`https://yelpcampreact.onrender.com/api/campgrounds/${id}`, campground, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate(`/campgrounds/${id}?edit=true`)
        } catch (e) {
            goError(e, location)
        }
    }
    return { editCamp }
}

