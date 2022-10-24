import React, { MouseEventHandler } from 'react';
import { Button as ButtonAntd } from 'antd';

const Button = ({
  type,
  isLoading,
  value,
  size,
  htmlType,
  icon,
  onClick,
}: Partial<IButtonProps>) => {
  return (
    <ButtonAntd 
      type={type}
      loading={isLoading}
      size={size}
      htmlType={htmlType}
      onClick={onClick}
      icon={icon}
      className='!flex items-center'
    >
      {value}
    </ButtonAntd>
  )
}

interface IButtonProps {
  value: string,
  type: "primary" | "link" | "text" | "ghost" | "default" | "dashed" | undefined,
  isLoading: boolean,
  size: 'large' | 'middle' | 'small' | undefined,
  onClick: MouseEventHandler<HTMLElement> | undefined,
  htmlType: "button" | "submit" | "reset" | undefined,
  icon: React.ReactNode,
}

Button.defaultProps = {
  type: 'primary',
  isLoading: false,
  value: '',
  size: 'middle',
  htmlType: undefined,
  icon: <></>,
  onClick: () => {},
};

export default Button