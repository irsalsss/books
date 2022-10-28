import React, { useState, useEffect } from 'react'
import { getBooks } from 'services/books'
import useHomeStore from 'store/useHomeStore'
import shallow from 'zustand/shallow'
import { TBook } from 'types/book'
import { SEARCH_BOOKS_BY } from 'constants/book'
import useDebounceValue from '@hooks/useDebounceValue'
import { deepClone } from '@utils/general'
import useDetailStore from 'store/useDetailStore'
import BookSearch from './BookSearch'
import BookLists from './BookLists'

const ExploreBooks = () => {
  const [searchBy, setSearchBy] = useState(SEARCH_BOOKS_BY.TITLE);
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState<TBook[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<TBook[]>([]);

  const debounceSearch = useDebounceValue(search, 500);

  const { dictCategory } = useDetailStore(
    (state) => ({
      dictCategory: state.dictCategory,
    }),
    shallow
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

  useEffect(() => {
    if (search) {
      onFilterBooks();
      return;
    }

    setFilteredBooks(books);
  }, [books, debounceSearch, searchBy])

  return (
    <div className='mt-[8px] mb-[24px]'>
      <BookSearch
        search={search} setSearch={setSearch}
        searchBy={searchBy} setSearchBy={setSearchBy}
      />
      <div
        id='books-scroller'
        onScroll={onScroll}
        className="overflow-y-auto max-h-screen"
      >
        <BookLists
          isFetching={isFetching}
          filteredBooks={filteredBooks}
          dictCategory={dictCategory}
        />
      </div>
    </div>
  )
}

export default ExploreBooks