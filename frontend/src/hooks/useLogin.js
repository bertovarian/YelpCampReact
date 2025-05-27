import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (username, password, from) => {
    setIsLoading(true)
    setError(null)
    try {
      const user = { username, password }
      // const response = await axios.post('http://localhost:4000/api/login', { user }, 
      const response = await axios.post('https://yelpcampreact.onrender.com/api/login', { user }, {
        headers: { 'Content-Type': 'application/json' }
      })
      const { data } = response
      localStorage.setItem('user', JSON.stringify(data))
      dispatch({ type: 'LOGIN', payload: data })
      setIsLoading(false)
      navigate(`${from} ? cosa = true`)
    }
    catch (e) {
      setIsLoading(false)
      setError(e.response.data.error)
    };
  }
  return { login, isLoading, error }
}