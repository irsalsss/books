import React, { useState, useEffect } from 'react'
import Text from 'components/text/Text'
import Input from 'components/input/Input'
import { getBooks } from 'services/books'
import useHomeStore from 'store/useHomeStore'
import shallow from 'zustand/shallow'
import { TBook } from 'types/book'
import { SEARCH_BOOKS_BY, BOOKS_OPT_SEARCH } from 'constants/book'
import Select from '@components/select/Select'
import useDebounceValue from '@hooks/useDebounceValue'
import { deepClone, isEmpty } from '@utils/general'
import EmptyData from 'components/state/EmptyData'
import clsx from 'clsx'
import { Spin } from 'antd'
import { Link } from 'react-router-dom'
import useDetailStore from 'store/useDetailStore'

const BookLists = () => {
  const [searchBy, setSearchBy] = useState(SEARCH_BOOKS_BY.TITLE);
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState<TBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<TBook[]>([]);

  const debounceSearch = useDebounceValue(search, 500);
  const { dictCategory } = useDetailStore(
    (state) => ({
      dictCategory: state.dictCategory,
    })
  )
  const { activeTag } = useHomeStore(
    (state) => ({
      activeTag: state.activeTag,
    }),
    shallow
  )

  const {
    hasNextPage,
    fetchNextPage,
    isFetching,
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
    if (hasNextPage && !isFetchingNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  const onScroll = (e: any) => {
    const target = e.target;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    if (scrollHeight - scrollTop < clientHeight + 400) {
      onInfiniteScroll();
    }
  };

  const onChangeSearchBy = (value: string) => {
    setSearchBy(value);
  }
  
  const onSearch = (e: React.ChangeEvent<Element>) => {
    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;
    setSearch(value)
  }

  const onFilterBooks = () => {
    let filtered: TBook[] = [];
    const currBooks = deepClone(books);

    if (searchBy === SEARCH_BOOKS_BY.TITLE) {
      filtered = currBooks.filter((book: any) => book[searchBy].toLowerCase().includes(search));
    } else {
      currBooks.forEach((book: TBook) => {
        const isAuthorExist = book.authors.some((author: string) => author.toLowerCase().includes(search))
        if (isAuthorExist) {
          filtered.push(book);
        }
      });
    }

    setFilteredBooks(filtered);
  }

  const selectAfter = (
    <Select
      options={BOOKS_OPT_SEARCH}
      value={searchBy}
      onChange={onChangeSearchBy}
      selectClassName='w-[120px]'
    />
  )

  useEffect(() => {
    if (search) {
      onFilterBooks();
      return;
    }

    setFilteredBooks(books);
  }, [books, debounceSearch, searchBy])

  return (
    <div className='mt-[8px] mb-[24px]'>
      <Text level={2} value='Explore Books' />
      <div className='sticky top-[112px] pb-[16px] bg-white'>
        <Input
          wrapperClassName='w-[400px]'
          placeholder={`Search books by ${searchBy}`}
          addonAfter={selectAfter}
          onChange={onSearch}
          value={search}
        />
      </div>
      <div
        id='books-scroller'
        onScroll={onScroll}
        className="overflow-y-auto max-h-screen"
      >
        <div 
          className={clsx(
            'flex flex-wrap',
            'xxs:justify-center md:justify-start',
            'xxs:gap-[16px] md:gap-[32px]'
          )}
        >
          {filteredBooks.map((v: TBook) => (
            <Link 
              to={`/detail/${v.id}`}
              state={{ detailBook: v }}
              className='flex flex-col'
              key={v.id}
            >
              <img
                src={v.cover_url}
                alt={v.title}
                height={360}
                width={240}
                loading="lazy"
                className='lg:w-[240px] xxs:w-[200px]'
              />
              <div className='flex flex-col mt-[12px] lg:w-[240px] xxs:w-[200px]'>
                <Text isTitle={false} isStrong value={v.title} />
                <Text isTitle={false} value={dictCategory[v.category_id]} type='secondary' />
              </div>
            </Link>
          ))}
          {!isFetching && isEmpty(filteredBooks) && !isEmpty(dictCategory) && (
            <div className='p-[12px] w-full flex justify-center'>
              <EmptyData />
            </div>
          )}
          {(isFetching || isEmpty(dictCategory)) && (
            <div className='p-[12px] w-full flex justify-center'>
              <Spin size="large" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookLists