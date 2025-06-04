import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Campgrounds from './views/Campgrounds'
import Show from './views/Show'
import EditCamp from './views/EditCamp'
import NewCamp from './views/NewCamp'
import PageError from './views/PageError'
import NotFoundPage from './views/NotFoundPage'
import Signup from './views/Signup'
import RequireAuth from './components/RequireAuth'
import Login from './views/Login'
import Boilerplate from './components/Layout/Boilerplate'
import LandingPage from './views/LandingPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<LandingPage />} /> */}
          <Route path='/' element={<Navigate to="/campgrounds" />} />
          <Route element={<Boilerplate />}>
            <Route path='/campgrounds' element={<Campgrounds />} />
            <Route path='/campgrounds/:id' element={<Show />} />
            <Route element={<RequireAuth />}>
              <Route path='/campgrounds/new' element={<NewCamp />} />
              <Route path='/campgrounds/:id/edit' element={<EditCamp />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
          </Route>
          <Route path='/error' element={<PageError />} />
          <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


