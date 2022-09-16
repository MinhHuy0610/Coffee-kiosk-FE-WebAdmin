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
import CreateCategoryForm from './CreateCategoriesForm';

export default function Categories() {
  const token = localStorage.getItem('token')
  const urlCategory = 'https://localhost:44361/api/v1/categories?Status=0'

  var [category, setCategory] = useState([])
  const [search, setSearch] = useState('')

  // const hideModal = () => {
  //   setShow(false);
  // };

  const fetchData = async () => {
    axios.get(urlCategory, {
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
        setCategory(res.data.data.data)
        category = res.data.data.data
        console.log(category)
      }).catch((error) => {
        console.log(error)
      })
  }

  const checkStatus = (status) => {
    switch (status) {
      case 0:
        return 'Có thể sử dụng'
      case 1:
        return 'Không thể sử dụng'
      case 3:
        return 'Đã xóa'
    }
  }
  const getColor = (status) => {
    switch (status) {
      case 0:
        return 'text-primary'
      case 1:
        return 'text-danger'
      case 2:
        return 'text-dark'
    }
  }

  const columns = [
    {
      name: 'Tên loại',
      selector: row => row.name,
      sortable: true,
      cell: row => (<div>{row.name}</div>)
    },
    {
      name: 'Trạng thái',
      selector: row => row.status,
      sortable: true,
      cell: row => (<div><p className={getColor(row.status)}>{checkStatus(row.status)}</p></div>)
    },
    {
      name: 'Action',
      cell: (row) => (
        <button className='btn btn-primary' onClick={() => alert(row.Name)} >
          Edit
        </button>
      ),
    },
  ]
  useEffect(() => {
    fetchData()
  }, [])

  const filteredData = category.filter(item => {
    return item.name.toLowerCase().match(search.toLowerCase())
  })


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Loại sản phẩm</strong>
          </CCardHeader>
          <CCardBody>
            <DataTable
              columns={columns}
              data={filteredData}
              pagination
              title='Danh sách loại'
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
      <CButton onClick={() => setVisible(!visible)}>Thêm Loại Sản phẩm</CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Loại Sản phẩm</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CreateCategoryForm />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}