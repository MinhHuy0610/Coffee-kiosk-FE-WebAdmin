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

const CreateShop = () => {
  const token = localStorage.getItem('token')
  const [validated, setValidated] = useState(false)
  var [areaOption, setAreaOption] = useState([])
  var [accountOption, setAccountOption] = useState([])
  // var listImages = []
  console.log(token)
  const urlArea = 'https://localhost:44361/api/v1/areas'
  const urlAccount = 'https://localhost:44361/api/v1/accounts?RoleName=Staff'

  const fetchData = async () => {
    axios.get(urlArea, {
      headers: {
        'Conttent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        console.log(res)
        console.log(res.data.data.data)
        setAreaOption(
          res.data.data.data.map((data) => {
            var option = {
              value: data.id,
              label: data.areaName,
            };
            return option;
          })
        )
      }).catch((error) => {
        console.log(error)
      })
    axios.get(urlAccount, {
      headers: {
        'Conttent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        console.log(res)
        console.log(res.data.data.data)
        setAccountOption(
          res.data.data.data.map((data) => {
            var option = {
              value: data.id,
              label: data.username,
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
      const name = event.target.name.value
      const description = event.target.description.value
      const address = event.target.address.value
      const areaId = event.target.areaId.value
      const accountId = event.target.accountId.value
      const data = {
        name,
        description,
        address,
        areaId,
        accountId,
      }
      console.log(JSON.stringify(data))
      const urlShop = 'https://localhost:44361/api/v1/shops'
      fetch(urlShop, {
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
            <CFormLabel htmlFor="validationDefault01">Tên Cửa Hàng</CFormLabel>
            <CFormInput type="text" id="name" required />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefault02">Mô tả</CFormLabel>
            <CFormInput type="text" id="description" required />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefault02">Địa chỉ</CFormLabel>
            <CFormInput type="text" id="address" required />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefaultUsername">Khu vực</CFormLabel>
            <CFormSelect id="areaId" options={areaOption}>
            </CFormSelect>
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefaultUsername">Tài khoản</CFormLabel>
            <CFormSelect id="accountId" options={accountOption}>
            </CFormSelect>
          </CCol>
          <CCol xs={12}>
            <CButton color="primary" type="submit">
              Tạo Cửa Hàng
            </CButton>
          </CCol>
        </CForm>
      </CRow>
    </CContainer>
  )
}

export default CreateShop
