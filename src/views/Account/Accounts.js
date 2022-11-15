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
import CreateAccount from './CreateAccount'
// import DetailAccount from './DetailAccount'
import { ToastContainer } from "react-toastify";
export default function Accounts() {
    const token = localStorage.getItem('token')
    const urlAccount = 'https://localhost:44361/api/v1/accounts'
    var [account, setAccount] = useState([])
    const [search, setSearch] = useState('')
    const [detailVisible, setDetailVisible] = useState(false)
    // var [isClicked, setIsClicked] = useState(false);
    // const [show, setShow] = useState(false);

    // const hideModal = () => {
    //     setShow(false);
    // };
    const fetchData = async () => {
        axios.get(urlAccount, {
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
                setAccount(res.data.data.data)
                account = res.data.data.data
                console.log(account)
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

    const DetailForm = (row) => {
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
                        <CModalTitle>Thông Tin Tài khoản</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {/* <DetailAccount id={row.id} /> */}
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

    const columns = [
        {
            name: 'Tên Tài khoản',
            selector: row => row.username,
            sortable: true,
            cell: row => (<div>{row.username}</div>)
        },
        {
            name: 'Vai trò',
            selector: row => row.roleName,
            sortable: true,
            cell: row => (<div>{row.roleName}</div>)
        },
        // {
        //     name: 'Trạng thái',
        //     selector: row => row.status,
        //     sortable: true,
        //     cell: row => (<div><p className={getColor(row.status)}>{checkStatus(row.status)}</p></div>)
        // },
        // {
        //     name: 'Hành động',
        //     cell: (row) => (
        //         DetailForm(row)
        //     ),
        // },
    ]

    useEffect(() => {
        fetchData()
    }, [])

    const filteredData = account.filter(item => {
        return item.username.toLowerCase().match(search.toLowerCase())
    })

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Tài khoản</strong>
                    </CCardHeader>
                    <CCardBody>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            title='Danh sách Tài khoản'
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
            <CButton onClick={() => setVisible(!visible)}>Thêm Tài khoản</CButton>
            <CModal size="xl" alignment="center" visible={visible}
                onClose={() => {
                    setVisible(false)
                    window.location.reload()
                }}>
                <CModalHeader>
                    <CModalTitle>Thêm Tài khoản</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CreateAccount />
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
