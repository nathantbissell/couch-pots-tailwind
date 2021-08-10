import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';

// Import utilities

function DashboardCardBasic(props) {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-gray-600 hover:text-gray-800 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-red-500 hover:text-red-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Name</h2>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">
          Position
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 mr-2 mb-10">
            {props.name}
          </div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">
            {props.position}
          </div>
        </div>
        <div className="flex items-start">
          <div className="text-md font-semibold text-grey-800 mr-2 mb-10">
            {props.auctionPrice}
          </div>
          <div className="text-md font-semibold text-grey-800 mr-2 mb-10">
            {props.totalPoints}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default DashboardCardBasic;
