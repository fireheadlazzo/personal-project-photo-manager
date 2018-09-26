import React from 'react';

import Header from '../Header';
import TagAlias from './DashboardTools/TagAlias';
import TagImplication from './DashboardTools/TagImplication';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div>
      <Header/>
      <div className='main-block'>
        <h2>Desired functionality:</h2>
        <p>Tag aliasing, implication, merging, & auditing. Mass tagging. Photo editing (cropping, rotating, maybe color correction) Folders. </p>
        <h2>Desired functionality:</h2>
        <p>Tag aliasing, implication, merging, & auditing. Mass tagging. Photo editing (cropping, rotating, maybe color correction) Folders. </p>
      </div>
      <div className="tag-rules-block">
        <TagAlias/>
        <TagImplication/>
      </div>
    </div>
  );
};

export default Dashboard;