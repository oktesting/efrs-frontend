import React from "react";

const Select = ({ name, label, options, error, onChange, value, field }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        value={value}
        className="form-control"
      >
        <option value="">Chọn {label}</option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option[field]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
