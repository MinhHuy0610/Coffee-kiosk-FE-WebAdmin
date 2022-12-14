/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CButton,
  CFormLabel,
  CFormSelect,
  CForm,
} from '@coreui/react'
import axios from 'axios'

import DataTable from "react-data-table-component"
import DetailOrder from './DetailOrder'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import DatePicker from 'react-date-picker';
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {

  const token = localStorage.getItem('token')
  const urlOrder = 'https://localhost:44361/api/v1/orders'
  const urlShop = 'https://localhost:44361/api/v1/shops?Status=0'
  var [order, setOrder] = useState([])
  var [orderFind, setOrderFind] = useState([])
  const [search, setSearch] = useState('')
  const [validated, setValidated] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false)
  var [shopOption, setShopOption] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();
  // const today = new Date();
  // const tommorrow = new Date();
  // tommorrow.setDate(startDate.getDate() + 1);
  // const [completeDate, setCompleteDate] = useState(tommorrow);

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
        console.log(res.data.data.data)
        setOrder(res.data.data.data)
        order = res.data.data.data
        console.log(order)
      }).catch((error) => {
        console.log(error)
      })
    axios.get(urlShop, {
      headers: {
        'Conttent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        console.log(res)
        console.log(res.data.data.data)
        setShopOption(
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
    const noti = toast("Vui l??ng ?????i...")
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      event.preventDefault()
      const shopId = event.target.shopId.value
      const createDate = startDate.toISOString().slice(0, 23)
      const urlOrder = `https://localhost:44361/api/v1/orders?CreateDate=${createDate}&ShopId=${shopId}`
      axios.get(urlOrder, {
        headers: {
          'Conttent-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then((res) => {
          console.log(res)
          console.log(res.data.data.data)
          setOrderFind(res.data.data.data)
          orderFind = res.data.data.data
        }).catch((error) => {
          console.log(error)
        })
    }
  }

  const checkStatus = (status) => {
    switch (status) {
      case 0:
        return '??ang th???c hi???n'
      case 1:
        return 'Ho??ng th??nh'
      case 3:
        return 'H???y'
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
  // const editAction = (row) => {
  //     setShopInfo(row.id)
  // }
  // const onRowClick = (row) => {
  //     setDetailVisible(!detailVisible)
  //     DetailForm(row)
  // }
  const DetailForm = (row) => {
    const [updatuVisible, setUpdateVisible] = useState(false)
    return (
      <>
        <CButton onClick={() => setUpdateVisible(!updatuVisible)}>Chi ti???t</CButton>
        <CModal size="xl" alignment="center" visible={updatuVisible} onClose={() => {
          setUpdateVisible(false)
          window.location.reload()
        }}>
          <CModalHeader>
            <CModalTitle>Chi ti???t ????n h??ng</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <DetailOrder id={row.id} totalPrice={row.totalPrice} />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => {
              setUpdateVisible(false)
              window.location.reload()
            }}>
              ????ng
            </CButton>
          </CModalFooter>
        </CModal>
      </>
    )
  }

  const columns = [
    {
      name: 'T??n c???a h??ng',
      selector: row => row.shopName,
      sortable: true,
      cell: row => (<div>{row.shopName}</div>)
    },
    {
      name: 'M?? ????n h??ng',
      selector: row => row.id,
      sortable: true,
      cell: row => (<div>{row.id}</div>)
    }, {
      name: 'Gi?? t???ng c???ng',
      selector: row => row.totalPrice,
      sortable: true,
      cell: row => (<div>{row.totalPrice}</div>)
    },
    {
      name: 'Tr???ng th??i',
      selector: row => row.status,
      sortable: true,
      cell: row => (<div><p className={getColor(row.status)}>{checkStatus(row.status)}</p></div>)
    },
    {
      name: 'H??nh ?????ng',
      cell: (row) => (
        // <button className='btn btn-primary' onClick={editAction(row)} >
        //     Edit
        // </button>
        DetailForm(row)
      ),
    },
  ]

  useEffect(() => {
    fetchData()
  }, [])
  // useEffect(() => {
  //   window.location.reload()
  // }, [filteredData])

  const filteredData = order.filter(item => {
    return item.shopId.toLowerCase().match(search.toLowerCase())
  })
  const filteredDataFind = orderFind.filter(item => {
    return item.shopId.toLowerCase().match(search.toLowerCase())
  })

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
            <ToastContainer autoClose={1000} />
            <CRow>
              <CCol md={6} >
                <CFormLabel htmlFor="validationDefaultUsername">Ng??y t???o :</CFormLabel>
                <DatePicker
                  value={startDate}
                  onChange={setStartDate}
                />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationDefaultUsername">C???a h??ng</CFormLabel>
                <CFormSelect id="shopId" options={shopOption}>
                </CFormSelect>
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  L???y b??o c??o doanh thu
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Th??ng tin ????n H??ng</strong>
                </CCardHeader>
                <CCardBody>
                  {orderFind.length > 0 && (
                    <DataTable
                      columns={columns}
                      data={filteredDataFind}
                      pagination
                      title='Danh s??ch ????n h??ng'
                      fixedHeader
                      fixedHeaderScrollHeight='400px'
                      highlightOnHover
                      // onRowClicked={DetailForm}
                      subHeader
                      subHeaderComponent={
                        <input
                          type='text'
                          placeholder='T??m ki???m'
                          className='w-25 form-control'
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      }
                    />)}
                  {/* <label>T???ng thu nh???p l?? : {parseFloat(order[1].totalPriceOfAllOrders).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</label> */}
                  <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    title='Danh s??ch ????n h??ng'
                    fixedHeader
                    fixedHeaderScrollHeight='400px'
                    highlightOnHover
                    // onRowClicked={DetailForm}
                    subHeader
                    subHeaderComponent={
                      <input
                        type='text'
                        placeholder='T??m ki???m'
                        className='w-25 form-control'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    }
                  />
                </CCardBody>
                <CCardFooter>
                </CCardFooter>
              </CCard>

            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
            {/* <label>T???ng thu nh???p l?? : {parseFloat(filteredData[1].totalPriceOfAllOrders).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</label> */}
          </CRow>
        </CCardFooter>
      </CCard>


    </>
  )
}

export default Dashboard
