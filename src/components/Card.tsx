import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ScaleIcon,
  CashIcon,
  ShoppingCartIcon,
} from '@heroicons/react/outline';

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
      // sum all amount type income
      const income = response.data.filter((t: any) => t.type === 'income');
      const incomeAmount = income.map((t: any) => t.amount);
      const incomeSum = incomeAmount.reduce((a: any, b: any) => a + b, 0);
      setIncome(incomeSum);
      // sum all amount type expense
      const expense = response.data.filter((t: any) => t.type === 'expense');
      const expenseAmount = expense.map((t: any) => t.amount);
      const expenseSum = expenseAmount.reduce((a: any, b: any) => a + b, 0);
      setExpense(expenseSum);
    } catch (error) {}
  };

  const cards = [
    {
      name: 'Account balance',
      href: '#',
      icon: ScaleIcon,
      amount: IDRupiah.format(props.balance),
    },
    {
      name: 'Incomes',
      href: '#',
      icon: CashIcon,
      amount: IDRupiah.format(income),
    },
    {
      name: 'Expenses',
      href: '#',
      icon: ShoppingCartIcon,
      amount: IDRupiah.format(expense),
    },
  ];

  return (
    <div>
      <div className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        <h2 className='text-lg pl-2 leading-6 font-medium text-gray-900'>
          Overview
        </h2>
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
