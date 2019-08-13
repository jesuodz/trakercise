import React from 'react';

const HeaderSign = props => {
  return (
    <div>
      <h1 className='display-3 mb-4'>
        {props.title}
      </h1>
      <p className='lead'>
        {props.desc}
      </p>
    </div>
  );
}

export default HeaderSign;
