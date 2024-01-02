import React from "react";

export default function InputField({
  type,
  name,
  value,
  onChange,
  options,
  placeholder,
  className,
  min,
}) {
  if (type === "select") {
    return (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else if (type === "date") {
    return (
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        min={min} // Add the min attribute
      />
    );
  } else if (type === "textarea") {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
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
        className={className}
        min={min}
      />
    );
  }
}
