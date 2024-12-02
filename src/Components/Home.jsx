import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// // Total Income, Total Expenses, Current Savings.

export default function Home() {
  const [financeData, setFinanceData] = useState([])
  const [calculation, setCalculation] = useState({
    savings: 0,
    expense: 0,
    income: 0
  })

  const fetchData = async () => {
    const res = await axios.get('https://myapp-25758-default-rtdb.firebaseio.com/finances.json')
    const arr = []
    for (let key in res.data) {
      arr.push({ id: key, ...res.data[key] })
    }
    setFinanceData(arr)

    const categoryCalculation = arr.reduce(
      (acc, item) => {
        if (item.category === 'saving') acc.savings += parseFloat(item.amount)
        if (item.category === 'expense') acc.expense += parseFloat(item.amount)
        if (item.category === 'income') acc.income += parseFloat(item.amount)

        return acc
      },
      {
        savings: 0,
        expense: 0,
        income: 0
      },
    )
    setCalculation(categoryCalculation)
  }

  useEffect(() => {
    fetchData()
  })
  return (
    <>
      <div className="flex justify-between items-center shadow p-2 border">
        <div className="logo">/Analytics</div>
        <Link to='/incomes' className="underline">Add Finance</Link>
      </div>
      <div className="mt-5">
        <ProgrssiveBar category='savings' percentage={(calculation.savings / calculation.income) * 100 || 0} />
        <ProgrssiveBar category='expense' percentage={(calculation.expense / calculation.income) * 100 || 0} />
        <ProgrssiveBar category='income' percentage={(calculation.income / calculation.income) * 100 || 0} />
      </div>
    </>
  )
}

function ProgrssiveBar({ category, percentage }) {
  return (
    <div className=' p-4 flex justify-around items-center shadow-md pt-10'>
      <label className='text-xl font-bold uppercase '>{category}: {percentage.toFixed(2)}%</label>
      <div className='w-full bg-teal-200  w-1/2  rounded'>
        <div className='bg-teal-500 text-sm py-1 leading-none text-center text-white rounded'
          style={{ width: `${percentage}%` }}>
          {percentage.toFixed(2)}%
        </div>
      </div>
    </div>
  )
}

