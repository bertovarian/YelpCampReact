import axios from 'axios';
import { errUtils } from '../utils/errUtils';
import { useNavigate } from 'react-router-dom';

export const useDelCamp = () => {
    const { goError } = errUtils()
    const navigate = useNavigate()
    const deleteCamp = async (id, location, user) => {
        try {
            await axios.delete(`http://localhost:4000/api/campgrounds/${id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            navigate('/campgrounds?erase=true');
        }
        catch (e) {
            goError(e, location)
        }
    }
    return { deleteCamp }
}