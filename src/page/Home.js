import React, { useEffect, useState } from 'react'
import { CButton, CCol, CContainer, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, } from '@coreui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
export default function Home() {
  let navigate = useNavigate();
  const [list, setList] = useState([]);
  const EditData = (id) => {
    navigate("/form-produk/" + id);
  }
  const listData = async () => {

    try {
      const res = await axios.get('http://localhost:8080/api/product');
      // console.log(res.status);
      if (res.status === 200) {
        setList(res.data);
      } else {

      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    listData();
  }, []);
  const deleteData =(id)=>{
    
    Swal.fire({
      text: 'Ingin Hapus Data',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Iya",
      cancelButtonText: "Batal",
      icon: 'warning'
  }
  ).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:8080/api/product/'+id)
        .then(res => {
          if (res.status=== 200) {
            Swal.fire({
              icon: 'success',
              text: 'delete sukses',
              showConfirmButton: false,
              timer: 1500
            });
            listData();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'upload error',
              showConfirmButton: false,
              timer: 1500
            })
          }
      }).catch(e => { console.log(e) })
      }
  })
    
}
  return (
    <>
      <CContainer fluid className='mt-5'>
        <CRow>
          <CCol lg={12} className='mb-5 text-center'><h2>List Produk</h2></CCol>
          <CCol lg={12}>
            <Link to="/form-produk"><CButton color="success" size="sm">Tambah</CButton></Link>
          </CCol>
          <CCol lg={12}>
            <CTable responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col"></CTableHeaderCell>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Code Produk</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nama Produk</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Deskripsi Produk</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Harga Produk</CTableHeaderCell>
                  <CTableHeaderCell scope="col">UOM</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {
                  list.map((prod, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">
                      <div className="flex">
                        <CButton onClick={() => EditData(prod.id)} size="sm" className='mr-1 mb-2'>Edit</CButton>
                        <CButton color="danger" onClick={() => deleteData(prod.id)} size="sm" className='mb-2'>Hapus</CButton>
                        </div>
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
                      <CTableDataCell>{prod.productCode}</CTableDataCell>
                      <CTableDataCell>{prod.productName}</CTableDataCell>
                      <CTableDataCell>{prod.productDescription}</CTableDataCell>
                      <CTableDataCell>{prod.productPrice}</CTableDataCell>
                      <CTableDataCell>{prod.productUOM}</CTableDataCell>
                    </CTableRow>
                  ))
                }
              </CTableBody>
            </CTable>
          </CCol>
        </CRow>
      </CContainer>
    </>
  )
}
