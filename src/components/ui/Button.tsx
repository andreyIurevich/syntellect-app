import React from 'react';

// import styles
import '../../styles/button.css';

type ButtonProps = {
  value: string,
  callback: () => void,
}

const Button = ({ value, callback }: ButtonProps) => {
  return <button className="button-ctrl" onClick={callback}>{value}</button>
}

export default Button;