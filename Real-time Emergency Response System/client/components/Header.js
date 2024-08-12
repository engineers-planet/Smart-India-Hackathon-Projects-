import { useState, useEffect } from 'react';
import UserHeader from './Headers/UserHeader';
import CompanyHeader from './Headers/CompanyHeader';
import AdminHeader from './Headers/AdminHeader';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Sidebar from './Sidebar';

function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const visitor = localStorage.getItem('accessLevel');
  console.log(localStorage.getItem('supabase.auth.token'));

  if (visitor === 'user' && localStorage.getItem('supabase.auth.token')) {
    return (
      <div>
        <UserHeader />
      </div>
    );
  } else if (visitor === 'company' && localStorage.getItem('supabase.auth.token')) {
    return (
      <div>
        <CompanyHeader />
      </div>
    );
  } else if (visitor === 'government' && localStorage.getItem('admin')) {
    return (
      <div>
        <AdminHeader />
      </div>
    );
  } else {
    return (
      <div>
        <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-zinc-900 border-b-4 border-indigo-500">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <Link href="/">
              <a className="flex items-center">
                <Image
                  src="/icon-192x192.png"
                  width={60}
                  height={60}
                  className="mr-3 h-6 sm:h-9"
                  alt="Reachout"
                />
                <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                  ReachOut
                </span>
              </a>
            </Link>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
              onClick={() => setNavbar(!navbar)}
            >
              <span className="sr-only">Open main menu</span>
              {navbar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
            <div
              className="hidden w-full md:block md:w-auto ${navbar ? 'block' : 'hidden'}"
              id="navbar-default"
            >
              <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-zinc-900 md:dark:bg-zinc-900 dark:border-gray-700">
                <li>
                  <Link
                    href="/"
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <label
                    for="default-toggle"
                    className="inline-flex relative items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value=""
                      id="default-toggle"
                      className="sr-only peer"
                    />
                    <div
                      className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                      onClick={() => {
                        setTheme(theme === 'light' ? 'dark' : 'light');
                      }}
                    ></div>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
          {navbar ? <Sidebar /> : ''}
        </nav>
      </div>
    );
  }
}

export default Header;
