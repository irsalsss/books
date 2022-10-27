import React from 'react';

export default function useDebounceValue(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    },
    [value] 
  );

  return debouncedValue;
}