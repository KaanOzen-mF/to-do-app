import React from "react";

export default function InputField({
  type,
  name,
  value,
  onChange,
  options,
  placeholder,
}) {
  if (type === "select") {
    return (
      <select name={name} value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else if (type === "textarea") {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></textarea>
    );
  } else {
    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  }
}
