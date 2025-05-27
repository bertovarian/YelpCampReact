import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useSignup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const { dispatch, user } = useAuthContext()
  const storageUser = user
  let response
  const signup = async (user) => {
    setError(null)
    try {
      if (!storageUser) {
        // response = await axios.post('http://localhost:4000/api/register', { user }, {
        response = await axios.post('https://yelpcampreact.onrender.com/api/register', { user }, {
          headers: { 'Content-Type': 'application/json' }
        })
      } else if (storageUser) {
        // response = await axios.patch(`http://localhost:4000/api/guest`, { user }, {
        response = await axios.patch(`https://yelpcampreact.onrender.com/api/guest`, { user }, {
          headers: {
            'Authorization': `Bearer ${storageUser.token}`,
            'Content-Type': 'application/json'
          }
        });
      }
      const { data } = response
      localStorage.setItem('user', JSON.stringify(data))
      dispatch({ type: 'LOGIN', payload: data })
      navigate('/campgrounds?cosa=true')
    }
    catch (e) {
      console.log(e)
      setError(e.response.data.error)
    };
  }

  return { signup, error }
}