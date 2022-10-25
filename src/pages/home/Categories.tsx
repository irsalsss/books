import React, { useMemo, useState } from 'react'
import { isEmpty } from '@utils/general';
import { getCategories } from 'services/categories';
import Tag from 'components/tag/Tag';
import { TCategory } from 'types/category';
import { CATEGORY_ALL } from '@constants/category';

const Categories = () => {
  const [activeTag, setActiveTag] = useState(CATEGORY_ALL.name);
  // const { data: resCategories } = getCategories();
  const categories = [
    {
      "id": 1,
      "name": "Happiness & Mindfulness"
    },
    {
      "id": 11,
      "name": "Career & Business"
    },
    {
      "id": 12,
      "name": "Productivity & Time Management"
    },
    {
      "id": 19,
      "name": "Society & Politics"
    },
    {
      "id": 21,
      "name": "Investment & Finance"
    }
  ]
  // const categories = resCategories?.data || [];

  const modifiedCategories: TCategory[] = useMemo(() => {
    return [CATEGORY_ALL, ...categories]
  }, [categories])

  const onChangeCategory = (val: string) => {
    setActiveTag(val);
  }
  return (
    <div className='flex flex-wrap gap-[24px]'>
      {!isEmpty(modifiedCategories) && modifiedCategories.map((v: TCategory) => {
        return (
          <Tag
            key={v.id}
            title={v.name}
            onClick={onChangeCategory}
            isActive={activeTag === v.name}
          />
        )
      })}
    </div>
  )
}

export default Categories