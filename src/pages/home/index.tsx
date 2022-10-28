import React from 'react';
import ExploreBooks from './ExploreBooks';
import ExploreCategories from './ExploreCategories';

const HomePage = () => {
  return (
    <div id='home-page' className='mt-[20px] w-[80%]'>
      <ExploreCategories />
      <ExploreBooks />
    </div>
  )
}

export default HomePage