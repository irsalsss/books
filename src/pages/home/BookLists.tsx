import React, { useState, useRef, useEffect } from 'react'
import Text from 'components/text/Text'
import Input from 'components/input/Input'
import { getBooks } from 'services/books'
import useHomeStore from 'store/useHomeStore'
import shallow from 'zustand/shallow'
import { TBook } from 'types/book'
import { SEARCH_BOOKS_BY, BOOKS_OPT_SEARCH } from 'constants/book'
import Select from '@components/select/Select'

const BookLists = () => {
  const [searchBy, setSearchBy] = useState(SEARCH_BOOKS_BY.TITLE);
  const [books, setBooks] = useState([]);
  const scrollRef = useRef<number>(500);
  const { activeTag, dictCategory } = useHomeStore(
    (state) => ({
      activeTag: state.activeTag,
      dictCategory: state.dictCategory,
    }),
    shallow
  )

  const {
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = getBooks(
    activeTag,
    {
      onSuccess: (result: any) => {
        let newData: any = [];
        (result?.pages || []).forEach((v: any) => {
          newData = [...newData, ...v.data];
        });
        setBooks(newData);
      }
    }
  );

  const onInfiniteScroll = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const onScroll = (e: any) => {
    const scrollTop = e.target.scrollTop
    const curr = scrollRef.current;
    if (curr < scrollTop) {
      scrollRef.current += 500;
      onInfiniteScroll();
    }
  };

  const onChangeSearchBy = (value: string) => {
    setSearchBy(value);
  }

  const selectAfter = (
    <Select
      options={BOOKS_OPT_SEARCH}
      value={searchBy}
      onChange={onChangeSearchBy}
    />
  )

  return (
    <div className='mt-[8px] mb-[24px]'>
      <Text level={2} value='Explore Books' />
      <div className='sticky top-[112px] pb-[16px] bg-white'>
        <Input
          wrapperClassName='w-[40%] '
          placeholder={`Search books by ${searchBy}`}
          addonAfter={selectAfter}
        />
      </div>
      <div
        onScroll={onScroll}
        className="overflow-y-auto max-h-screen"
      >
        <div className='flex flex-wrap gap-[32px]'>
          {books.map((v: TBook) => (
            <div className='flex flex-col' key={v.id}>
              <img
                src={v.cover_url}
                alt={v.title}
                height={360}
                width={240}
                loading="lazy"
              />
              <div className='flex flex-col mt-[12px]'>
                <Text isTitle={false} isStrong value={v.title} />
                <Text isTitle={false} value={dictCategory[v.category_id]} type='secondary' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BookLists