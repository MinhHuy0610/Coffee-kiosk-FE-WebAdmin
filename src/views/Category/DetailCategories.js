/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CContainer,
  CRow,
  CImage,
  CFormSelect,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";

export default function DetailCategory(props) {
  const token = localStorage.getItem('token')
  const id = props.id
  const urlCategory = `https://localhost:44361/api/v1/categories/${id}`
  const [validated, setValidated] = useState(false)
  var [category, setCategory] = useState([])
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
      const name = event.target.name.value
      const data = {
        id,
        name,
      }
      console.log(JSON.stringify(data))
      const urlUpdateCategory = 'https://localhost:44361/api/v1/categories'
      fetch(urlUpdateCategory, {
        method: "PUT",
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
              render: "Cập nhật thành công",
              type: "success",
            });
            return response.status;
          }
        })
        .catch((error) => {
          console.log(error);
          toast.update(noti, {
            render: error.toString(),
            type: "error",
            isLoading: true,
          });
        });
    }
  }
  const fetchData = async () => {
    axios.get(urlCategory, {
      headers: {
        'Conttent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        if (res.status == 200)
          console.log(res)
        console.log(res.data)
        console.log(res.data.data)
        console.log(res.data.data)
        setCategory(res.data.data)
        category = res.data.data
      }).catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CContainer className="px-4">
      <ToastContainer autoClose={1000} />
      <CCol>
        <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefault01">Tên Loại Sản Phẩm</CFormLabel>
            <CFormInput type="text" id="name" required defaultValue={category.name} />
          </CCol>
          <CCol xs={12}>
            <CButton color="primary" type="submit" >
              Cập nhật
            </CButton>
          </CCol>
        </CForm>
      </CCol>
    </CContainer>
  )
}


