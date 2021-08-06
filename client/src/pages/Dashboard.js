import React, { useState } from 'react';
import Players from './playerViews/Players';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import FilterButton from '../partials/actions/FilterButton';
import Banner from '../partials/Banner';

function Dashboard() {
  return <Players />;
}

export default Dashboard;
