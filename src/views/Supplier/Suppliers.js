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
import CreateSupplier from './CreateSupplier'
import DetailSupplier from './DetailSupplier'
export default function Suppliers() {
    const token = localStorage.getItem('token')
    const urlSupplier = 'https://localhost:44361/api/v1/supplies'
    var [supplier, setSupplier] = useState([])
    const [search, setSearch] = useState('')
    const [detailVisible, setDetailVisible] = useState(false)
    // var [isClicked, setIsClicked] = useState(false);
    // const [show, setShow] = useState(false);

    // const hideModal = () => {
    //     setShow(false);
    // };
    const fetchData = async () => {
        axios.get(urlSupplier, {
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
                setSupplier(res.data.data.data)
                supplier = res.data.data.data
                console.log(supplier)
            }).catch((error) => {
                console.log(error)
            })
    }

    const checkStatus = (status) => {
        switch (status) {
            case 0:
                return 'Còn hàng'
            case 1:
                return 'Chờ nhập hàng'
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
                        <CModalTitle>Danh sách Sản phẩm của cửa hàng</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        <DetailSupplier id={row.id} />
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
            name: 'Tên Sản phẩm',
            selector: row => row.productName,
            sortable: true,
            cell: row => (<div>{row.productName}</div>)
        }, {
            name: 'Số lượng mỗi tuần',
            selector: row => row.quantity,
            sortable: true,
            cell: row => (<div>{row.quantity}</div>)
        },
        {
            name: 'Số lượng tồn kho',
            selector: row => row.supplyQuantity,
            sortable: true,
            cell: row => (<div>{row.supplyQuantity}</div>)
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

    const filteredData = supplier.filter(item => {
        return item.productName.toLowerCase().match(search.toLowerCase())
    })

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Thông tin Nhập hàng</strong>
                    </CCardHeader>
                    <CCardBody>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            title='Danh sách Nhập hàng sản phẩm'
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
            <CButton onClick={() => setVisible(!visible)}>Nhập Hàng</CButton>
            <CModal size="xl" alignment="center" visible={visible} onClose={() => {
                setVisible(false)
                window.location.reload()
            }}>
                <CModalHeader>
                    <CModalTitle>Nhập hàng</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CreateSupplier />
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
