import React from 'react';
import { Link } from 'react-router-dom'

const ButtonLink = props => {
  return (
    <Link className={props.styles} to={props.href} >
      {props.content}
    </Link>
  );
};

export default ButtonLink;
