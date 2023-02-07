import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/Card';
import RecentTable from '../components/RecentTable';

const today = new Date();
const yyyy = today.getFullYear();
let mm: any = today.getMonth() + 1; // Months start at 0!
let dd: any = today.getDate();

if (mm < 10) mm = '0' + mm;
if (dd < 10) dd = '0' + dd;

const formattedToday = yyyy + '-' + mm + '-' + dd;

let curHr = today.getHours();
let greeting = '';

if (curHr < 12) {
  greeting = 'Good Morning';
} else if (curHr < 18) {
  greeting = 'Good Afternoon';
} else {
  greeting = 'Good Evening';
}

const Dashboard = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getTransactions();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/token');
      const decoded: any = jwt_decode(response.data.accessToken);
      setId(decoded._id);
      setName(decoded.name);
      setBalance(decoded.balance);
    } catch (error: any) {
      if (error.response) {
        navigate('/login');
      }
    }
  };

  const getTransactions = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/transactions'
      );
      const income = response.data.filter(
        (t: any) =>
          t.type === 'income' && t.date.substring(0, 10) === formattedToday
      );
      const incomeAmount = income.map((t: any) => t.amount);
      const incomeSum = incomeAmount.reduce((a: any, b: any) => a + b, 0);
      console.log(income);
      setIncome(incomeSum);

      const expense = response.data.filter(
        (t: any) =>
          t.type === 'expense' && t.date.substring(0, 10) === formattedToday
      );
      const expenseAmount = expense.map((t: any) => t.amount);
      const expenseSum = expenseAmount.reduce((a: any, b: any) => a + b, 0);
      setExpense(expenseSum);
    } catch (error) {}
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
                      {greeting}, {name}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-6 flex space-x-3 md:mt-0 md:ml-4'>
              <Link
                to='/transactions/add/income'
                className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg- hover:text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'>
                Add income
              </Link>
              <Link
                to='/transactions/add/expense'
                className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'>
                Add Expense
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <Card balance={balance} income={income} expense={expense} />
        <RecentTable authUser={id} />
      </div>
    </Layout>
  );
};

export default Dashboard;
