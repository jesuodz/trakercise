import React from 'react';
import { Button } from 'reactstrap';

const ButtonSubmit = props => {
  return (
    <Button
      type="submit"
      color="primary"
      outline
    >
    {props.content}
    </Button>
  );
}

export default ButtonSubmit;
