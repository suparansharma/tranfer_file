import React from 'react';

const ToggleSwitch = ({ value, setValue, onChange, checkedChildren, unCheckedChildren, label }) => {
  return (
    <>
      <h3>{label}</h3><br />
      <label className={`relative m-0 block h-7.5 w-14 rounded-full ${value ? "bg-primary" : "bg-warning"}`}>
        <input
          type="checkbox"
          onChange={() => {
            if (typeof setValue === "function") {
              setValue(!value);
              if (typeof onChange === "function") {
                onChange(!value);
              }
            }
          }}
          className="dur absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          {value ? checkedChildren : unCheckedChildren}
        </span>
      </label>
    </>
  );
};

export default ToggleSwitch;
