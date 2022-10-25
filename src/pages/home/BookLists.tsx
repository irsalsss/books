import Text from '@components/text/Text'
import { getBooks } from '@services/books'
import React from 'react'
import useHomeStore from 'store/useHomeStore'
import shallow from 'zustand/shallow'

const BookLists = () => {
  const { activeTag } = useHomeStore(
    (state) => ({
      activeTag: state.activeTag,
    }),
    shallow
  )

  const { data } = getBooks({
    categoryId: activeTag,
    page: 0,
    size: 10,
  }, {
    enabled: Boolean(activeTag)
  })

  console.log('dataBooks', data)
  return (
    <div className='mt-[32px]'>
      <Text level={2} value='Explore Books' />
    </div>
  )
}

export default BookLists