import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaEdit, } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";


export default function Incomes() {
  const [finance, setFinance] = useState({ amount: '', description: '', date: '' })
  const [getData, setGetData] = useState([])

  let handleChange = (e) => {
    const { name, value } = e.target
    setFinance({ ...finance, [name]: value })
  }


  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://myapp-25758-default-rtdb.firebaseio.com/finances.json', finance)
      alert('Your Finance Data Successfully Added')
      setFinance({ amount: '', description: '', date: '' })
      getFinanceData()
    } catch (error) {
      alert(`Your are unable to add Finance due To: ${error}`)
    }
  }

  let getFinanceData = async () => {
    try {
      const res = await axios.get('https://myapp-25758-default-rtdb.firebaseio.com/finances.json')
      const arr = []
      for (let key in res.data) {
        arr.push({ id: key, ...res.data[key] })
      }
      setGetData(arr)
    } catch (error) {
      console.log(error)
    }
  }
  let handleDelete = async (id) => {
    await axios.delete(`https://myapp-25758-default-rtdb.firebaseio.com/finances/${id}.json`)
    getFinanceData()
  }
  useEffect(() => {
    getFinanceData()
  }, [])

  return (
    <>
      <p className='text-center text-sm bg-slate-200'>Add Your Finance Data Here:</p>
      <div className='flex justify-between items-center shadow p-2 border'>
        <div className='logo'>/Income</div>
        <form onSubmit={handleSubmit} className='flex gap-5'>
          <input className='p-1 rounded-md' type='number' name='amount' value={finance.amount} placeholder='Enter Amount' onChange={handleChange} required />
          <select name='category' value={finance.category}
            onChange={handleChange} className='p-1 rounded-md' required >
            <option>Select Category</option>
            <option value='income'>Income</option>
            <option value='saving'>Saving</option>
            <option value='expense'>Expense</option>
            <option value='investment'>Investment</option>
            <option value='transaction'>Transaction</option>
          </select>
          <input className='p-1 rounded-md' name='description' value={finance.description} placeholder='Enter Description' onChange={handleChange} required />
          <input className='p-1 rounded-md' type='date' name='date' value={finance.date} placeholder='Enter Date' onChange={handleChange} required />
          <input className='btn' type='submit' value='Save' />
        </form>
      </div>

      {/* DisplayData */}

      <table className='w-full text-center rounded-t-lg mt-7'>
        <thead className=''>
          <tr className='bg-teal-200 '>
            <th className='border border-gray-400 px-4py2
              '>Sr no.</th>
            <th className='border border-gray-400 px-4py2
              '>Amount</th>
            <th className='border border-gray-400 px-4py2
            '>Category</th>
            <th className='border border-gray-400 px-4py2
            '>Description</th>
            <th className='border border-gray-400 px-4py2
              '>Date</th>
            <th className='border border-gray-400 px-4py2
              '>Edit</th>
            <th className='border border-gray-400 px-4py2
              '>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            getData.map((ele, index) => (
              <tr key={ele.id}>
                <td className='border-b-2 border-gray-300 px-4 py-2'>{index++}</td>
                <td className='border-b-2 border-gray-300 px-4 py-2'>{ele.amount}</td>
                <td className='border-b-2 border-gray-300 px-4 py-2'>{ele.category}</td>
                <td className='border-b-2 border-gray-300 px-4 py-2'>{ele.description}</td>
                <td className='border-b-2 border-gray-300 px-4 py-2'>{ele.date}</td>
                <td className='border-b-2 border-gray-300 px-4 py-2'><Link className='' to={`/edit/${ele.id}`} ><FaEdit /></Link>
                </td>
                <td className='border-b-2 border-gray-300 px-4 py-2'><button onClick={() => handleDelete(ele.id)}><MdDeleteSweep /></button></td>

              </tr>
            ))
          }
        </tbody>
      </table>

    </>
  )
}
