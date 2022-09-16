/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { Component, Suspense, Navigate } from 'react'
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom'
import './scss/style.scss'
import useRole from './components/app/useRole'
import useToken from './components/app/useToken'
import useUserId from './components/app/useUserId'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  const { token, setToken } = useToken()
  const { role, setRole } = useRole()
  const { userId, setUserId } = useUserId()
  console.log(token)
  console.log(role)
  console.log(userId)
  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          {/* <Route path="/login" name="Register Page" element={<Login setToken={setToken} setRole={setRole} setUserId={setUserId} />} /> */}
          <Route path="*" name="Register Page" element={<Login setToken={setToken} setRole={setRole} setUserId={setUserId} />} />
        </Routes>
      </BrowserRouter>
    )
  } else if (token && role === 'Admin') {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" name="Register Page" element={<Register />} />
          <Route path="/404" name="Page 404" element={<Page404 />} />
          <Route path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
