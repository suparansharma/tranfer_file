import { Input } from 'antd';
import { debounce } from 'lodash';
import { useCallback } from 'react';

const DebouncedSearchInput = (props) => {
  const { placeholder, onChange, delay, ...rest } = props;

  const searchFieldHandler = (e) => {
    onChange(e.target.value);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(debounce(searchFieldHandler, delay || 500), []);

  return (
    <>
      <Input
        type="text"
        placeholder={placeholder || ''}
        onChange={debounceSearch}
        style={{ width: '300px' }} // Adjust the width as per your requirement
        {...rest}
      />
    </>
  );
};

export default DebouncedSearchInput;
