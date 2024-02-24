import React, { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react';
import { nanoid } from 'nanoid';
import { useDebounce } from "../utils/helpers";
import AutoCompleteViewModel from '../viewmodels/AutoCompleteViewModel';

type AutoCompleteProps = {
  viewModel: AutoCompleteViewModel,
};

export default observer(({ viewModel } : AutoCompleteProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    if (viewModel.searchResult.length) {
      setIsOpen(true);
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
      <input type="text" ref={rootRef} value={searchText} onInput={handleInputChange} />
      <div className="prompt-container">
        {isOpen && (
          <ol className="prompt-list">
            {viewModel.searchResult.map(item =>
              <li key={nanoid()} onClick={() => handleSelectCountry(item.name)}>{item.name}</li>
            )}
          </ol>
        )}
      </div>
    </div>
  );
});