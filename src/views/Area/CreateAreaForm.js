/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardGroup,
  CCol,
  CFormInput,
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
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";

const CreateAreaForm = () => {
  const token = localStorage.getItem('token')
  const [validated, setValidated] = useState(false)
  const urlCategory = "https://localhost:44361/api/v1/areas"
  const handleSubmit = async (event) => {
    const noti = toast("Vui lòng đợi...");
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      event.preventDefault()
      const areaName = event.target.areaName.value;
      console.log(areaName)
      const data = { areaName }
      const myJSON = JSON.stringify(data);
      console.log(myJSON)
      fetch(urlCategory, {
        method: "POST",
        // axios.post(urlProduct, {
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
  return (
    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
      <ToastContainer autoClose={1000} />
      <CCol md={6}>
        <CFormInput type="text" id="areaName" required />
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Tạo
        </CButton>
      </CCol>
    </CForm>
  )
}
export default CreateAreaForm;
