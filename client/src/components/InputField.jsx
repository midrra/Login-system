import React from "react";

function InputField({ label, type, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="font-medium">{label}</label>
      <input
        className="border rounded p-2"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default InputField;
