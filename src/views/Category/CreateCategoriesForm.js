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

export const CreateCategoryForm = () => {
  const token = localStorage.getItem('token')
  const urlCategory = "https://localhost:44361/api/v1/categories"
  const [isLoading, setIsLoading] = useState(true);
  const handleSubmit = async (event) => {
    const name = event.target.category_name.value;
    console.log(name)
    const data = { name: name }
    // const myJSON = JSON.stringify(data);
    // console.log(myJSON)
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
        else console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }
  return (

    <form id="create-category-form" onSubmit={handleSubmit}>
      <CCol md={6}>
        <input
          type="text"
          id="category_name"
          label="Tên Loại Sản phẩm"
          required
        />
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Tạo
        </CButton>
      </CCol>
    </form>
  )
}
export default CreateCategoryForm;