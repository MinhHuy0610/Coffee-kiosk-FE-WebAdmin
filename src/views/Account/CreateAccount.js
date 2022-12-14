/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CImage,
  CContainer,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";

const CreateAccount = () => {
  const token = localStorage.getItem('token')
  const [validated, setValidated] = useState(false)
  var [roleOption, setRoleOption] = useState([])
  // var listImages = []
  console.log(token)
  // replace area wih role
  const urlRole = 'https://localhost:44361/api/v1/roles'

  const fetchData = async () => {
    axios.get(urlRole, {
      headers: {
        'Conttent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        console.log(res)
        console.log(res.data.data.data)
        setRoleOption(
          res.data.data.map((data) => {
            var option = {
              value: data.id,
              label: data.roleName,
            };
            return option;
          })
        )
      }).catch((error) => {
        console.log(error)
      })
  }
  const handleSubmit = (event) => {
    const noti = toast("Vui lòng đợi...");
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      event.preventDefault()
      const username = event.target.username.value
      const password = event.target.password.value
      // const roleId = event.target.roleId.value
      const roleId = event.target.roleId.value
      const data = {
        username,
        password,
        roleId,
      }
      console.log(JSON.stringify(data))
      const urlAccount = 'https://localhost:44361/api/v1/accounts'
      fetch(urlAccount, {
        method: "POST",
        // axios.post(urlShop, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          else {
            toast.update(noti, {
              render: "Tạo thành công",
              type: "success",
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.update(noti, {
            render: error.toString(),
            type: "error",
            isLoading: false,
          });
        });
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CContainer className="px-4">
      <CRow xs={{ gutterX: 5 }}>
        <ToastContainer autoClose={1000} />
        <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefault01">Tên Tài khoản</CFormLabel>
            <CFormInput type="text" id="username" required />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefault02">Mật khẩu</CFormLabel>
            <CFormInput type="text" id="password" required />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefaultUsername">Vai trò</CFormLabel>
            <CFormSelect id="roleId" options={roleOption}>
            </CFormSelect>
          </CCol>
          <CCol xs={12}>
            <CButton color="primary" type="submit">
              Tạo Tài khoản
            </CButton>
          </CCol>
        </CForm>
      </CRow>
    </CContainer>
  )
}

export default CreateAccount
