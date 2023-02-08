import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Layout from '../components/Layout';
import Card from '../components/Card';
import LineChart from '../components/LineChart';

const today = new Date();
const yyyy = today.getFullYear();
let mm: any = today.getMonth() + 1; // Months start at 0!
let dd: any = today.getDate();

if (mm < 10) mm = '0' + mm;
if (dd < 10) dd = '0' + dd;

const months = [
  {
    value: '01',
    label: 'January',
  },
  {
    value: '02',
    label: 'February',
  },
  {
    value: '03',
    label: 'March',
  },
  {
    value: '04',
    label: 'April',
  },
  {
    value: '05',
    label: 'May',
  },
  {
    value: '06',
    label: 'June',
  },
  {
    value: '07',
    label: 'July',
  },
  {
    value: '08',
    label: 'August',
  },
  {
    value: '09',
    label: 'September',
  },
  {
    value: '10',
    label: 'October',
  },
  {
    value: '11',
    label: 'November',
  },
  {
    value: '12',
    label: 'December',
  },
];

const Report = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [year, setYear] = useState(`${yyyy}`);
  const [month, setMonth] = useState(`${mm}`);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [filteredDate, setFilteredDate] = useState(`${year}-${month}`);
  const navigate = useNavigate();

  // let filteredDate = `${year}-${month}`;
  // console.log(filteredDate);

  useEffect(() => {
    refreshToken();
    getTransactions(filteredDate);
  }, [filteredDate]);

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/token`
      );
      const decoded: any = jwt_decode(response.data.accessToken);
      setBalance(decoded.balance);
    } catch (error: any) {
      if (error.response) {
        navigate('/login');
      }
    }
  };

  const getTransactions = async (filteredDate: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/transactions`
      );
      const income = response.data.filter(
        (t: any) =>
          t.type === 'income' && t.date.substring(0, 7) === filteredDate
      );
      const incomeFilter: any = [
        ...income.map((t: any) => ({ amount: t.amount, date: t.date })),
      ];
      const incomeAmount = income.map((t: any) => t.amount);
      const incomeSum = incomeAmount.reduce((a: any, b: any) => a + b, 0);
      setIncomeData(incomeFilter);
      setIncome(incomeSum);

      const expense = response.data.filter(
        (t: any) =>
          t.type === 'expense' && t.date.substring(0, 7) === filteredDate
      );
      const expenseFilter: any = [
        ...expense.map((t: any) => ({ amount: t.amount, date: t.date })),
      ];
      const expenseAmount = expense.map((t: any) => t.amount);
      const expenseSum = expenseAmount.reduce((a: any, b: any) => a + b, 0);
      setExpenseData(expenseFilter);
      setExpense(expenseSum);
    } catch (error) {}
  };

  const filter = (e: any) => {
    e.preventDefault();
    setFilteredDate(`${year}-${month}`);
  };

  return (
    <Layout>
      {/* Page header */}
      <div className='bg-white shadow'>
        <div className='px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
          <div className='py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200'>
            <div className='flex-1 min-w-0'>
              {/* Profile */}
              <div className='flex items-center'>
                <div>
                  <div className='flex items-center'>
                    <h1 className='ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate'>
                      Reports
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <select
                name='year'
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className='mt-1 mr-2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'>
                <option value='2022'>2022</option>
                <option value='2023'>2023</option>
              </select>
              <select
                name='month'
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className='mt-1 mr-2 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'>
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <button
                type='button'
                onClick={filter}
                className='mt-1 px-4 py-2 text-base border-gray-300 text-white bg-cyan-600 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 rounded-md'>
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <Card
        balance={balance}
        date={filteredDate}
        income={income}
        expense={expense}
      />
      <LineChart
        income={incomeData}
        expense={expenseData}
        year={year}
        month={month}
      />
    </Layout>
  );
};

export default Report;
