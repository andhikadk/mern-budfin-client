import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  CashIcon, // for salary and other category (i)
  ChevronRightIcon,
  ShoppingCartIcon, // for other category (e)
  CakeIcon, // for consumption category (e)
  BriefcaseIcon, // for stuff category (e)
  TruckIcon, // for transportation category (e)
  GiftIcon, // for gift category (i)
  CurrencyDollarIcon, // for bonus category (i)
} from '@heroicons/react/solid';
import axios from 'axios';

const incomeCategoryIcon = [
  {
    name: 'Salary',
    icon: CashIcon,
  },
  {
    name: 'Bonus',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Gift',
    icon: GiftIcon,
  },
  {
    name: 'Other',
    icon: CashIcon,
  },
];

const expenseCategoryIcon = [
  {
    name: 'Consumption',
    icon: CakeIcon,
  },
  {
    name: 'Transportation',
    icon: TruckIcon,
  },
  {
    name: 'Stuff',
    icon: BriefcaseIcon,
  },
  {
    name: 'Other',
    icon: ShoppingCartIcon,
  },
];

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

const RecentTable = (props: any) => {
  const [transactions, setTransactions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const search = searchParams.get('search');

  useEffect(() => {
    GetTransactions();
  }, []);

  const GetTransactions = async () => {
    try {
      // setIsLoading(true);
      const response = await axios.get(
        'http://localhost:5000/api/transactions'
      );
      response.data = response.data.slice(0, 5);
      if (search) {
        const filtered = response.data.filter((t: any) =>
          t.detail.toLowerCase().includes(search.toLowerCase())
        );
        setTransactions(filtered);
        setIsLoading(false);
        return;
      }
      setTransactions(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const IDRupiah = new Intl.NumberFormat('id-ID', {
    style: 'decimal',
    currency: 'IDR',
  });

  const typeStyles: any = {
    income: 'bg-green-100 text-green-800',
    expense: 'bg-red-100 text-red-800',
  };

  // make function to check transaction category name then match the icon
  const getIcon = (category: any, type: any) => {
    if (type === 'income') {
      const icon = incomeCategoryIcon.find((i) => i.name === category);
      return icon?.icon;
    } else {
      const icon = expenseCategoryIcon.find((i) => i.name === category);
      return icon?.icon;
    }
  };

  return (
    <div className='max-w-6xl mx-auto mt-8 px-0 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
      <div className='flex justify-between'>
        <h2 className='text-lg pl-1 leading-6 font-medium text-gray-900'>
          Recent activity
        </h2>
        <small className='pr-2 text-gray-500'>last 5 transactions</small>
      </div>

      {/* Activity list (smallest breakpoint only) */}
      <div className='shadow sm:hidden'>
        <ul
          role='list'
          className='mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden'>
          {transactions.length === 0 && (
            <li>
              <Link
                to='/'
                className='block px-4 py-4 bg-white hover:bg-gray-50'>
                <span className='flex items-center space-x-4'>
                  <span className='flex-1 flex space-x-2 truncate'>
                    <span className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'>
                      <ChevronRightIcon
                        className='h-5 w-5 text-gray-400 group-hover:text-gray-500'
                        aria-hidden='true'
                      />
                    </span>
                    <span className='flex flex-col text-gray-500 text-sm truncate'>
                      <span className='truncate'>
                        {isLoading ? 'Loading' : 'No transaction yet'}
                      </span>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          )}
          {transactions.map((transaction: any) => (
            <li key={transaction._id}>
              <Link
                to={`/transactions/edit/${transaction._id}`}
                className='block px-4 py-4 bg-white hover:bg-gray-50'>
                <span className='flex items-center space-x-4'>
                  <span className='flex-1 flex space-x-2 truncate'>
                    {transaction.type === 'income' ? (
                      <CashIcon
                        className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                        aria-hidden='true'
                      />
                    ) : (
                      <ShoppingCartIcon
                        className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                        aria-hidden='true'
                      />
                    )}
                    <span className='flex flex-col text-gray-500 text-sm truncate'>
                      <span className='truncate'>{transaction.detail}</span>
                      <span>
                        <span className='text-gray-900 font-medium'>
                          {IDRupiah.format(transaction.amount)}
                        </span>
                      </span>
                      <time dateTime={transaction.date}>
                        {transaction.date.substring(0, 10)}
                      </time>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className='flex-shrink-0 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <nav
          className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200'
          aria-label='Pagination'>
          <div className='flex-1 flex justify-between'>
            <a
              href='#'
              className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500'>
              Previous
            </a>
            <a
              href='#'
              className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500'>
              Next
            </a>
          </div>
        </nav>
      </div>

      {/* Activity table (small breakpoint and up) */}
      <div className='hidden sm:block'>
        <div className='max-w-6xl mx-auto px-0 sm:px-0 lg:px-0'>
          <div className='flex flex-col mt-2'>
            <div className='align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead>
                  <tr>
                    <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Transaction
                    </th>
                    <th className='hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block'>
                      Category
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Amount
                    </th>
                    <th className='hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block'>
                      Type
                    </th>
                    <th className='px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {transactions.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className='px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500'>
                        {isLoading ? 'Loading' : 'No transaction yet'}
                      </td>
                    </tr>
                  )}

                  {transactions.map((transaction: any) => (
                    <tr key={transaction._id} className='bg-white'>
                      <td className='max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        <div className='flex'>
                          <Link
                            to={`/transactions/edit/${transaction._id}`}
                            className='group inline-flex space-x-2 truncate text-sm'>
                            {transaction.type === 'income' ? (
                              <CashIcon
                                className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                aria-hidden='true'
                              />
                            ) : (
                              <CurrencyDollarIcon
                                className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                                aria-hidden='true'
                              />
                            )}
                            <p className='text-gray-500 truncate group-hover:text-gray-900'>
                              {transaction.detail}
                            </p>
                          </Link>
                        </div>
                      </td>
                      <td className='hidden px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500 md:block'>
                        <span className='text-gray-900 font-medium'>
                          {transaction.category.name}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                        <span className='text-gray-900 font-medium'>
                          {IDRupiah.format(transaction.amount)}{' '}
                        </span>
                      </td>
                      <td className='hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block'>
                        <span
                          className={classNames(
                            typeStyles[transaction.type],
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                          )}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500'>
                        <time dateTime={transaction.date}>
                          {transaction.date.substring(0, 10)}
                        </time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              {/* <nav
                className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'
                aria-label='Pagination'>
                <div className='hidden sm:block'>
                  <p className='text-sm text-gray-700'>
                    Showing <span className='font-medium'>1</span> to{' '}
                    <span className='font-medium'>10</span> of{' '}
                    <span className='font-medium'>20</span> results
                  </p>
                </div>
                <div className='flex-1 flex justify-between sm:justify-end'>
                  <a
                    href='#'
                    className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
                    Previous
                  </a>
                  <a
                    href='#'
                    className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'>
                    Next
                  </a>
                </div>
              </nav> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentTable;
