import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import Select from "./select";
import TextArea from "./textarea";
class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = {
      abortEarly: false
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    error.details.forEach(item => {
      errors[item.path[0]] = item.message;
    });
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    //if errors is null => set it to empty object
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };
  renderButton = label => {
    return (
      <button
        // if validate() return null => falsy
        // otherwise => truthy
        disabled={this.validate()}
        className="btn btn-lg btn-primary btn-block"
      >
        {label}
      </button>
    );
  };
  renderInput = (name, label, type) => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
        label={label}
        type={type}
      />
    );
  };

  renderTextArea = (name, label) => {
    const { data, errors } = this.state;
    return (
      <TextArea
        name={name}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
        label={label}
      />
    );
  };

  renderSelect = (name, label, options, field) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        field={field}
        options={options}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
