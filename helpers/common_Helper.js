export const mapArrayToDropdown = (arr, label, value) => {
    const dropdown = arr?.map((item) => ({ ...item, label: item[label], value: item[value] }));
    return dropdown;
  };