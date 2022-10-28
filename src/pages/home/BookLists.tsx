import React from 'react'
import clsx from 'clsx'
import { TBook } from 'types/book'
import { Link } from 'react-router-dom'
import Text from '@components/text/Text'
import { isEmpty } from '@utils/general'
import { Spin } from 'antd'
import EmptyData from '@components/state/EmptyData'

const BookLists = ({
  filteredBooks,
  dictCategory,
  isFetching,
}: IBookListsProps) => {
  return (
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
  )
}

interface IBookListsProps {
  filteredBooks: TBook[];
  dictCategory: Record<number, string>;
  isFetching?: boolean;
}

BookLists.defaultProps = {
  isFetching: false,
}

export default BookLists