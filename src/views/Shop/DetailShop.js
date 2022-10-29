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

export default function DetailShop(props) {
  const token = localStorage.getItem('token')
  const id = props.id
  const urlGetShop = `https://localhost:44361/api/v1/shops/${id}`
  const urlArea = 'https://localhost:44361/api/v1/areas'
  var [areaOption, setAreaOption] = useState([])
  const [validated, setValidated] = useState(false)
  var [shop, setShop] = useState([])
  const [editable, setEditable] = useState(false)
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
      const data = {
        id,
        name,
        description,
        address,
        areaId,
      }
      console.log(JSON.stringify(data))
      const urlShop = 'https://localhost:44361/api/v1/shops'
      fetch(urlShop, {
        method: "PUT",
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
    axios.get(urlGetShop, {
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
        setShop(res.data.data)
        shop = res.data.data
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
            <CFormLabel htmlFor="validationDefault01">Tên Sản Phẩm</CFormLabel>
            <CFormInput type="text" id="name" readOnly={!editable} required defaultValue={shop.name} />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefault02">Mô tả</CFormLabel>
            <CFormInput type="text" id="description" readOnly={!editable} required defaultValue={shop.description} />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefault02">Địa chỉ</CFormLabel>
            <CFormInput type="text" id="address" readOnly={!editable} required defaultValue={shop.address} />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefaultUsername">Khu vực</CFormLabel>
            <CFormInput type="text" id="areaName" readOnly={true} required defaultValue={shop.areaName} />
          </CCol>
          <CCol md={12}>
            <CFormLabel htmlFor="validationDefaultUsername">Chọn để thay đổi Khu vực</CFormLabel>
            <CFormSelect id="areaId" options={areaOption} disabled={!editable} >
            </CFormSelect>
          </CCol>
          <CCol xs={12}>
            <CButton color="primary" onClick={() => setEditable(true)} >
              Chỉnh sửa
            </CButton>
            <CButton color="primary" type="submit" disabled={!editable} >
              Cập nhật Sản phẩm
            </CButton>
          </CCol>
        </CForm>
      </CRow>
    </CContainer>
  )
}


