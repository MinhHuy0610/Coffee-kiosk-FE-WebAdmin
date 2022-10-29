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
import CreateShop from './CreateShop'
import DetailShop from './DetailShop'
export default function Shops() {
    const token = localStorage.getItem('token')
    const urlShop = 'https://localhost:44361/api/v1/shops?Status=0'
    var [shop, setShop] = useState([])
    const [search, setSearch] = useState('')
    const [shopInfo, setShopInfo] = useState()
    const [detailVisible, setDetailVisible] = useState(false)
    // var [isClicked, setIsClicked] = useState(false);
    // const [show, setShow] = useState(false);

    // const hideModal = () => {
    //     setShow(false);
    // };
    const fetchData = async () => {
        axios.get(urlShop, {
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
                setShop(res.data.data.data)
                shop = res.data.data.data
                console.log(shop)
            }).catch((error) => {
                console.log(error)
            })
    }

    const checkStatus = (status) => {
        switch (status) {
            case 0:
                return 'Đang bán'
            case 1:
                return 'Ngừng bán'
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
                        <CModalTitle>Thông Tin Cửa Hàng</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <DetailShop id={row.id} />
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
            name: 'Tên Cửa Hàng',
            selector: row => row.name,
            sortable: true,
            cell: row => (<div>{row.name}</div>)
        },
        {
            name: 'Địa chỉ',
            selector: row => row.address,
            sortable: true,
            cell: row => (<div>{row.address}</div>)
        }, {
            name: 'Khu vực',
            selector: row => row.areaName,
            sortable: true,
            cell: row => (<div>{row.areaName}</div>)
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

    const filteredData = shop.filter(item => {
        return item.name.toLowerCase().match(search.toLowerCase())
    })

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Cửa Hàng</strong>
                    </CCardHeader>
                    <CCardBody>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            title='Danh sách Cửa Hàng'
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
            <CButton onClick={() => setVisible(!visible)}>Thêm Cửa Hàng</CButton>
            <CModal size="xl" alignment="center" visible={visible} onClose={() => {
                setVisible(false)
                window.location.reload()
            }}>
                <CModalHeader>
                    <CModalTitle>Thêm Cửa Hàng</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CreateShop />
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
