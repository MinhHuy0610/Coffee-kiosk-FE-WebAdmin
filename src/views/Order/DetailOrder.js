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

export default function DetailOrder(props) {
  const token = localStorage.getItem('token')
  const id = props.id
  const shopId = localStorage.getItem('shopId')
  const totalPrice = props.totalPrice
  const urlOrder = `https://localhost:44361/api/v1/orderDetails/listOrderDetails?id=${id}`
  const [validated, setValidated] = useState(false)
  var [orders, setOrders] = useState([])
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
      //const OrderName = event.target.name.value
      const data = {
        id,
        shopId,
      }
      console.log(JSON.stringify(data))
      const urlUpdateOrder = `https://localhost:44361/api/v1/orders?id=${id}&shopId=${shopId}`
      fetch(urlUpdateOrder, {
        method: "PATCH",
        // axios.post(urlProduct, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
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
    axios.get(urlOrder, {
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
        setOrders(res.data.data)
        orders = res.data.data
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
          {orders.map((order) => (
            <CCol md={12} key={order.productName}>
              <CFormLabel htmlFor="validationDefault01">Tên Sản phẩm</CFormLabel>
              <CFormInput type="text" id="name" required defaultValue={order.productName} />
              <CCol md={12}>
                <CFormLabel htmlFor="validationDefault01">Số lượng</CFormLabel>
                <CFormInput type="text" id="name" required defaultValue={order.quantity} />
              </CCol>
            </CCol>
          ))}
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefault01">Giá Tiền Của Đơn Hàng</CFormLabel>
            <CFormInput type="text" id="totalPrice" required defaultValue={totalPrice} />
          </CCol>
          <CCol xs={12}>
            <CButton color="primary" type="submit" >
              Hoàn Thành
            </CButton>
          </CCol>
        </CForm>
      </CCol>
    </CContainer>
  )
}


