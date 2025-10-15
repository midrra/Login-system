import React from "react";

function InputField({ label, type, name, value, onChange, placeholder,className }) {
  return (
      <input
        className={`bg-[#3b3452] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
  )
}

export default InputField;
