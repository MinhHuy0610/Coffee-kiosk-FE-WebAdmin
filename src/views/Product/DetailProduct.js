/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CContainer,
  CRow,
  CImage,
  CFormSelect,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";

export default function DetailProduct(props) {
  const token = localStorage.getItem('token')
  const id = props.id
  var [listImage, setListImage] = useState([])
  var [imageId, setImageId] = useState()
  const [hasImg, setHasImg] = useState(false)
  const urlGetProduct = `https://localhost:44361/api/v1/products/${id}`
  const urlCategory = 'https://localhost:44361/api/v1/categories?Status=0'
  var [cateOption, setCateOption] = useState([]);
  const [validated, setValidated] = useState(false)
  var [product, setProduct] = useState([])
  const [editable, setEditable] = useState(false)
  const [urlI, setUrlI] = useState([])
  const listI = []
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
        id,
        name,
        categoryId,
        description,
        price,
      }
      console.log(JSON.stringify(data))
      const urlProduct = 'https://localhost:44361/api/v1/products'
      fetch(urlProduct, {
        method: "PUT",
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
              render: "Cập nhật thành công",
              type: "success",
            });
            return response.status;
          }
        })
        .catch((error) => {
          console.log(error);
          toast.update(noti, {
            render: error.toString(),
            type: "error",
            isLoading: true,
          });
        });
    }
  }
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
    axios.get(urlGetProduct, {
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
        console.log(res.data.data)
        setProduct(res.data.data)
        product = res.data.data
        setImageId(product.listImage[0].id)
        setUrlI(
          product.listImage.map((image) => {
            var url = image.link
            return url
          }))
      }).catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    fetchData()
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
    const setImage = fileString => {
      var imageStr
      var check = fileString.slice(11, 14)
      if (check === "png") {
        imageStr = fileString.slice(22)
      } else imageStr = fileString.slice(23)
      setHasImg(true)
      listImage.push(imageStr)
      console.log("Image: " + listImage)
    }

    const onLoad = fileString => {
      console.log(fileString);
      // this.base64code = fileString
    };

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
  const handleUpdateImage = () => {
    const noti = toast("Vui lòng đợi...");
    if (hasImg) {
      const image = listImage[0]
      const id = imageId
      console.log(image)
      const data = {
        id,
        image,
      }
      console.log(JSON.stringify(data))
      const urlImage = 'https://localhost:44361/api/v1/productImages'
      fetch(urlImage, {
        method: "PUT",
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
              render: "Cập nhật thành công",
              type: "success",
            });
            return response.status;
          }
        })
        .catch((error) => {
          console.log(error);
          toast.update(noti, {
            render: error.toString(),
            type: "error",
            isLoading: true,
          });
        });
    } else {
      toast.update(noti, {
        render: "Vui lòng chọn ảnh để cập nhật",
        type: "error",
        isLoading: true,
      });
    }
  }

  return (
    <CContainer className="px-4">
      <CRow xs={{ gutterX: 5 }}>
        <ToastContainer autoClose={1000} />
        <CCol>
          <CListGroup>
            {urlI.map(
              (item, index) => (
                <CImage key={index} width={200} height={200} src={item} />
              ),
            )}
          </CListGroup>
          {/* <CImage src={linknn} /> */}
          <div>{UploadAndDisplayImage()}</div>
          <CButton color="primary" onClick={handleUpdateImage} >
            Cập nhật ảnh
          </CButton>
        </CCol>
        <CCol>
          <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
            <CCol md={12}>
              <CFormLabel htmlFor="validationDefault01">Tên Sản Phẩm</CFormLabel>
              <CFormInput type="text" id="name" readOnly={!editable} required defaultValue={product.name} />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="validationDefault02">Mô tả</CFormLabel>
              <CFormInput type="text" id="description" readOnly={!editable} required defaultValue={product.description} />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="validationDefaultUsername">Loại Sản phẩm</CFormLabel>
              <CFormInput type="text" id="categoryName" readOnly={true} required defaultValue={product.categoryName} />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="validationDefault03">Giá bán</CFormLabel>
              <CFormInput type="text" id="price" readOnly={!editable} required defaultValue={product.price} />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="validationDefaultUsername">Chọn để thay đổi loại Sản phẩm</CFormLabel>
              <CFormSelect id="categoryId" options={cateOption} disabled={!editable} >
              </CFormSelect>
            </CCol>
            <CCol xs={12}>
              <CButton color="primary" onClick={() => setEditable(true)} >
                Chỉnh sửa
              </CButton>
              <CButton color="primary" type="submit" disabled={!editable} >
                Cập nhật Sản phẩm
              </CButton>
            </CCol>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
  )
}


