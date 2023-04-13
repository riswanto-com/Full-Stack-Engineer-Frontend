import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function FormPage() {
  const paramsId = useParams();
  let navigate = useNavigate();
  const [productKode, setproductKode] = useState('');
  const [productName, setproductName] = useState('');
  const [productDiscription, setproductDiscription] = useState('');
  const [productPrice, setproductPrice] = useState('');
  const [productUOM, setproductUOM] = useState('');
  useEffect(() => {

    GetProduct();
       // eslint-disable-next-line 
  },[]);
  const GetProduct = async () => {
    try {
      if (!paramsId.idProduk) {
        document.title = 'Form Tambah Produk';
        document.querySelector("#title-form").innerHTML = "Tambah Produk";
        setproductUOM('Pilih')
      } else {
        document.title = 'Form Edit Produk';
        document.querySelector("#title-form").innerHTML = "Edit Produk";
          const res = await axios.get('http://localhost:8080/api/product/' + paramsId.idProduk);
          // console.log(res);
          if(res.status ===200){
            setproductKode(res.data.productCode);
            setproductName(res.data.productName);
            setproductDiscription(res.data.productDescription);
            setproductPrice(res.data.productPrice);
            setproductUOM(res.data.productUOM);
          }else{

          }
      }
    } catch (e) {
      console.log(e);
    }

  }
  const submiteData = () => {
    const parameter = {
      id:paramsId.idProduk,
      productCode: productKode,
      productName: productName,
      productDescription: productDiscription,
      productPrice: productPrice,
      productUOM: productUOM,
    };
    console.log(parameter);
    if (!paramsId.idProduk) {
      axios.post('http://localhost:8080/product', parameter)
        .then(res => {
          if(res.data.status===true){
            navigate('/');
          }else{
            Swal.fire({
              icon: 'warning',
              text: res.data.messages[0],
              showConfirmButton: false,
              timer: 1500
            });
          }
        }).catch(e => {
          console.log(e.status);
        })
    } else {
      axios.put('http://localhost:8080/api/product', parameter)
        .then(res => {
          if(res.data.status===true){
            navigate('/');
          }else{
            Swal.fire({
              icon: 'warning',
              text: res.data.messages[0],
              showConfirmButton: false,
              timer: 1500
            });
          }
        }).catch(e => {
          console.log(e.status);
        })
    }
  }
  return (
    <>
      <CContainer className='mt-5' fluid>
        <CRow>
          <CCol lg={{ span: 6, offset: 3 }}>
            <h2 id="title-form">Tambah Produk</h2>
          </CCol>
        </CRow>
        <CRow>
          <CCol lg={{ span: 6, offset: 3 }}>
            <CCard>
              <CCardBody>
                <CForm className="row g-3">
                  <CCol md={12}>
                    <CFormInput type="text" id="productKode" defaultValue={productKode} onChange={e => setproductKode(e.target.value)} label="Kode Produk" />
                  </CCol>
                  <CCol md={12}>
                    <CFormInput id="productName" type="text" defaultValue={productName} onChange={e => setproductName(e.target.value)} label="Nama Produk" />
                  </CCol>
                  <CCol xs={12}>
                    <CFormTextarea id="productDiscription"
                      label="Diskripsi Produk"
                      rows={3}
                      defaultValue={productDiscription} onChange={e => setproductDiscription(e.target.value)}
                    ></CFormTextarea>
                  </CCol>
                  <CCol md={12}>
                    <CFormInput id="productPrice" type="text" defaultValue={productPrice} onChange={e => setproductPrice(e.target.value)} label="Harga Produk" />
                  </CCol>
                  <CCol md={12}>
                    <CFormSelect id="inputState" label="UOM">
                      <option>{productUOM}</option>
                      <option onClick={()=>setproductUOM('SHEET')}>SHEET</option>
                      <option onClick={()=>setproductUOM('ROLL')}>ROLL</option>
                      <option onClick={()=>setproductUOM('PCS')}>PCS</option>
                    </CFormSelect>
                  </CCol>
                  <CCol xs={2}>
                    <CButton type="button" onClick={() => submiteData()}>Simpan</CButton>
                  </CCol>
                  <CCol xs={2}>
                    <CButton type="button" color="secondary" onClick={() => navigate("/")}>Batal</CButton>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>

          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}
