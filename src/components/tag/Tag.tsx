import React, { MouseEventHandler } from 'react';
import { clsx } from 'clsx';

const Tag = ({
  id,
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
      onClick={() => onClick!(id)}
      role='button'
      tabIndex={0}
    >
      {title}
    </div>
  )
}

interface ITagProps {
  title: string;
  id: string,
  onClick?: (id: string) => void;
  isActive?: boolean;
}

Tag.defaultProps = {
  onClick: (id: string) => {},
  isActive: false,
}

export default Tag;