import React from "react";
import { Button } from "primereact/button"
import { header } from "../constant-text/text.js";
import 'primeicons/primeicons.css';

const Header = (props) => {
  const { downloadApp, isReadyForInstall } = props;
  return (
    <header className="App-header" >
      <h1 className="Header-title" >{header.title.toUpperCase()}</h1>
      {isReadyForInstall &&
        <div>
          <Button onClick={downloadApp}
            className="Button">
            <i className="pi pi-download Button-icon" />
          </Button>
        </div>}
    </header>
  );
}

export default Header;