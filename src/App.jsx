import { useEffect, useState } from 'react'
import './App.css'
import Home from './Components/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Incomes from './Components/Incomes'
import Expenses from './Components/Expenses '
import Transactions from './Components/Transactions'
import Savings from './Components/Savings'
import Edit from './Components/Edit'
import Footer from './Components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/incomes' element={<Incomes />} />
        <Route path='/edit/:id' element={<Edit />} />

        <Route path='/savings' element={<Savings />} />
        <Route path='/expenses' element={<Expenses />} />
        <Route path='/transactions' element={<Transactions />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
