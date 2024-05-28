import { useState } from 'react';
import '@/styles/campaign-searchbar-styles.css';
import search from '@/assets/search.svg';

const CampaignSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-bar-container">
      <img
        src={search}
        alt="search"
        className="search-icon"
      />
      <input
        className="search-input"
        placeholder="Search campaigns"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default CampaignSearchBar;
