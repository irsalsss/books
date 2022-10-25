import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
  return (
    <>
      <Header />
      <div className='flex justify-center w-full pt-[64px]'>
        <Outlet />
      </div>
    </>
  )
}

export default Layout