import { useState } from 'react';

function Dropdown(props) {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <button
        className="material-icons floating-btn"
        onClick={() => {
          setOpenDropdown(!openDropdown);
        }}
      >
        {openDropdown ? 'remove' : 'add'}
      </button>
      {openDropdown && (
        <>
          <button
            className="material-icons floating-btn-1"
            onClick={() => {
              props.fontInc();
            }}
          >
            text_increase
          </button>
          <button
            className="material-icons floating-btn-2"
            onClick={() => {
              props.fontDec();
            }}
          >
            text_decrease
          </button>
          <button
            className="material-icons floating-btn-3"
            onClick={() => {
              props.func();
            }}
          >
            mode_edit
          </button>
        </>
      )}
    </div>
  );
}

export default Dropdown;
