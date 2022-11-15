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

export default function DetailSupplier(props) {
  const token = localStorage.getItem('token')
  const id = props.id
  const urlGetSupplier = `https://localhost:44361/api/v1/supplies/${id}`
  const urlProduct = 'https://localhost:44361/api/v1/products?Status=0'
  var [productOption, setProductOption] = useState([]);
  const [validated, setValidated] = useState(false)
  var [supplier, setSupplier] = useState([])
  const [editable, setEditable] = useState(false)
  const [supEditable, setSupEditable] = useState(false)
  const handleSubmit = (event) => {
    const noti = toast("Vui lòng đợi...");
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      if (supEditable === true) {
        event.preventDefault()
        const supQuantity = event.target.supQuantity.value
        const data = {
          id,
          supQuantity,
        }
        console.log(JSON.stringify(data))
        const urlSupplierQuantity = 'https://localhost:44361/api/v1/supplies/supply-quantity'
        fetch(urlSupplierQuantity, {
          method: "PATCH",
          // axios.post(urlSupplier, {
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
      } else if (editable === true) {
        event.preventDefault()
        const quantity = event.target.quantity.value
        const data = {
          id,
          quantity,
        }
        console.log(JSON.stringify(data))
        const urlQuantity = 'https://localhost:44361/api/v1/supplies/quantity'
        fetch(urlQuantity, {
          method: "PATCH",
          // axios.post(urlSupplier, {
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
  }
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
    axios.get(urlGetSupplier, {
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
        setSupplier(res.data.data)
        supplier = res.data.data
      }).catch((error) => {
        console.log(error)
      })
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
            <CFormLabel htmlFor="validationDefault01">Tên Cửa hàng</CFormLabel>
            <CFormInput type="text" id="shopName" readOnly={true} required defaultValue={supplier.shopName} />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefault01">Tên Sản phẩm</CFormLabel>
            <CFormInput type="text" id="productName" readOnly={true} required defaultValue={supplier.productName} />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefault02">Số lượng mỗi tuần</CFormLabel>
            <CFormInput type="text" id="quantity" readOnly={!editable} required defaultValue={supplier.quantity} />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefault02">Số lượng tồn kho</CFormLabel>
            <CFormInput type="text" id="supQuantity" readOnly={!supEditable} required defaultValue={supplier.supplyQuantity} />
          </CCol>
          <CCol xs={12}>
            <CButton color="primary" onClick={() => setEditable(true)} >
              Chỉnh sửa Số lượng mỗi tuần
            </CButton>
            <CButton color="primary" onClick={() => setSupEditable(true)} >
              Chỉnh sửa Số lượng tồn kho
            </CButton>
            <CButton color="primary" type="submit" >
              Cập nhật
            </CButton>
          </CCol>
        </CForm>
      </CRow>
    </CContainer>
  )
}


