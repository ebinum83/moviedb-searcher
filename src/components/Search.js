import React, { useState } from 'react';
import { withRouter } from 'react-router';

function Search({ history, fullWidth }) {
  const [terms, setTerms] = useState('');

  const onTermsChange = (e) => {
    setTerms(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    history.push(`/search/${terms}`);
  };

  const shouldFullWidth = fullWidth ? { flex: 1 } : null;

  return (
    <form className="form-inline mt-2 mt-md-0">
      <input style={shouldFullWidth} className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" value={terms} onChange={onTermsChange} />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={onSearch}>Search</button>
    </form>
  );
}

export default withRouter(React.memo(Search));
