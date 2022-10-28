import { isEmpty } from '@utils/general';
import React, { useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import useDetailStore from 'store/useDetailStore';
import { TBook } from 'types/book';
import shallow from 'zustand/shallow';

type DetailParams = {
  id: string;
};

const DetailPage = () => {
  const { state } = useLocation();
  const { id: bookId } = useParams<DetailParams>();
  const { bookDetail, setBookDetail } = useDetailStore(
    (state) => ({
      bookDetail: state.bookDetail,
      setBookDetail: state.setBookDetail,
    }),
    shallow
  );

  useEffect(() => {
    if (!isEmpty(state.detailBook)) {
      setBookDetail(state.detailBook)
    }
  }, [])

  return (
    <div>DetailPage</div>
  )
}

export default DetailPage