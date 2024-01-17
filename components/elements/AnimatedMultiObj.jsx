import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const AnimatedMulti = ({ options, labelKey, valueKey, onChange, selectedValues }) => {
  // Ensure options is an array and not undefined
  const transformOptions = (options) => {
    return Array.isArray(options)
      ? options.map((option) => ({
          label: option[labelKey],
          value: option[valueKey],
        }))
      : [];
  };

  const transformedOptions = transformOptions(options);

  const handleChange = (selectedOptions) => {
    if (onChange) {
      onChange(selectedOptions);
    }
  };

  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={transformedOptions}
      onChange={handleChange}
      value={selectedValues}  // Set the value prop with the selected values directly
    />
  );
};

export default AnimatedMulti;
