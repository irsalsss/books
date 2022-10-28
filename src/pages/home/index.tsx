import React from 'react';
import ExploreBooks from './ExploreBooks';
import Categories from './Categories';

const HomePage = () => {
  return (
    <div id='home-page' className='mt-[20px] w-[80%]'>
      <Categories />
      <ExploreBooks />
    </div>
  )
}

export default HomePage