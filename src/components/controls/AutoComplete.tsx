import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { useDebounce } from "../../utils/helpers";
import AutoCompleteViewModel from '../../viewmodels/AutoCompleteViewModel';
import Prompt from '../ui/Prompt';
import '../../styles/autocomplete.css';

type AutoCompleteProps = {
  viewModel: AutoCompleteViewModel,
};

export default observer(({ viewModel } : AutoCompleteProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const rootRef = useRef<HTMLInputElement>(null);

  const debouncedSearchRequest = useDebounce((value) => {
    viewModel.searchCountries(value);
  }, 200);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
    debouncedSearchRequest(e.target.value);
  }

  function handleSelectCountry(searchValue: string) {
    setSearchText(searchValue);
  }

  function handleInputFocus() {
    setInputFocus(true);
  }

  function handleInputBlurFocus() {
    setInputFocus(false);
  }

  useEffect(() => {
    if (viewModel.searchResult.length) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [viewModel.searchResult])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;

      if (target instanceof Node && !rootRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="autocomplete-container">
      <div className={inputFocus ? 'input-container-focused' : 'input-container-none-focused'}>
        <input
          type="text"
          ref={rootRef}
          value={searchText}
          className="input-ctrl"
          onFocus={handleInputFocus}
          onBlur={handleInputBlurFocus}
          onInput={handleInputChange}
        />
        {viewModel.isLoading && <span className="loading"></span>}
      </div>
      <div className="prompt-container">
        {isOpen && (
          <ul className="prompt-list">
            {viewModel.searchResult.map(item =>
              <Prompt key={item.id} prompt={item} selectCountry={handleSelectCountry} />
            )}
          </ul>
        )}
      </div>
    </div>
  );
});