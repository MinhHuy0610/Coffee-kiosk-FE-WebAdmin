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
} from '@coreui/react'
import axios from 'axios'
import DataTable from "react-data-table-component"
import CreateProduct from './CreateProduct'
export default function Products() {
    const token = localStorage.getItem('token')
    const urlProduct = 'https://localhost:44361/api/v1/products?Status=0'
    var [product, setProduct] = useState([])
    const [search, setSearch] = useState('')
    // const [show, setShow] = useState(false);

    // const hideModal = () => {
    //     setShow(false);
    // };
    const fetchData = async () => {
        axios.get(urlProduct, {
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
                setProduct(res.data.data.data)
                product = res.data.data.data
                console.log(product)
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

    const columns = [
        {
            name: 'Tên Sản Phẩm',
            selector: row => row.name,
            sortable: true,
            cell: row => (<div>{row.name}</div>)
        },
        {
            name: 'Giá bán',
            selector: row => row.price,
            sortable: true,
            cell: row => (<div>{parseFloat(row.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>)
        }, {
            name: 'Loại',
            selector: row => row.categoryName,
            sortable: true,
            cell: row => (<div>{row.categoryName}</div>)
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

    const filteredData = product.filter(item => {
        return item.name.toLowerCase().match(search.toLowerCase())
    })

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Sản phẩm</strong>
                    </CCardHeader>
                    <CCardBody>
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            title='Danh sách sản phẩm'
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
            <CButton onClick={() => setVisible(!visible)}>Thêm Sản Phẩm</CButton>
            <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                    <CModalTitle>Thêm Sản phẩm</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CreateProduct />
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