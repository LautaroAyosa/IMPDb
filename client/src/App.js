import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { initMovies } from './redux/reducers/moviesReducer'

import Notification from './components/Notification/Notification';
import NavBar from './components/NavBar/NavBar';

import './sass/main.css'
import NotFound from './components/NotFound/NotFound';
import List from './components/Blogs/BlogsList/List';
import SingleMovie from './components/SingleContent/SingleMovie';
import SinglePerson from './components/SingleContent/SinglePerson';
import DashboardLayout from './components/DashboardLayout/DashboardLayout'
import { initPersons } from './redux/reducers/personsReducer';
import NewMovieForm from './components/Forms/MovieForms/NewMovieForm'
import NewPersonForm from './components/Forms/PersonForms/NewPersonForm';
import EditMovieForm from './components/Forms/MovieForms/EditMovieForm';


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
            <Route path='/movies/:id' element={<SingleMovie />} />
            <Route path='/people' element={<List show='people'/>} />
            <Route path='/people/:id' element={<SinglePerson />} />

            <Route path='/dashboard/' element={<DashboardLayout/>}>
              <Route path='new-movie' element={<NewMovieForm />} />
              <Route path='edit-movie/:id' element={<EditMovieForm />} />
              <Route path='new-person' element={<NewPersonForm />} />
            </Route>

            <Route path='*' element={<NotFound />}/>
          </Routes>

      </div>
      
    </Router>
  )
}


export default App
