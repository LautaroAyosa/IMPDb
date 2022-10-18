import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { initMovies } from './redux/reducers/moviesReducer'

import Notification from './components/Notification/Notification';
import NavBar from './components/NavBar/NavBar';

import './sass/main.css'
import NotFound from './components/NotFound/NotFound';
import List from './components/Blogs/BlogsList/List';
import SingleContent from './components/SingleContent/SingleContent';
import DashboardLayout from './components/DashboardLayout/DashboardLayout'
import { initPersons } from './redux/reducers/personsReducer';


const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initMovies())
    dispatch(initPersons())
  },[dispatch])

  return (
    <Router>
      <header>
        <Notification />
      </header>
      <NavBar/>
      <div className='mainContainer'>

          <Routes>
            <Route path='/movies' element={<List show='movies' />} /> 
            <Route path='/movies/:id' element={<SingleContent />} />
            <Route path='/people' element={<List show='people'/>} />

            <Route path='/dashboard/' element={<DashboardLayout/>}>
              
            </Route>

            <Route path='*' element={<NotFound />}/>
          </Routes>

      </div>
      
    </Router>
  )
}


export default App
