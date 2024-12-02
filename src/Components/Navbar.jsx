import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='bg-teal-500 flex justify-between p-4'>
      <div>
        <Link className='logo' to='/'>FinanceTracker.</Link>
      </div>
      <div className=' flex gap-10'>
        <Link to='/incomes'>Add</Link>
        <Link to='/incomes'>Income</Link>
        <Link to='/savings'>Savings</Link>
        <Link to='/expenses'>Expenses</Link>
        <Link to='/transactions'>Transactions</Link>
      </div>
    </div>
  )
}
