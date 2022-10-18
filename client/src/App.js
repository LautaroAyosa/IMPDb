import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { initBlogs } from './redux/reducers/blogsReducer'

import Notification from './components/Notification/Notification';
import NavBar from './components/NavBar/NavBar';

import './sass/main.css'
import NotFound from './components/NotFound/NotFound';
import List from './components/Blogs/BlogsList/List';


const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initBlogs())
  },[dispatch])

  return (
    <Router>
      <header>
        <Notification />
      </header>
      <NavBar/>
      <div className='mainContainer'>

          <Routes>
            <Route path='/' element={<List />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>

      </div>
      
    </Router>
  )
}


export default App
