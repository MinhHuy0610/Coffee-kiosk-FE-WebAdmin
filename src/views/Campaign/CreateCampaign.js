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

const CreateCampaign = () => {
  const token = localStorage.getItem('token')
  const [validated, setValidated] = useState(false)
  var [areaOption, setAreaOption] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();
  const tommorrow = new Date();
  tommorrow.setDate(startDate.getDate() + 1);
  const [completeDate, setCompleteDate] = useState(tommorrow);
  // var listImages = []
  console.log(token)
  const urlArea = 'https://localhost:44361/api/v1/areas'
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
  }
  const handleSubmit = (event) => {
    const noti = toast("Vui lòng đợi...")
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      event.preventDefault()
      const name = event.target.name.value
      const areaId = event.target.areaId.value
      const description = event.target.description.value
      const startingDate = startDate
      const expiredDate = completeDate
      const data = {
        name,
        description,
        startingDate,
        expiredDate,
        areaId,
      }
      console.log(JSON.stringify(data))
      const urlCampaign = 'https://localhost:44361/api/v1/campaigns'
      fetch(urlCampaign, {
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
            })
          }
        })
        .catch((error) => {
          console.log(error)
          toast.update(noti, {
            render: error.toString(),
            type: "error",
            isLoading: false,
          })
        })
    }
  }
  useEffect(() => {
    fetchData()
    console.log(areaOption)
  }, [])
  useEffect(() => { }, [completeDate, startDate]);

  return (
    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
      <ToastContainer autoClose={1000} />
      <CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefault01">Tên Chiến dịch</CFormLabel>
          <CFormInput type="text" id="name" required />
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefault02">Mô tả</CFormLabel>
          <CFormInput type="text" id="description" required />
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Khu vực</CFormLabel>
          <CFormSelect id="areaId" options={areaOption}>
          </CFormSelect>
        </CCol>
        <CCol md={12} >
          <CFormLabel htmlFor="validationDefaultUsername">Ngày bắt đầu :</CFormLabel>
          <DatePicker
            minDate={today}
            value={startDate}
            onChange={setStartDate}
          />
        </CCol>
        <CCol xs={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Ngày kết thúc :</CFormLabel>
          <DatePicker
            minDate={tommorrow}
            value={completeDate}
            onChange={setCompleteDate}
          />
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

export default CreateCampaign
