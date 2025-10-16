import React from "react";
import { object } from "yup";

function InputField({ type, name, value, onChange, placeholder,className ,onBlur}) {
  return (
      <input
        className={`bg-[#3b3452] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
  )
}

export default InputField;
