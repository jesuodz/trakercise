import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const ButtonLink = ({styles, href, text}) => {
  return (
    <Link className={styles} to={href} >
      {text}
    </Link>
  );
};

ButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
  styles: PropTypes.string,
  text: PropTypes.string.isRequired
}

export default ButtonLink;
