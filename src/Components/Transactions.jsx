import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { FaEdit, } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";


export default function Transactions() {
  const [getData, setGetData] = useState([])
  const [transactionsData, setTransactionsData] = useState([])


  let getFinanceData = async () => {
    try {
      const res = await axios.get('https://myapp-25758-default-rtdb.firebaseio.com/finances.json')
      const arr = []
      for (let key in res.data) {
        arr.push({ id: key, ...res.data[key] })
      }
      setGetData(arr)

      const filterTransactionsData = arr.filter(item => item.category === 'transaction')
      setTransactionsData(filterTransactionsData)
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
      <div className='flex justify-between items-center shadow p-2 border'>
        <div className='logo'>/Expenses</div>
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
            transactionsData.map((ele, index) => (
              <tr key={ele.id}>
                <td className='border-b-2 border-gray-300 px-4 py-2'>{index}</td>
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
