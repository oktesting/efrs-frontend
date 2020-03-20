import React from "react";

const TextArea = ({ name, label, value, error, onChange }) => {
  return (
    <div className="form-label-group">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="form-control"
      />
      {/* if error is truthy => display alert */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
