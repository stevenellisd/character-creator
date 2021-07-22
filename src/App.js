import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import Character from './Character';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div>
          <Character/>
        </div>
      </div>

    );
  }
}

export default App;
