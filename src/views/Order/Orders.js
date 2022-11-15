/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
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
} from '@coreui/react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import DetailOrder from './DetailOrder'
export default function Orders() {
    const token = localStorage.getItem('token')
    const urlOrder = 'https://localhost:44361/api/v1/orders'
    var [order, setOrder] = useState([])
    const [search, setSearch] = useState('')
    const [detailVisible, setDetailVisible] = useState(false)
    // var [isClicked, setIsClicked] = useState(false);
    // const [show, setShow] = useState(false);

    // const hideModal = () => {
    //     setShow(false);
    // };
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
    }

    const checkStatus = (status) => {
        switch (status) {
            case 0:
                return 'Đang thực hiện'
            case 1:
                return 'Hoàng thành'
            case 3:
                return 'Hủy'
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
                <CButton onClick={() => setUpdateVisible(!updatuVisible)}>Chi tiết</CButton>
                <CModal size="xl" alignment="center" visible={updatuVisible} onClose={() => {
                    setUpdateVisible(false)
                    window.location.reload()
                }}>
                    <CModalHeader>
                        <CModalTitle>Chi tiết đơn hàng</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <DetailOrder id={row.id} totalPrice={row.totalPrice} />
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => {
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

    const columns = [
        {
            name: 'Mã đơn hàng',
            selector: row => row.id,
            sortable: true,
            cell: row => (<div>{row.id}</div>)
        }, {
            name: 'Giá tổng cộng',
            selector: row => row.totalPrice,
            sortable: true,
            cell: row => (<div>{row.totalPrice}</div>)
        },
        {
            name: 'Trạng thái',
            selector: row => row.status,
            sortable: true,
            cell: row => (<div><p className={getColor(row.status)}>{checkStatus(row.status)}</p></div>)
        },
        {
            name: 'Hành động',
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

    const filteredData = order.filter(item => {
        return item.shopId.toLowerCase().match(search.toLowerCase())
    })

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thông tin Đơn Hàng</strong>
                    </CCardHeader>
                    <CCardBody>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            title='Danh sách Đơn hàng'
                            fixedHeader
                            fixedHeaderScrollHeight='400px'
                            highlightOnHover
                            // onRowClicked={DetailForm}
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
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    )
}

