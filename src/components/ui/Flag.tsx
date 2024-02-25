import React from 'react';
import defaultFlag from '../../assets/defaultFlag.png';

import '../../styles/flag.css';

type FlagProps = {
  src: string,
}
const Flag: React.FC<FlagProps> = React.memo(({ src }) => {
  const [error, setError] = React.useState(false);

  const handleError = () => {
    setError(true);
  }

  const imgSrc = error ? defaultFlag : src;

  return (
    <div className="flag-container">
      <img className="country-flag" src={imgSrc} onError={handleError} />
    </div>
  );
});

export default Flag;