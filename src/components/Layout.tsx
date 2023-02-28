import { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  XIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { ChevronDownIcon, SearchIcon } from '@heroicons/react/solid';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import logo from '/navbar-logo.png';

const classNames = (...classes: any) => {
  return classes.filter(Boolean).join(' ');
};

const Layout = ({ children }: any) => {
  const [name, setName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    currentRoute();
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/token`
      );
      const decoded: any = jwt_decode(response.data.accessToken);
      setName(decoded.name);
    } catch (error: any) {
      if (error.response) {
        navigate('/login');
      }
    }
  };

  const currentRoute = () => {
    return window.location.pathname;
  };

  const navigation = [
    {
      name: 'Home',
      href: '/',
      icon: HomeIcon,
      current: currentRoute() === '/',
    },
    {
      name: 'History',
      href: '/history',
      icon: ClockIcon,
      current: currentRoute() === '/history',
    },
    // {
    //   name: 'Balances',
    //   href: '#',
    //   icon: ScaleIcon,
    //   current: currentRoute() === '#',
    // },
    // {
    //   name: 'Cards',
    //   href: '#',
    //   icon: CreditCardIcon,
    //   current: currentRoute() === '#',
    // },
    {
      name: 'Reports',
      href: '/report',
      icon: DocumentReportIcon,
      current: currentRoute() === '/report',
    },
  ];

  const secondaryNavigation: any = [
    // { name: 'Settings', href: '#', icon: CogIcon },
    // { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
    // { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
  ];

  console.log(secondaryNavigation.length);

  const logoutNavigation = [{ name: 'Logout', icon: LogoutIcon }];

  const Logout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/logout`);
      navigate('/login');
    } catch (error) {}
  };

  return (
    <>
      <div className='min-h-full'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 flex z-40 lg:hidden'
            onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'>
              <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-cyan-700'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'>
                  <div className='absolute top-0 right-0 -mr-12 pt-2'>
                    <button
                      type='button'
                      className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                      onClick={() => setSidebarOpen(false)}>
                      <span className='sr-only'>Close sidebar</span>
                      <XIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex-shrink-0 flex items-center px-4'>
                  <img className='h-8 w-auto' src={logo} alt='Navbar Logo' />
                </div>
                <nav
                  className='mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto'
                  aria-label='Sidebar'>
                  <div className='px-2 space-y-1'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-cyan-800 text-white'
                            : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}>
                        <item.icon
                          className='mr-4 flex-shrink-0 h-6 w-6 text-cyan-200'
                          aria-hidden='true'
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className='mt-6 pt-6'>
                    <div className='px-2 space-y-1'>
                      {secondaryNavigation.length > 0 &&
                        secondaryNavigation.map((item: any) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className='group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600'>
                            <item.icon
                              className='mr-4 h-6 w-6 text-cyan-200'
                              aria-hidden='true'
                            />
                            {item.name}
                          </Link>
                        ))}
                      {logoutNavigation.map((item) => (
                        <button
                          key={item.name}
                          className='group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600 w-full text-left'
                          onClick={Logout}>
                          <item.icon
                            className='mr-4 h-6 w-6 text-cyan-200'
                            aria-hidden='true'
                          />
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </Transition.Child>
            <div className='flex-shrink-0 w-14' aria-hidden='true'>
              {/* Dummy element to force sidebar to shrink to fit close icon */}
              X
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex flex-col flex-grow bg-cyan-700 pt-5 pb-4 overflow-y-auto'>
            <div className='flex items-center flex-shrink-0 px-4'>
              <img className='h-8 w-auto' src={logo} alt='Navbar Logo' />
            </div>
            <nav
              className='mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto'
              aria-label='Sidebar'>
              <div className='px-2 space-y-1'>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-cyan-800 text-white'
                        : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}>
                    <item.icon
                      className='mr-4 flex-shrink-0 h-6 w-6 text-cyan-200'
                      aria-hidden='true'
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className='mt-6 pt-6'>
                <div className='px-2 space-y-1'>
                  {secondaryNavigation.length > 0 &&
                    secondaryNavigation.map((item: any) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className='group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-cyan-600'>
                        <item.icon
                          className='mr-4 h-6 w-6 text-cyan-200'
                          aria-hidden='true'
                        />
                        {item.name}
                      </Link>
                    ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className='lg:pl-64 flex flex-col flex-1'>
          <div className='relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none'>
            <button
              type='button'
              className='px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden'
              onClick={() => setSidebarOpen(true)}>
              <span className='sr-only'>Open sidebar</span>
              <MenuAlt1Icon className='h-6 w-6' aria-hidden='true' />
            </button>
            {/* Search bar */}
            <div className='flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8'>
              <div className='flex-1 flex'>
                <form className='w-full flex md:ml-0'>
                  <label htmlFor='search' className='sr-only'>
                    Search
                  </label>
                  <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                    <div
                      className='absolute inset-y-0 left-0 flex items-center pointer-events-none'
                      aria-hidden='true'>
                      <SearchIcon className='h-5 w-5' aria-hidden='true' />
                    </div>
                    <input
                      id='search'
                      name='search'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm'
                      placeholder='Search transactions'
                      type='search'
                    />
                  </div>
                </form>
              </div>
              <div className='ml-4 flex items-center md:ml-6'>
                <button
                  type='button'
                  className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500'>
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Profile dropdown */}
                <Menu as='div' className='ml-3 relative'>
                  <div>
                    <Menu.Button className='max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50'>
                      <span className='hidden ml-3 text-gray-700 text-sm font-medium lg:block'>
                        <span className='sr-only'>Open user menu for </span>
                        {name}
                      </span>
                      <ChevronDownIcon
                        className='hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block'
                        aria-hidden='true'
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'>
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='/profile'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}>
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href='#'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}>
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={Logout}
                            className={classNames(
                              active ? 'bg-gray-100 w-full' : '',
                              'block px-4 py-2 text-sm text-left text-gray-700 w-full'
                            )}>
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className='flex-1 pb-8'>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
