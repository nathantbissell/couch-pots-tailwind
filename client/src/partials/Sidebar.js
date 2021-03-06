import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split('/')[1];

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-gray-800 p-4 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink exact to="/" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient
                  x1="28.538%"
                  y1="20.229%"
                  x2="100%"
                  y2="108.156%"
                  id="logo-a"
                >
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="88.638%"
                  y1="29.267%"
                  x2="22.42%"
                  y2="100%"
                  id="logo-b"
                >
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#4F46E5"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
            Pages
          </h3>
          <ul className="mt-3">
            {/* Dashboard */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                page === '' && 'bg-gray-900'
              }`}
            >
              <NavLink
                exact
                to="/"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === '' && 'hover:text-gray-200'
                }`}
              >
                <div className="flex flex-grow">
                  <svg
                    className="flex-shrink-0 h-6 w-6 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={`fill-current text-gray-400 ${
                        page === '' && 'text-indigo-500'
                      }`}
                      d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                    />
                    <path
                      className={`fill-current text-gray-600 ${
                        page === '' && 'text-indigo-600'
                      }`}
                      d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                    />
                    <path
                      className={`fill-current text-gray-400 ${
                        page === '' && 'text-indigo-200'
                      }`}
                      d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
              </NavLink>
            </li>
            {/* quarterbacks */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                page === 'quarterbacks' && 'bg-gray-900'
              }`}
            >
              <NavLink
                exact
                to="/qb"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === 'quarterbacks' && 'hover:text-gray-200'
                }`}
              >
                <div className="flex flex-grow">
                  <svg
                    className="flex-shrink-0 h-6 w-6 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={`fill-current text-gray-400 ${
                        page === 'quarterbacks' && 'text-indigo-300'
                      }`}
                      d="M7 0l6 7H8v10H6V7H1z"
                    />
                    <path
                      className={`fill-current text-gray-600 ${
                        page === 'quarterbacks' && 'text-indigo-500'
                      }`}
                      d="M18 7v10h5l-6 7-6-7h5V7z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Quarterbacks</span>
                </div>
              </NavLink>
            </li>
            {/* runningbacks */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                page === 'runningbacks' && 'bg-gray-900'
              }`}
            >
              <NavLink
                exact
                to="/rb"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === 'runningbacks' && 'hover:text-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-grow">
                    <svg
                      className="flex-shrink-0 h-6 w-6 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        className={`fill-current text-gray-400 ${
                          page === 'runningbacks' && 'text-indigo-300'
                        }`}
                        d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                      />
                      <path
                        className={`fill-current text-gray-700 ${
                          page === 'runningbacks' && 'text-indigo-600'
                        }`}
                        d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                      />
                      <path
                        className={`fill-current text-gray-600 ${
                          page === 'runningbacks' && 'text-indigo-500'
                        }`}
                        d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                      />
                    </svg>
                    <span className="text-sm font-medium">Runningbacks</span>
                  </div>
                  {/* Badge */}
                  <div className="flex flex-shrink-0 ml-2"></div>
                </div>
              </NavLink>
            </li>
            {/* widereceivers */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                page === 'widereceivers' && 'bg-gray-900'
              }`}
            >
              <NavLink
                exact
                to="/wr"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === 'widereceivers' && 'hover:text-gray-200'
                }`}
              >
                <div className="flex flex-grow">
                  <svg
                    className="flex-shrink-0 h-6 w-6 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={`fill-current text-gray-600 ${
                        page === 'widereceivers' && 'text-indigo-500'
                      }`}
                      d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                    />
                    <path
                      className={`fill-current text-gray-400 ${
                        page === 'widereceivers' && 'text-indigo-300'
                      }`}
                      d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Wide Receivers</span>
                </div>
              </NavLink>
            </li>
            {/* tightends */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                page === 'tightends' && 'bg-gray-900'
              }`}
            >
              <NavLink
                exact
                to="/te"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === 'tightends' && 'hover:text-gray-200'
                }`}
              >
                <div className="flex flex-grow">
                  <svg
                    className="flex-shrink-0 h-6 w-6 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={`fill-current text-gray-600 ${
                        page === 'tightends' && 'text-indigo-500'
                      }`}
                      d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                    />
                    <path
                      className={`fill-current text-gray-400 ${
                        page === 'tightends' && 'text-indigo-300'
                      }`}
                      d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Tight Ends</span>
                </div>
              </NavLink>
            </li>
            {/* tightends */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                page === 'tightends' && 'bg-gray-900'
              }`}
            >
              <NavLink
                exact
                to="/"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  page === 'allplayers' && 'hover:text-gray-200'
                }`}
              >
                <div className="flex flex-grow">
                  <svg
                    className="flex-shrink-0 h-6 w-6 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className={`fill-current text-gray-600 ${
                        page === 'allplayers' && 'text-indigo-500'
                      }`}
                      d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                    />
                    <path
                      className={`fill-current text-gray-400 ${
                        page === 'allplayers' && 'text-indigo-300'
                      }`}
                      d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                    />
                  </svg>
                  <span className="text-sm font-medium">All Players</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
