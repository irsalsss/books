import React, { ChangeEvent } from 'react';
import { Input as InputAntd } from 'antd';
import clsx from 'clsx';

const Input = ({
  name,
  value,
  onChange,
  className,
  wrapperClassName,
  placeholder,
  disabled,
  type,
  status,
  addonAfter
}: IInputProps) => {
  return (
    <div className={clsx('relative', wrapperClassName)}>
      <InputAntd
        aria-labelledby={name}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx('custom-ant-input', className)}
        disabled={disabled}
        status={status}
        addonAfter={addonAfter}
      />
    </div>
  );
};

interface IInputProps {
  name?: string;
  value?: string | number;
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent) => void;
  disabled?: boolean;
  type?: 'text' | 'number';
  status?: '' | 'error' | 'warning',
  addonAfter?: React.ReactNode,
}

Input.defaultProps = {
  name: '',
  value: '',
  className: '',
  wrapperClassName: '',
  placeholder: '',
  onChange: undefined,
  disabled: false,
  type: 'text',
  status: '',
  addonAfter: null,
};

export default Input;
