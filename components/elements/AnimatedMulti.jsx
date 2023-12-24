import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const AnimatedMulti = ({ options, labelKey, valueKey, onChange, selectedValues }) => {
  const transformOptions = (options) => {
    return options.map((option) => ({
      label: option[labelKey],
      value: option[valueKey],
    }));
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
      value={transformedOptions.filter((option) => selectedValues && selectedValues.includes(option.value))}
    />
  );
};

export default AnimatedMulti;
