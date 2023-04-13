import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import Navbar from '../component/Navbar'
import FormPage from '../page/FormPage'

export default class ConfigRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/form-produk" element={<FormPage />} />
                    <Route path="/form-produk/:idProduk" element={<FormPage />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
