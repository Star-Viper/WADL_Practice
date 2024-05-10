import React, { useState } from 'react';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({ email: '', password: '' });
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let emailValid = emailValid;
    let passwordValid = passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid? '' : 's invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid? '' : 's too short';
        break;
      default:
        break;
    }
    setFormErrors(fieldValidationErrors);
    setEmailValid(emailValid);
    setPasswordValid(passwordValid);
    validateForm();
  };

  const validateForm = () => {
    setFormValid(emailValid && passwordValid);
  };

  const handleSubmit = (event) => {
    if (formValid) {
      console.log('Form is valid');
    } else {
      alert('Form is invalid');
    }
    event.preventDefault();
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case 'email':
        setEmail(value);
        validateField(name, value);
        break;
      case 'password':
        setPassword(value);
        validateField(name, value);
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email address:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
        />
        <span className="text-danger">{formErrors.email}</span>
      </div>
      <div className="form-group">
        <label htmlFor="pwd">Password:</label>
        <input
          type="password"
          className="form-control"
          id="pwd"
          name="password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
        />
        <span className="text-danger">{formErrors.password}</span>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default Form;

