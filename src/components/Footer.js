import React from 'react';

function Footer() {
  return (
    <footer className="container">
      <p className="float-right">
        <a href="#">Back to top</a>
      </p>
      <p>
&copy; 2019 - Tai Do - For educational purpose only &middot;
      </p>
    </footer>
  );
}

export default React.memo(Footer);
