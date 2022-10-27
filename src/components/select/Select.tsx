import React, { useRef } from 'react';
import { Select as SelectAntd } from 'antd';
import type { BaseSelectRef } from 'rc-select';
import clsx from 'clsx';

const { Option } = SelectAntd;

const Select = ({
  onChange,
  onClear,
  onSearch,
  placeholder,
  selectClassName,
  wrapperClassName,
  dropdownClassName,
  options,
  value,
  size,
}: ISelectProps) => {
  const selectRef = useRef<BaseSelectRef>(null);
  const filterOption = (input: any, option: any) => {
    const key = (option?.key || '').toLowerCase();
    return key.indexOf(input.toLowerCase()) >= 0;
  };

  const handleChange = (e: string) => {
    onChange!(e);
    setTimeout(() => {
      const typeBlur = typeof selectRef?.current?.blur;
      if (typeBlur === 'function') {
        selectRef?.current?.blur();
      }
    }, 20);
  };

  return (
    <div className={clsx('custom-ant-input-select', wrapperClassName)}>
      <SelectAntd
        ref={selectRef}
        showSearch
        placeholder={placeholder}
        optionFilterProp="label"
        onClear={onClear}
        onChange={handleChange}
        onSearch={onSearch}
        filterOption={filterOption}
        className={selectClassName}
        value={value}
        dropdownClassName={`${dropdownClassName} custom-ant-input-select-dropdown z-[10]`}
        size={size}
      >
        {options.map((opt) => (
          <Option key={opt.value} value={opt.value}>{opt.label}</Option>
        ))}
      </SelectAntd>
    </div>
  );
};

interface ISelectProps {
  selectClassName?: string;
  wrapperClassName?: string;
  dropdownClassName?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  options: { value: string | number, label: string }[];
  value?: string;
  size?: 'large' | 'middle' | 'small';
}

Select.defaultProps = {
  selectClassName: '',
  wrapperClassName: '',
  dropdownClassName: '',
  placeholder: '',
  onChange: undefined,
  onSearch: undefined,
  onClear: () => {},
  value: undefined,
  size: 'middle',
};

export default Select;
