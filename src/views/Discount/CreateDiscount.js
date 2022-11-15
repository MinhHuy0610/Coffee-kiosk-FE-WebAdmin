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
import ReactDatePicker from "react-datepicker"
import DatePicker from 'react-date-picker';
import { toast, ToastContainer } from "react-toastify";

const CreateDiscount = () => {
  const token = localStorage.getItem('token')
  const [validated, setValidated] = useState(false)
  const urlProduct = 'https://localhost:44361/api/v1/products?Status=0'
  const urlCampaign = 'https://localhost:44361/api/v1/campaigns?Status=0'
  var [campaignOption, setCampaignOption] = useState([]);
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
      const campaignId = event.target.campaignId.value
      const discountValue = event.target.discountPercentage.value
      const requiredValue = event.target.requiredValue.value
      const data = {
        campaignId,
        discountValue,
        requiredValue
      }
      console.log(JSON.stringify(data))
      const urlDiscount = 'https://localhost:44361/api/v1/discounts'
      fetch(urlDiscount, {
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
          <CFormLabel htmlFor="validationDefaultUsername">Chọn Chiến dịch</CFormLabel>
          <CFormSelect id="campaignId" options={campaignOption} >
          </CFormSelect>
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Phần trăm khuyến mãi</CFormLabel>
          <CFormInput type="text" id="discountPercentage" required />
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Giá trị yêu cầu</CFormLabel>
          <CFormInput type="text" id="requiredValue" required />
        </CCol>
        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Tạo Chiến dịch
          </CButton>
        </CCol>
      </CCol>
    </CForm>
  )
}

export default CreateDiscount
