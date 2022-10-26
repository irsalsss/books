import React, { useState, useRef } from 'react'
import Text from 'components/text/Text'
import { getBooks } from 'services/books'
import useHomeStore from 'store/useHomeStore'
import shallow from 'zustand/shallow'
import { TBook } from 'types/book'

const BookLists = () => {
  const [books, setBooks] = useState([]);
  const scrollRef = useRef<number>(40);
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
    const curr = scrollRef.current;
    if (curr < e.target.scrollTop) {
      scrollRef.current += 40;
      onInfiniteScroll();
    }
  };

  return (
    <div className='mt-[32px]'>
      <Text level={2} value='Explore Books' />
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