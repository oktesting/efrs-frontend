import React from "react";

const Input = ({ name, label, value, error, onChange, type }) => {
  return (
    <div className="form-label-group">
      <input
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        type={type}
        placeholder={name}
        className="form-control"
      />
      <label htmlFor={name}>{label}</label>
      {/* if error is truthy => display alert */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
