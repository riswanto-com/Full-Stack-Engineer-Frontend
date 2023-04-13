import { CContainer, CNavbar, CNavbarBrand } from '@coreui/react'
import React from 'react'

export default function Navbar() {
    return (
        <>
            <CNavbar colorScheme="dark" className="bg-dark">
                <CContainer fluid>
                    <CNavbarBrand>CRUD Dengan Reactjs</CNavbarBrand>
                </CContainer>
            </CNavbar>
        </>
    )
}
