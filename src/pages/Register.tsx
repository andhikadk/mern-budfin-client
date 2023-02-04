import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/token');
      if (response) {
        navigate('/');
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  const Register = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', {
        name,
        email,
        password,
        confPassword,
      });
      navigate('/login');
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className='min-h-full flex flex-col justify-center py-12 sm:px-8 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Create new account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='font-medium text-indigo-600 hover:text-indigo-500'>
              Login here
            </Link>
          </p>
        </div>

        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form onSubmit={Register} className='space-y-6'>
              {message && (
                <div
                  className='px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg'
                  role='alert'>
                  <p>{message}</p>
                </div>
              )}
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'>
                  Name
                </label>
                <div className='mt-1'>
                  <input
                    id='name'
                    name='name'
                    type='text'
                    autoComplete='name'
                    required
                    placeholder='Your Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'>
                  Email address
                </label>
                <div className='mt-1'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    placeholder='email@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <div className='mt-1'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='confPassword'
                  className='block text-sm font-medium text-gray-700'>
                  Confirm Password
                </label>
                <div className='mt-1'>
                  <input
                    id='confPassword'
                    name='confPassword'
                    type='password'
                    autoComplete='current-password'
                    required
                    placeholder='Password'
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
