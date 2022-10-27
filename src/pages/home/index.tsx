import React from 'react';
import BookLists from './BookLists';
import Categories from './Categories';

const HomePage = () => {
  return (
    <div id='home-page' className='mt-[20px] w-[80%]'>
      <Categories />
      <BookLists />
    </div>
  )
}

export default HomePage