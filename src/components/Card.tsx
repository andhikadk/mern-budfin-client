import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CashIcon,
  ShoppingCartIcon,
  ScaleIcon,
} from '@heroicons/react/outline';

const today = new Date();
const yyyy = today.getFullYear();
let mm: any = today.getMonth() + 1; // Months start at 0!
let dd: any = today.getDate();

if (mm < 10) mm = '0' + mm;
if (dd < 10) dd = '0' + dd;

const formattedToday = yyyy + '-' + mm + '-' + dd;

const Card = (props: any) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const IDRupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  useEffect(() => {
    GetTransactions();
  }, []);

  const GetTransactions = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/transactions'
      );
      console.log(response.data);
      // sum all amount type income only today
      const income = response.data.filter(
        (t: any) =>
          t.type === 'income' && t.date.substring(0, 10) === formattedToday
      );
      const incomeAmount = income.map((t: any) => t.amount);
      const incomeSum = incomeAmount.reduce((a: any, b: any) => a + b, 0);
      setIncome(incomeSum);
      // sum all amount type expense
      const expense = response.data.filter(
        (t: any) =>
          t.type === 'expense' && t.date.substring(0, 10) === formattedToday
      );
      const expenseAmount = expense.map((t: any) => t.amount);
      const expenseSum = expenseAmount.reduce((a: any, b: any) => a + b, 0);
      setExpense(expenseSum);
    } catch (error) {}
  };

  const cards = [
    {
      name: 'Account balance',
      icon: ScaleIcon,
      amount: IDRupiah.format(props.balance),
    },
    {
      name: 'Incomes',
      icon: CashIcon,
      amount: IDRupiah.format(income),
    },
    {
      name: 'Expenses',
      icon: ShoppingCartIcon,
      amount: IDRupiah.format(expense),
    },
  ];

  return (
    <div>
      <div className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        <div className='flex justify-between'>
          <h2 className='text-lg pl-1 leading-6 font-medium text-gray-900'>
            Overview
          </h2>
          <small className='pr-2 text-gray-500'>{formattedToday}</small>
        </div>
        <div className='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {/* Card */}
          {cards.map((card) => (
            <div
              key={card.name}
              className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <card.icon
                      className='h-6 w-6 text-gray-400'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        {card.name}
                      </dt>
                      <dd>
                        <div className='text-lg font-medium text-gray-900'>
                          {card.amount}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              {/* <div className='bg-gray-50 px-5 py-3'>
                <div className='text-sm'>
                  <a
                    href={card.href}
                    className='font-medium text-cyan-700 hover:text-cyan-900'>
                    View all
                  </a>
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
