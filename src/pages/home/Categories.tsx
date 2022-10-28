import React, { useMemo, useState } from 'react'
import { isEmpty } from '@utils/general';
import { getCategories } from 'services/categories';
import Tag from 'components/tag/Tag';
import { TCategory } from 'types/category';
import useHomeStore from 'store/useHomeStore';
import shallow from 'zustand/shallow';
import Text from '@components/text/Text';
import { useQueryClient } from 'react-query';

const Categories = () => {
  const queryClient = useQueryClient();
  const { activeTag, setActiveTag, setDictCategory } = useHomeStore(
    (state) => ({
      activeTag: state.activeTag,
      setActiveTag: state.setActiveTag,
      setDictCategory: state.setDictCategory,
    }),
    shallow
  )

  const { data: resCategories } = getCategories({
    onSuccess: (res: any) => {
      const response: TCategory[] = res?.data;
      if (!isEmpty(response)) {
        setActiveTag(String(response[0].id))
        
        const dictCategory: Record<number, string> = {};
        response.forEach((v) => {
          dictCategory[v.id] = v.name;
        })

        setDictCategory(dictCategory);
      }
    }
  });

  const categories = resCategories?.data || [];

  const onChangeCategory = (val: number | string) => {
    const element = document.getElementById('books-scroller');
    if (element) {
      element.scroll({
        top: 0,
        left: 0,
      });
      window.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
      });
    }
    queryClient.removeQueries('getBooks')

    setActiveTag(String(val));
  }

  return (
    <div className='sticky top-[24px] bg-white pb-[8px]'>
      <Text level={2} value='Explore Categories' />
      <div className='flex gap-[12px] max-w-max overflow-x-auto'>
        {!isEmpty(categories) && categories.map((v: TCategory) => {
          const stringId = String(v.id);
          return (
            <Tag
              key={stringId}
              id={stringId}
              title={v.name}
              onClick={onChangeCategory}
              isActive={activeTag === stringId}
              className='min-w-max'
            />
          )
        })}
      </div>
    </div>
  )
}

export default Categories