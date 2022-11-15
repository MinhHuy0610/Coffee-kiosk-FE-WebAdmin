/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  // CFormInput,
  // CToast,
  // CToastBody,
  // CToaster,
  // CToastHeader,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { toast, ToastContainer } from 'react-toastify'

export default function Login({ setToken, setRole, setUserId, setShopId }) {
  const userRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [success, setSucess] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  async function loginUser(credentials) {
    const noti = toast('Vui lòng đợi...')
    console.log(credentials)
    console.log(JSON.stringify(credentials))
    return fetch('https://localhost:44361/api/v1/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status)
        else {
          toast.update(noti, {
            render: 'Tạo thành công',
            type: 'success',
            isLoading: false,
          })
          return response.json()
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.status === 404) {
          setErrMsg('Tên đăng nhập hoặc mật khẩu không chính xác')
        } else {
          setErrMsg('Tên đăng nhập hoặc mật khẩu không chính xác')
        }
        errRef.current.focus()
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(username)
    console.log(password)
    const data = await loginUser({
      username,
      password,
    })
    console.log(data)
    if (!data) {
      setToken('')
      setRole('')
    } else {
      // var obj = JSON.parse(JSON.stringify(data))
      console.log(data.data)
      setToken(data.data.token)
      setShopId(data.data.shopId)
      setRole(data.data.roleName)
      setUserId(data.data.id)
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <ToastContainer autoClose={1000} />
        <CRow className="justify-content-center">
          <CCol md={8}>
            {/* <CCardGroup> */}
            <CCard className="p-4 align-items-center">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h1>Đăng nhập</h1>
                  <p
                    ref={errRef}
                    className={errMsg ? 'errmsg' : 'offscreen'}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <input
                      type="text"
                      id="username"
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUsername(e.target.value)}
                      className="input"
                      placeholder="Tài Khoản"
                      required
                    />
                    {/* <CFormInput
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Tài Khoản"
                      feedbackInvalid="Vui lòng nhập tài khoản"
                      required
                      /> */}
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <input
                      type="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="input"
                      placeholder="Mật Khẩu"
                      required
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton color="primary" className="px-4" type="submit">
                        Đăng Nhập
                      </CButton>
                    </CCol>
                    {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            {/* </CCardGroup> */}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
}
Login.propTypes = {
  setRole: PropTypes.func.isRequired,
}
Login.propTypes = {
  setUserId: PropTypes.func.isRequired,
}
Login.propTypes = {
  setShopId: PropTypes.func.isRequired,
}
