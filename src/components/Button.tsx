import React from 'react';

type ButtonProps = {
  value: string,
  callback: () => void,
}

const Button = ({ value, callback }: ButtonProps) => {
  return <button onClick={callback}>{value}</button>
}

export default Button;