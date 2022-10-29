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
import { toast, ToastContainer } from "react-toastify";

export default function DetailCampaign(props) {
  const token = localStorage.getItem('token')
  const id = props.id
  const urlGetCampaign = `https://localhost:44361/api/v1/campaigns/${id}`
  const urlArea = 'https://localhost:44361/api/v1/areas'
  var [areaOption, setAreaOption] = useState([]);
  const [validated, setValidated] = useState(false)
  var [campaign, setCampaign] = useState([])
  const [editable, setEditable] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [completeDate, setCompleteDate] = useState(new Date());
  const today = new Date();
  const tommorrow = new Date();
  tommorrow.setDate(today.getDate() + 1);
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
        id,
        name,
        description,
        startingDate,
        expiredDate,
        areaId,
      }
      console.log(JSON.stringify(data))
      const urlCampaign = 'https://localhost:44361/api/v1/campaigns'
      fetch(urlCampaign, {
        method: "PUT",
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
    axios.get(urlGetCampaign, {
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
        setCampaign(res.data.data)
        campaign = res.data.data
        setStartDate(new Date(campaign.startingDate))
        setCompleteDate(new Date(campaign.expiredDate))
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
          <CFormLabel htmlFor="validationDefault01">Tên Chiến dịch</CFormLabel>
          <CFormInput type="text" id="name" readOnly={!editable} required defaultValue={campaign.name} />
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefault02">Mô tả</CFormLabel>
          <CFormInput type="text" id="description" readOnly={!editable} required defaultValue={campaign.description} />
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Khu vực</CFormLabel>
          <CFormInput type="text" id="areaName" readOnly={true} required defaultValue={campaign.areaName} />
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Chọn để thay đổi Khu vực</CFormLabel>
          <CFormSelect id="areaId" options={areaOption} disabled={!editable} >
          </CFormSelect>
        </CCol>
        <CCol md={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Ngày bắt đầu :</CFormLabel>
          <DatePicker
            minDate={today}
            value={startDate}
            onChange={setStartDate}
            disabled={!editable}
          />
        </CCol>
        <CCol xs={12}>
          <CFormLabel htmlFor="validationDefaultUsername">Ngày kết thúc :</CFormLabel>
          <DatePicker
            minDate={tommorrow}
            value={completeDate}
            onChange={setCompleteDate}
            disabled={!editable}
          />
        </CCol>
        <CCol xs={12}>
          <CButton color="primary" onClick={() => setEditable(true)} >
            Chỉnh sửa
          </CButton>
          <CButton color="primary" type="submit" disabled={!editable} >
            Cập nhật Chiến dịch
          </CButton>
        </CCol>
      </CForm>
    </CCol>
  )
}


