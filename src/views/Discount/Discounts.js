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
import CreateDiscount from './CreateDiscount'
import DetailDiscount from './DetailDiscount'
export default function Discounts() {
    const token = localStorage.getItem('token')
    const urlDiscount = 'https://localhost:44361/api/v1/discounts?Status=0'
    var [discount, setDiscount] = useState([])
    const [search, setSearch] = useState('')
    const [discountInfo, setDiscountInfo] = useState()
    const [detailVisible, setDetailVisible] = useState(false)
    // var [isClicked, setIsClicked] = useState(false);
    // const [show, setShow] = useState(false);

    // const hideModal = () => {
    //     setShow(false);
    // };
    const fetchData = async () => {
        axios.get(urlDiscount, {
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
                setDiscount(res.data.data.data)
                discount = res.data.data.data
                console.log(discount)
            }).catch((error) => {
                console.log(error)
            })
    }

    const checkStatus = (status) => {
        switch (status) {
            case 0:
                return 'Đang tiến hành'
            case 1:
                return 'Quá hạn'
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
    // const editAction = (row) => {
    //     setDiscountInfo(row.id)
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
                        <CModalTitle>Thông Tin Chiến Dịch</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <DetailDiscount id={row.id} />
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
            name: 'Tên Sản Phẩm',
            selector: row => row.productId,
            sortable: true,
            cell: row => (<div>{row.productId}</div>)
        },
        {
            name: 'Tên Chiến dịch',
            selector: row => row.campaignId,
            sortable: true,
            cell: row => (<div>{row.campaignId}</div>)
        },
        {
            name: 'Phần trăm',
            selector: row => row.discountPercentage,
            sortable: true,
            cell: row => (<div>{row.discountPercentage}</div>)
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

    const filteredData = discount.filter(item => {
        return item.productId.toLowerCase().match(search.toLowerCase())
    })

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Khuyến mãi</strong>
                    </CCardHeader>
                    <CCardBody>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            title='Danh sách Khuyến mãi'
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
            <CButton onClick={() => setVisible(!visible)}>Thêm Khuyến mãi</CButton>
            <CModal size="xl" alignment="center" visible={visible} onClose={() => {
                setVisible(false)
                window.location.reload()
            }}>
                <CModalHeader>
                    <CModalTitle>Thêm Khuyến mãi</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CreateDiscount />
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => {
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
