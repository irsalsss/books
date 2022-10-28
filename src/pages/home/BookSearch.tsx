import React from 'react';
import Select from '@components/select/Select';
import Input from 'components/input/Input';
import Text from 'components/text/Text';
import { BOOKS_OPT_SEARCH } from '@constants/book';

const BookSearch = ({
  searchBy, setSearchBy,
  search, setSearch,
}: IBookSearchProps) => {

  const onChangeSearchBy = (value: string) => {
    setSearchBy(value);
  }

  const onSearch = (e: React.ChangeEvent<Element>) => {
    const element = e.currentTarget as HTMLInputElement;
    const value = element.value;
    setSearch(value)
  }

  const selectAfter = (
    <Select
      options={BOOKS_OPT_SEARCH}
      value={searchBy}
      onChange={onChangeSearchBy}
      selectClassName='w-[120px]'
    />
  )

  return (
    <>
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
    </>
  )
}

interface IBookSearchProps {
  searchBy: string;
  setSearchBy: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
}

export default BookSearch