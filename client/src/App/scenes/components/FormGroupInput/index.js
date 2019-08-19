import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input } from 'reactstrap';
import classnames from 'classnames';

const FormGroupInput = ({
  type,
  name, 
  placeholder,
  error,
  onChange
}) => {
  return (
    <FormGroup>
      <Input
        type={type}
        name={name}
        className={classnames({'is-invalid': error})}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && (
        <div className='invalid-feedback'>{error}</div>
      )}
    </FormGroup>
  );
}

FormGroupInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default FormGroupInput;
