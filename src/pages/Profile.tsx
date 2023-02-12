import React from 'react';
import Layout from '../components/Layout';

const Profile = () => {
  return (
    <Layout>
      <div className='max-w-6xl mx-auto mt-8 px-0 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
          <div className='md:grid md:grid-cols-2 md:gap-6'>
            <div className='md:col-span-1'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Personal Information
              </h3>
              <p className='mt-1 text-sm text-gray-500'>
                You can update your information here
              </p>
            </div>
            <div className='mt-5 md:mt-0 md:col-span-1'>
              <form action='#' method='POST'>
                <div className='grid grid-cols-6 gap-6'>
                  <div className='col-span-6 sm:col-span-4'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'>
                      Fullname
                    </label>
                    <input
                      type='text'
                      name='first-name'
                      id='first-name'
                      autoComplete='given-name'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-4'>
                    <label
                      htmlFor='email-address'
                      className='block text-sm font-medium text-gray-700'>
                      Email address
                    </label>
                    <input
                      type='text'
                      name='email-address'
                      id='email-address'
                      autoComplete='email'
                      value='andhika'
                      disabled
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-4'>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium text-gray-700'>
                      Password
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      autoComplete='password'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>

                  <div className='col-span-4'>
                    <label
                      htmlFor='confPassword'
                      className='block text-sm font-medium text-gray-700'>
                      Confirm Password
                    </label>
                    <input
                      type='password'
                      name='confPassword'
                      id='confPassword'
                      autoComplete='confPassword'
                      className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='flex justify-end'>
          <button
            type='button'
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Cancel
          </button>
          <button
            type='submit'
            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
