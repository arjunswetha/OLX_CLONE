import React, { useEffect, useContext, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
import Create from './Components/Create/Create'
import View from './Pages/ViewPost'
import { AuthContext, FirebaseContext } from './store/FirebaseContext'
import Post from './store/PostContext'

function App() {
  const { setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe()
  }, [firebase, setUser])

  return (
    <div>
      <Post>
        <Router>
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            
            <Route path='/create' element={<Create />} />
            <Route path='/view' element={<View />} />



          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App
