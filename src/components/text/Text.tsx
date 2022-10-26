import React from 'react';
import { Typography } from 'antd';
import { BaseType } from 'antd/lib/typography/Base';

const { Text: TextAntd, Title } = Typography;

const Text = ({
  type,
  level,
  value,
  isTitle,
  isStrong,
  className
}: ITextProps) => {
  if (!isTitle) {
    return (
      <TextAntd
        type={type}
        className={className}
        strong={isStrong}
      >
        {value}
      </TextAntd>
    )
  }

  return (
    <Title
      level={level}
      className={className}
    >
      {value}
    </Title>
  )
};

interface ITextProps {
  type?: BaseType | undefined,
  level?: 1 | 5 | 2 | 3 | 4 | undefined,
  isTitle: boolean,
  isStrong?: boolean,
  className?: string,
  value: string,
}

Text.defaultProps = {
  type: undefined,
  level: undefined,
  isTitle: true,
  isStrong: false,
  className: '',
};

export default Text;