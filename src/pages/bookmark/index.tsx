import React, { useMemo } from 'react'
import useDetailStore from 'store/useDetailStore'
import BookLists from '@pages/home/BookLists'
import shallow from 'zustand/shallow'
import { TBook } from 'types/book'
import { isEmpty } from '@utils/general'

const BookmarkPage = () => {
  const { dictCategory, bookmarks } = useDetailStore(
    (state) => ({
      dictCategory: state.dictCategory,
      bookmarks: state.bookmarks,
    }),
    shallow
  )

  const filteredBooks = useMemo(() => {
    if (isEmpty(bookmarks)) return [];
    const temp: TBook[] = [];
    const keys = Object.keys(bookmarks);
    keys.forEach((key: string | number) => {
      temp.push(bookmarks[key])
    })

    return temp;
  }, [bookmarks])

  return (
    <div id='bookmark-page' className='mt-[20px] w-[80%]'>
      <BookLists isFetching={false} filteredBooks={filteredBooks} dictCategory={dictCategory} />
    </div>
  )
}

export default BookmarkPage