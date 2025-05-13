import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'
export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()
  const prev = location.pathname
  const logout = async (aux = false) => {
    localStorage.removeItem('user') // remove user from storage
    dispatch({ type: 'LOGOUT' })    // dispatch logout action
    if (!aux) {
      navigate("/campgrounds?logout=true")
    }
    if (aux) {
      navigate("/campgrounds")
    }
    // This one is to cause a rerender if we are 
    // already in the campgrounds page and that way we 
    // show the toast because we cause rerender
    if (prev === '/campgrounds') {
      navigate(0)
    }

  }
  return { logout }
}