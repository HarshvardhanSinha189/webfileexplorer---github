// Filecard.js
import React from 'react';

const Filecard = (props) => {
  return (
      <div className="filecard">
        <div className="filecardimage">
          <img src="https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png" alt="hi" />
        </div>
        <div className="fileName">
          <p>{props.file}</p>
        </div>
      </div>
  );
};

export default Filecard;
