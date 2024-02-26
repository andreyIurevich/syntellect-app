import React from 'react';
import { CountryInfo } from '../../services/serverResponseInterface';

// import UI-components
import Flag from "./Flag";

type PromptProps = {
  prompt: CountryInfo,
  selectCountry: (c: string) => void,
}

const PromptView:React.FC<PromptProps> = ({ prompt, selectCountry }) => {
  const handleSelectCountry = () => {
    selectCountry(prompt.name);
  };

  return (
    <li
      className="prompt-item"
      onClick={handleSelectCountry}
    >
      <Flag src={prompt.flag} />
      <div className="prompt-text">
        <span className="prompt-text-name">{prompt.name}</span>
        <span className="prompt-text-full-name">{prompt.fullName}</span>
      </div>
    </li>
  );
}

export default PromptView;