import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { initMovies } from './redux/actions/moviesActions'
import { initPersons } from './redux/actions/personsActions';

// Context
import { ThemeProvider } from './contexts/ThemeContexts';

import Notification from './components/Notification/Notification';
import NavBar from './components/NavBar/NavBar';

import './css/main.css'

// Pages
import NotFound from './Pages/NotFound/NotFound';
import Home from './Pages/Home/Home';
import DashboardLayout from './Pages/DashboardLayout/DashboardLayout';
import People from './Pages/People/People';
import Movies from './Pages/Movies/Movies';
import SinglePerson from './Pages/SinglePerson/SinglePerson';
import SingleMovie from './Pages/SingleMovie/SingleMovie';

// Components = WRONG!!!!
import List from './components/List/List';

import MovieForm from './components/Forms/MovieForms/MovieForm'

import NewMovieForm from './components/Forms/MovieForms/obsolete/NewMovieForm'
import NewPersonForm from './components/Forms/PersonForms/NewPersonForm';
import EditMovieForm from './components/Forms/MovieForms/obsolete/EditMovieForm';
import EditPersonForm from './components/Forms/PersonForms/EditPersonForm';
import LogIn from './components/Login/LogIn';
import SignIn from './components/SignIn/SignIn';
import Footer from './components/Footer/Footer';
import MyAccount from './components/MyAccount/MyAccount';
import PersonForm from './components/Forms/PersonForms/PersonForm';


const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initMovies())
    dispatch(initPersons())
  },[dispatch])

  return (
    <ThemeProvider>
      <Router>
        <header>
          <Notification />
        </header>
        <NavBar/>
        <div className='container main-container'>

            <Routes>
              <Route exact path='/login' element={<LogIn />}/>
              <Route exact path='/signin' element={<SignIn />}/>

              <Route path='/' element={<Home />} />

              <Route path='/movies' element={<Movies />} /> 
              <Route path='/movies/:id' element={<SingleMovie />} />
              <Route path='/people' element={<People/>} />
              <Route path='/people/:id' element={<SinglePerson />} />

              <Route path='/dashboard/' element={<DashboardLayout/>}>
                <Route path='' element={<MovieForm />} />
                <Route path='new-movie' element={<MovieForm />} />
                <Route path='edit-movie/:id' element={<MovieForm />} />
                <Route path='new-person' element={<PersonForm />} />
                <Route path='edit-person/:id' element={<PersonForm />} />
                <Route path='my-account' element={<MyAccount />} />
              </Route>

              <Route path='*' element={<NotFound />}/>
            </Routes>

        </div>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}


export default App
