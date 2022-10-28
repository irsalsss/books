import { deepClone, isEmpty } from '@utils/general';
import React, { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import useDetailStore from 'store/useDetailStore';
import { TBook } from 'types/book';
import shallow from 'zustand/shallow';
import {
  ArrowLeftOutlined,
  BookOutlined,
  BookFilled
} from '@ant-design/icons';
import Text from 'components/text/Text';
import Collapse from '@components/collapse/Collapse';
import clsx from 'clsx';

type DetailParams = {
  id: string;
};

const DetailPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<string | string[]>([]);
  const { state } = useLocation();
  const { id: bookId } = useParams<DetailParams>();

  const {
    bookDetail, setBookDetail,
    dictCategory,
    bookmarks, setBookmarks, deleteBookmarks
  } = useDetailStore(
    (state) => ({
      bookDetail: state.bookDetail,
      setBookDetail: state.setBookDetail,
      dictCategory: state.dictCategory,
      bookmarks: state.bookmarks,
      setBookmarks: state.setBookmarks,
      deleteBookmarks: state.deleteBookmarks,
    }),
    shallow
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    if (!isEmpty(state?.detailBook)) {
      setBookDetail(state.detailBook)
    }
    setIsLoading(false);
  }, [])

  const detailData = useMemo(() => {
    return bookDetail?.[bookId!] || {};
  }, [bookDetail])

  const authors = useMemo(() => {
    return (detailData.authors || []).join('')
  }, [detailData.authors])

  const duration = useMemo(() => {
    return `${Math.floor((detailData.audio_length || 0) / 60)} minutes`
  }, [detailData.audio_length])

  const isSaved = useMemo(() => {
    return bookmarks[bookId!];
  }, [bookmarks])

  if (!isLoading && isEmpty(detailData)) {
    return <Navigate replace to='/404' />;
  }

  const onBookmark = () => {
    const isSaved = bookmarks[bookId!]
    if (isSaved) {
      deleteBookmarks(detailData);
      return;
    }

    setBookmarks(detailData)
  }

  const onOpenAccordion = (val: string | string[]) => {
    setOpenAccordion(val)
  }

  return (
    <div id='detail-page' className='mt-[20px] w-[80%]'>
      <Link to="/" className='flex items-center'>
        <ArrowLeftOutlined style={{ color: 'black', fontSize: 18 }} />
        <Text
          level={4}
          value={dictCategory?.[detailData.category_id] || '-'}
          className='!mb-0 ml-[12px]'
        />
      </Link>
      <div 
        className={clsx(
          'mt-[36px] p-[24px] flex gap-[24px] items-center relative border-1px-grey',
          'xxs:flex-col md:flex-row'
        )}
      >
        <div
          className={clsx(
            'flex justify-end md:w-[50%]',
            'md:mr-[64px]'
          )}
        >
          <img
            width={240}
            height={360}
            alt={detailData.title}
            src={detailData.cover_url}
            className='min-w-[240px]'
          />
        </div>
        <div className='flex justify-start flex-col md:w-[50%]'>
          <Text
            level={5}
            value={detailData.title || '-'}
            className='!mb-0'
          />
          <Text isTitle={false} value={authors || '-'} className='border-1px-grey' />
          <Text isTitle={false} value={duration} className='border-1px-grey' />
          <Text
            level={5}
            value={'About this book'}
          />
          <Text isTitle={false} value={detailData.description} />
        </div>
        <div className='absolute right-[24px] top-[24px] cursor-pointer' onClick={onBookmark}>
          {isSaved ? (
            <BookFilled style={{ fontSize: 20 }} />
          ) : (
            <BookOutlined style={{ fontSize: 20 }} />
          )}
        </div>
      </div>
      <div className='flex mt-[32px]'>
        <Text
          level={5}
          value="What's inside?"
        />
      </div>
      <Collapse
        options={detailData.sections}
        onChange={onOpenAccordion}
        activeKey={openAccordion}
      />
    </div>
  )
}

export default DetailPage