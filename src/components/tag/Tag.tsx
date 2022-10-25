import React, { MouseEventHandler } from 'react';
import { clsx } from 'clsx';

const Tag = ({
  title,
  onClick,
  isActive
}: ITagProps) => {
  return (
    <div
      className={clsx(
        "text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full border cursor-pointer",
        isActive ? 'text-white bg-zinc-900' : 'text-gray-700 bg-white'
      )}
      onClick={() => onClick!(title)}
      role='button'
      tabIndex={0}
    >
      {title}
    </div>
  )
}

interface ITagProps {
  title: string;
  onClick?: (title: string) => void;
  isActive?: boolean;
}

Tag.defaultProps = {
  onClick: (title: string) => {},
  isActive: false,
}

export default Tag;