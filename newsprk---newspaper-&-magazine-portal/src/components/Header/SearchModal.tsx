import React, { useState } from 'react';
import { Icon } from '../common/Icon';

interface SearchModalProps {
  setSearchShow: (show: boolean) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ setSearchShow }) => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      // search handler
      alert(`Searching for: ${keyword}`);
      setKeyword('');
      setSearchShow(false);
    }
  };

  return (
    <div className="searching active">
      <div className="container">
        <div className="row">
          <div className="col-8 text-center m-auto">
            <div className="v1search_form">
              <form onSubmit={handleSubmit}>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  type="search"
                  placeholder="Search Here..."
                  autoFocus
                />
                <button type="submit" className="cbtn1">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="close_btn" onClick={() => setSearchShow(false)}>
        <Icon name="times" />
      </div>
    </div>
  );
};

export default SearchModal;
