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
import DatePicker from 'react-date-picker'
import { toast, ToastContainer } from "react-toastify"

export default function DetailDiscount(props) {
  const token = localStorage.getItem('token')
  const id = props.id
  const urlGetDiscount = `https://localhost:44361/api/v1/discounts/${id}`
  const urlProduct = 'https://localhost:44361/api/v1/products?Status=0'
  const urlCampaign = 'https://localhost:44361/api/v1/campaigns?Status=0'
  var [campaignOption, setCampaignOption] = useState([]);
  var [productOption, setProductOption] = useState([]);
  const [validated, setValidated] = useState(false)
  var [discount, setDiscount] = useState([])
  const [editable, setEditable] = useState(false)
  const today = new Date();
  const tommorrow = new Date();
  tommorrow.setDate(today.getDate() + 1);
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
      const campaignId = event.target.campaignId.value
      const requiredValue = event.target.requiredValue.value
      const discountValue = event.target.discountValue.value
      const data = {
        id,
        discountValue,
        campaignId,
        requiredValue
      }
      console.log(JSON.stringify(data))
      const urlDiscount = 'https://localhost:44361/api/v1/discounts'
      fetch(urlDiscount, {
        method: "PUT",
        // axios.post(urlDiscount, {
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
    axios.get(urlCampaign, {
      headers: {
        'Conttent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        console.log(res)
        console.log(res.data.data.data)
        setCampaignOption(
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
    axios.get(urlGetDiscount, {
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
        setDiscount(res.data.data)
        discount = res.data.data
      }).catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CCol>
      <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
        <ToastContainer autoClose={1000} />
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefault02">Tên Chiến dịch</CFormLabel>
          <CFormInput type="text" id="campaignName" readOnly={true} required defaultValue={discount.campaignName} />
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Phần trăm khuyến mãi</CFormLabel>
          <CFormInput type="text" id="discountPercentage" readOnly={!editable} required defaultValue={discount.discountValue} />
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Chọn để thay đổi Chiến dịch</CFormLabel>
          <CFormSelect id="campaignId" options={campaignOption} disabled={!editable} >
          </CFormSelect>
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Giá trị yêu cầu</CFormLabel>
          <CFormInput type="text" id="requiredValue" readOnly={!editable} required defaultValue={discount.requiredValue} />
        </CCol>
        <CCol xs={12}>
          <CButton color="primary" onClick={() => setEditable(true)} >
            Chỉnh sửa
          </CButton>
          <CButton color="primary" type="submit" disabled={!editable} >
            Cập nhật Khuyến mãi
          </CButton>
        </CCol>
      </CForm>
    </CCol>
  )
}


