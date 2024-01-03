import React from "react";

// The InputField component is a reusable input component that supports different input types.
export default function InputField({
  type, // Input type (e.g., 'text', 'date', 'select', 'textarea')
  name, // Name attribute for the input
  value, // Current value of the input
  onChange, // Function to call when the input's value changes
  options, // Options for the select input type
  placeholder, // Placeholder text for the input
  className, // CSS class names for styling the input
  min, // Minimum value for date input types
}) {
  // Renders a select input if the type is 'select'
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
  }
  // Renders a date input if the type is 'date'
  else if (type === "date") {
    return (
      <input
        type="date"
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        min={min}
      />
    );
  }
  // Renders a textarea if the type is 'textarea'
  else if (type === "textarea") {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      ></textarea>
    );
  }
  // For other types, renders a standard input field
  else {
    return (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        min={min}
        autoComplete="off" // Disables autocomplete for the input
      />
    );
  }
}
