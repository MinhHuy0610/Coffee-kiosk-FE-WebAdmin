/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CImage,
  CContainer,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";

const CreateProduct = () => {
  const token = localStorage.getItem('token')
  const [validated, setValidated] = useState(false)
  var [cateOption, setCateOption] = useState([])
  var [listImage, setListImage] = useState([])
  // var listImages = []
  console.log(token)
  const urlCategory = 'https://localhost:44361/api/v1/categories?Status=0'
  const fetchData = async () => {
    axios.get(urlCategory, {
      headers: {
        'Conttent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        console.log(res)
        console.log(res.data.data.data)
        setCateOption(
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
    const noti = toast("Vui lòng đợi...");
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
    if (form.checkValidity() === true) {
      event.preventDefault()
      const name = event.target.name.value
      const categoryId = event.target.categoryId.value
      const description = event.target.description.value
      const price = event.target.price.value
      const data = {
        name,
        categoryId,
        description,
        price,
        listImage,
      }
      console.log(JSON.stringify(data))
      const urlProduct = 'https://localhost:44361/api/v1/products'
      fetch(urlProduct, {
        method: "POST",
        // axios.post(urlProduct, {
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
              render: "Tạo thành công",
              type: "success",
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.update(noti, {
            render: error.toString(),
            type: "error",
            isLoading: false,
          });
        });
    }
  }
  useEffect(() => {
    fetchData()
    console.log(cateOption)
  }, [])
  const UploadAndDisplayImage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    let base64code = ""
    const onChange = e => {
      setSelectedImage(e.target.files[0])
      const files = e.target.files;
      const file = files[0];
      getBase64(file);
    };

    const onLoad = fileString => {
      console.log(fileString);
      // this.base64code = fileString
    };
    const setImage = fileString => {
      var imageStr
      var check = fileString.slice(11, 14)
      if (check === "png") {
        imageStr = fileString.slice(22)
      } else imageStr = fileString.slice(23)
      listImage.push(imageStr)
      console.log("listImag: " + listImage)
    }

    const getBase64 = file => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onLoad(reader.result);
        setImage(reader.result)
      };
    };

    return (
      <div>
        {selectedImage && (
          <div>
            <CImage width={200} height={200} src={URL.createObjectURL(selectedImage)} />
            <br />
            <button onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        )}
        <br />

        <br />
        <input
          type="file"
          name="myImage"
          onChange={onChange}
        />
      </div>
    );
  };
  return (
    <CContainer className="px-4">
      <CRow xs={{ gutterX: 5 }}>
        <ToastContainer autoClose={1000} />
        <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
          <CCol>
            <div>{UploadAndDisplayImage()}</div>
          </CCol>
          <CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="validationDefault01">Tên Sản Phẩm</CFormLabel>
              <CFormInput type="text" id="name" required />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="validationDefault02">Mô tả</CFormLabel>
              <CFormInput type="text" id="description" required />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="validationDefaultUsername">Loại Sản phẩm</CFormLabel>
              <CFormSelect id="categoryId" options={cateOption}>
              </CFormSelect>
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="validationDefault03">Giá bán</CFormLabel>
              <CFormInput type="text" id="price" required />
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" type="submit">
                Tạo Sản phẩm
              </CButton>
            </CCol>
          </CCol>
        </CForm>
      </CRow>
    </CContainer>
  )
}

export default CreateProduct
