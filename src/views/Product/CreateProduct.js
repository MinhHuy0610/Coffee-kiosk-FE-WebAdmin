/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'
import axios from 'axios'

const CreateProduct = () => {
  const token = localStorage.getItem('token')
  const [validated, setValidated] = useState(false)
  var [cateOption, setCateOption] = useState([]);
  console.log(token)
  const urlCategory = 'https://localhost:44361/api/v1/categories?Status=0'
  const fetchData = async () => {
    axios.get(urlCategory, {
      headers: {
        'Conttent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        console.log(res)
        console.log(res.data.data.data)
        setCateOption(
          res.data.data.data.map((data) => {
            var option = {
              value: data.id,
              label: data.name,
            };
            return option;
          })
        )
      }).catch((error) => {
        console.log(error)
      })
  }
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      event.preventDefault()
      const name = event.target.name.value
      const categoryId = event.target.categoryId.value
      const description = event.target.description.value
      const price = event.target.price.value
      const data = {
        name,
        categoryId,
        description,
        price,
      }
      console.log(JSON.stringify(data))
      const urlProduct = 'https://localhost:44361/api/v1/products'
      fetch(urlProduct, {
        method: "POST",
        // axios.post(urlProduct, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok)
            throw new Error(response.status)
          else {
            return response.status;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  useEffect(() => {
    fetchData()
    console.log(cateOption)
  }, [])
  return (
    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
      <CCol md={4}>
        <CFormLabel htmlFor="validationDefault01">Tên Sản Phẩm</CFormLabel>
        <CFormInput type="text" id="name" required />
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationDefault02">Mô tả</CFormLabel>
        <CFormInput type="text" id="description" required />
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationDefaultUsername">Loại Sản phẩm</CFormLabel>
        <CFormSelect id="categoryId" options={cateOption}>
        </CFormSelect>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationDefault03">Giá bán</CFormLabel>
        <CFormInput type="text" id="price" required />
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  )
}

export default CreateProduct
