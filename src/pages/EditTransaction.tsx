import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';

const EditTransaction = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: any = today.getMonth() + 1; // Months start at 0!
  let dd: any = today.getDate();

  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;

  const formattedToday = yyyy + '-' + mm + '-' + dd;

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [detail, setDetail] = useState('');
  const [amount, setAmount] = useState(null as any);
  const [date, setDate] = useState(formattedToday);
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getTransactionById = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/transactions/${id}`
        );
        console.log(response.data.category);
        setCategory(response.data.category._id);
        setDetail(response.data.detail);
        setAmount(response.data.amount);
        setDate(response.data.date.substring(0, 10));
      } catch (error: any) {}
    };
    getTransactionById();
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/categories`
      );
      const type = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/transactions/${id}`
      );
      if (type.data.type === 'income') {
        setType('income');
        const categories = response.data.filter(
          (c: any) => c.type === 'income'
        );
        setCategories(categories);
      } else if (type.data.type === 'expense') {
        setType('expense');
        const categories = response.data.filter(
          (c: any) => c.type === 'expense'
        );
        setCategories(categories);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const updateTransaction = async (e: any) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/transactions/${id}`,
        {
          category,
          detail,
          type,
          amount,
          date,
        }
      );
      // navigate back
      goBack(e);
    } catch (error: any) {
      console.log(error);
    }
  };

  const deleteTransaction = async () => {
    // confirm delete
    if (confirm('Are you sure to delete this transaction?'))
      try {
        await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/transactions/${id}`
        );
        // navigate back
        navigate(-1);
      } catch (error: any) {
        console.log(error);
      }
  };

  const goBack = (e: any) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Layout>
      <div className='flex justify-between max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        <h2 className=''>Edit Transaction</h2>
        <button
          type='button'
          onClick={deleteTransaction}
          className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
          Delete
        </button>
      </div>
      <div className='max-w-6xl mt-2 mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mt-4 sm:mt-0'>
          <div className='md:grid md:grid-cols-2 md:gap-6'>
            <div className='mt-5 md:mt-0 md:col-span-2'>
              <form onSubmit={updateTransaction}>
                <div className='shadow overflow-hidden sm:rounded-md'>
                  <div className='px-4 py-5 bg-white sm:p-6'>
                    <div className='grid grid-cols-8 gap-6'>
                      <div className='col-span-8 sm:col-span-4 lg:col-span-2'>
                        <label
                          htmlFor='category'
                          className='block text-sm font-medium text-gray-700'>
                          Category
                        </label>
                        <select
                          name='category'
                          id='category'
                          autoComplete='category'
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'>
                          {categories.map((c: any) => (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className='col-span-8 sm:col-span-4 lg:col-span-2'>
                        <label
                          htmlFor='detail'
                          className='block text-sm font-medium text-gray-700'>
                          Detail
                        </label>
                        <input
                          type='text'
                          name='detail'
                          id='detail'
                          autoComplete='detail'
                          required
                          value={detail}
                          onChange={(e) => setDetail(e.target.value)}
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>

                      <div className='col-span-8 sm:col-span-4 lg:col-span-2'>
                        <label
                          htmlFor='amount'
                          className='block text-sm font-medium text-gray-700'>
                          Amount
                        </label>
                        <input
                          type='number'
                          name='amount'
                          id='amount'
                          autoComplete='amount'
                          required
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>

                      <div className='col-span-8 sm:col-span-4 lg:col-span-2'>
                        <label
                          htmlFor='date'
                          className='block text-sm font-medium text-gray-700'>
                          Date
                        </label>
                        <input
                          type='date'
                          name='date'
                          id='date'
                          autoComplete='date'
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='px-4 py-3 bg-gray-50 sm:px-6 flex justify-between'>
                    <button
                      onClick={goBack}
                      className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'>
                      Back
                    </button>
                    <button
                      type='submit'
                      className='inline-flex items-center px-8 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'>
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditTransaction;
