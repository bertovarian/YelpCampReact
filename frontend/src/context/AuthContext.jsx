import { createContext, useReducer, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Navigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  // const { logout } = useLogout()
  // const navigate = useNavigate()


  // Each time we reload the page we check local storage to check if we are logged
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
      // const currentTime = Date.now() / 1000;
      // const decodedToken = jwtDecode(user.token);
      // const { exp } = decodedToken
      // const diff = exp - currentTime
      // console.log('TIME LEFT ===>', diff, 'seconds')
      // if (diff < 0) {
      //   localStorage.removeItem('user') // remove user from storage
      //   dispatch({ type: 'LOGOUT' })    // dispatch logout action
      //   navigate("/campgrounds")
      // }
    }
  }, [])


  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}