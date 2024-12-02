import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'


export default function Edit() {
  const [finance, setFinance] = useState({ amount: '', description: '', date: '' })
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://myapp-25758-default-rtdb.firebaseio.com/finances.json`)
        setFinance(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  let handleChange = (e) => {
    const { name, value } = e.target
    setFinance({ ...finance, [name]: value })
  }
  // Handle Submit
  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.patch('https://myapp-25758-default-rtdb.firebaseio.com/finances.json', finance)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='flex justify-between items-center shadow p-2 border'>
        <div className='logo'>/Edit</div>
        <form onSubmit={handleSubmit} className='flex gap-5'>
          <input className='p-1 rounded-md' type='number' name='amount' value={finance.amount} placeholder='Enter Amount' onChange={handleChange} />

          <select name='category' value={finance.category}
            onChange={handleChange} className='p-1 rounded-md'   >
            <option>Select Category</option>
            <option value='income'>Income</option>
            <option value='saving'>Saving</option>
            <option value='expense'>Expense</option>
            <option value='investment'>Investment</option>
          </select>

          <input className='p-1 rounded-md' name='description' value={finance.description} placeholder='Enter Description' onChange={handleChange} />

          <input className='p-1 rounded-md' type='date' name='date' value={finance.date} placeholder='Enter Date' onChange={handleChange} />

          <input className='btn' type='submit' value='Update' />
        </form>
      </div>

    </>
  )
}
