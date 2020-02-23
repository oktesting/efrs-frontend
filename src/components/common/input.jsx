import React from "react";

const Input = ({ name, label, value, error, onChange, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        id={name}
        type={type}
        className="form-control"
      />
      {/* if error is truthy => display alert */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
