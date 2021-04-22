import React from 'react';

function Footer() {
  return (
    <footer className="container">
      <p className="float-right">
        <a href="#">Back to top</a>
      </p>
      <p>
		Made with &love by Daryl Ebinum&copy; 2021;
      </p>
    </footer>
  );
}

export default React.memo(Footer);
