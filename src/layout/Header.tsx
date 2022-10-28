import React from 'react';
import {
  BookOutlined
} from '@ant-design/icons';
import Button from '@components/button/Button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='flex justify-center bg-neutral-100 p-4 fixed top-0 z-[10] shadow-md w-full'>
      <div className='flex w-[80%] justify-between items-center'>
        <Link to='/'>
          <img
            className='w-[84px] h-[24px]'
            src='https://cdn.sejutacita.id/deall-frontend/v1/assets/images/logo.png'
            alt='deall_logo'
            height={24}
            width={84}
          />
        </Link>
        <Button
          value='Bookmark'
          icon={<BookOutlined />}
        />
      </div>
    </div>
  )
}

export default Header