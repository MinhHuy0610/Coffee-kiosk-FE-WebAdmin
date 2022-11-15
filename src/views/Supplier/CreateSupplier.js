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

const CreateSupplier = () => {
  const token = localStorage.getItem('token')
  const shopId = localStorage.getItem('shopId')
  const [validated, setValidated] = useState(false)
  const urlProduct = 'https://localhost:44361/api/v1/products?Status=0'
  var [productOption, setProductOption] = useState([]);
  // var listImages = []
  console.log(token)
  const fetchData = async () => {
    axios.get(urlProduct, {
      headers: {
        'Conttent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        console.log(res)
        console.log(res.data.data.data)
        setProductOption(
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
    const noti = toast("Vui lòng đợi...");
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      event.preventDefault()
      const productId = event.target.productId.value
      const quantity = event.target.quantity.value
      const data = {
        shopId,
        productId,
        quantity,
      }
      console.log(JSON.stringify(data))
      const urlSupplier = 'https://localhost:44361/api/v1/supplies'
      fetch(urlSupplier, {
        method: "POST",
        // axios.post(urlCampaign, {
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
    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
      <ToastContainer autoClose={1000} />
      <CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Chọn Sản Phẩm</CFormLabel>
          <CFormSelect id="productId" options={productOption} >
          </CFormSelect>
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Số lượng</CFormLabel>
          <CFormInput type="text" id="quantity" required />
        </CCol>
        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Nhập hàng
          </CButton>
        </CCol>
      </CCol>
    </CForm>
  )
}

export default CreateSupplier
