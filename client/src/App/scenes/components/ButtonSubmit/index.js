import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const ButtonSubmit = ({ content }) => {
  return (
    <Button
      type="submit"
      color="primary"
      outline
    >
    {content}
    </Button>
  );
}

ButtonSubmit.propTypes = {
  content: PropTypes.string.isRequired
}

export default ButtonSubmit;
