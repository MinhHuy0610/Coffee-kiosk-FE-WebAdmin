/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCardGroup,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CContainer,
  CForm,
  // CFormInput,
  // CToast,
  // CToastBody,
  // CToaster,
  // CToastHeader,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import DataTable from "react-data-table-component";
import CreateAreaForm from './CreateAreaForm';
import DetailArea from './DetailArea';

export default function Areas() {
  const token = localStorage.getItem('token')
  const urlArea = 'https://localhost:44361/api/v1/areas'

  var [area, setArea] = useState([])
  const [search, setSearch] = useState('')

  // const hideModal = () => {
  //   setShow(false);
  // };

  const fetchData = async () => {
    axios.get(urlArea, {
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
        console.log(res.data.data.data)
        setArea(res.data.data.data)
        area = res.data.data.data
        console.log(area)
      }).catch((error) => {
        console.log(error)
      })
  }

  // const checkStatus = (status) => {
  //   switch (status) {
  //     case 0:
  //       return 'Có thể sử dụng'
  //     case 1:
  //       return 'Không thể sử dụng'
  //     case 3:
  //       return 'Đã xóa'
  //   }
  // }
  // const getColor = (status) => {
  //   switch (status) {
  //     case 0:
  //       return 'text-primary'
  //     case 1:
  //       return 'text-danger'
  //     case 2:
  //       return 'text-dark'
  //   }
  // }

  const columns = [
    {
      name: 'Tên khu vực',
      selector: row => row.areaName,
      sortable: true,
      cell: row => (<div>{row.areaName}</div>)
    },
    {
      name: 'Hành động',
      cell: (row) => (
        AreaForm(row)
      ),
    },
  ]
  useEffect(() => {
    fetchData()
  }, [])

  const filteredData = area.filter(item => {
    return item.areaName.toLowerCase().match(search.toLowerCase())
  })

  const AreaForm = (row) => {
    const [updatuVisible, setUpdateVisible] = useState(false)
    return (
      <>
        <CButton onClick={() => setUpdateVisible(!updatuVisible)}>Chi tiết</CButton>
        <CModal size="xl" alignment="center" visible={updatuVisible}
          onClose={() => {
            setUpdateVisible(false)
            window.location.reload()
          }}>
          <CModalHeader>
            <CModalTitle>Thông Tin Loại Sản phẩm</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <DetailArea id={row.id} />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary"
              onClick={() => {
                setUpdateVisible(false)
                window.location.reload()
              }}>
              Đóng
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    )
  }


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Khu vực</strong>
          </CCardHeader>
          <CCardBody>
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              title='Danh sách khu vực'
              fixedHeader
              fixedHeaderScrollHeight='400px'
              highlightOnHover
              subHeader
              subHeaderComponent={
                <input
                  type='text'
                  placeholder='Tìm kiếm'
                  className='w-25 form-control'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              }
            />
          </CCardBody>
          <CCardFooter>
            {VerticallyCentered()}
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}
const VerticallyCentered = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Thêm Khu vực</CButton>
      <CModal alignment="center" visible={visible}
        onClose={() => {
          setVisible(false)
          window.location.reload()
        }}>
        <CModalHeader>
          <CModalTitle>Thêm Khu vực</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CreateAreaForm />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary"
            onClick={() => {
              setVisible(false)
              window.location.reload()
            }}>
            Đóng
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}