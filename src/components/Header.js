import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { withRouter } from 'react-router';

import Search from './Search';

const linkItems = [
  { link: '/', text: 'Home' },
  { link: '/favorite', text: 'My Favorites' },
  { link: '/rate', text: 'My Rates' },
  { link: '/discover', text: 'Discover' },
  { link: '/about', text: 'About' },
];

function Header({ location: { pathname } }) {
  const renderLinkItems = () => linkItems.map(({ link, text }) => (
    <li className={`nav-item ${clsx(pathname === link && 'active')}`} key={link}>
      <Link className="nav-link" to={link}>{text}</Link>
    </li>
  ));

  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link className="navbar-brand" to="/">MovieDB Searcher</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            {renderLinkItems()}
          </ul>
          <Search />
        </div>
      </nav>
    </header>
  );
}

export default withRouter(React.memo(Header));
