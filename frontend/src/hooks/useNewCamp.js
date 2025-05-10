import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { errUtils } from '../utils/errUtils';

export const useNewCamp = () => {
    const { goError } = errUtils()
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const sendNewCamp = async (campground, location = '/campgrounds') => {
        try {
            const response = await axios.post('http://localhost:4000/api/campgrounds', campground, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate(`/campgrounds/${response.data._id}?success=true`);
            //navigate(`/campgrounds`);
            //console.log(response)
        } catch (e) {
            goError(e, location)
        }
    }
    return { sendNewCamp }
}