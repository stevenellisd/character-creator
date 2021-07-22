import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { Fab } from '@material-ui/core';
import Character from './Character';

class App extends React.Component {
  constructor(props) {
    super(props);
    /**/
    if (localStorage.getItem('characters') !== null) {
      this.state = {
        characters: JSON.parse(localStorage.getItem('characters')),
        index: localStorage.getItem('index'),
      }
    } else {
      this.state = {
        characters: [],
        index: 0,
      };
    }
       

  }

  renderCharacter(character) {
    return (
      <Accordion style={{ margin: '8px'}}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{background: 'lightblue'}}>
          <p>{character.name}</p>
        </AccordionSummary>
        <AccordionDetails>
          <Character
          character={character}
          randomizeName={() => this.randomizeName(character.index)}
          rollSkills={() => this.rollSkills(character.index)}
          setDefaultSkills={() => this.setDefaultSkills(character.index)}
          handleNameChange={(event, i) => this.handleNameChange(event, i)}
          handleRaceChange={(event, value, i) => this.handleRaceChange(event, value, i)}
          handleClassChange={(event, value, i) => this.handleClassChange(event, value, i)} />
        </AccordionDetails>
      </Accordion>
    )
  }

  renderCharacters() {
    return this.state.characters.map((character) =>
      <div>{this.renderCharacter(character)}</div>
    );
  }

  newCharacter() {
    this.setState({
      characters: this.state.characters.concat({
        name: "Your Name",
        str: 15,
        dex: 14,
        con: 13,
        int: 12,
        wis: 10,
        cha: 8,
        class: "Bard",
        race: "Elf",
        background: "",
        index: this.state.index,
      }),
      index: this.state.index + 1,
    });
  }

  randomizeName(i) {
    const first_names = ["Adana", "Bazel", "Chavorad", "Didelot", "Elina", "Florjan", "Gelbard", "Simon"];
    const last_names = ["Ashbluff", "Belmont", "Covenbreath", "Dragoncutter", "Elfscribe"];
    const first_name = first_names[Math.floor(Math.random() * first_names.length)];
    const last_name = last_names[Math.floor(Math.random() * last_names.length)];
    const name = first_name + " " + last_name;
    let new_characters = this.state.characters;
    new_characters[i].name = name;
    this.setState({
      characters: new_characters,
    });
  }

  rollDie() {
    return Math.floor(Math.random() * 6) + 1;
  }

  skillRoll() {
    let rolls = [];
    for (let i = 0; i < 4; i++) {
      rolls.push(this.rollDie());
    }
    rolls.sort();
    return rolls[1] + rolls[2] + rolls[3];
  }

  rollSkills(i) {
    let new_characters = this.state.characters;
    new_characters[i].str = this.skillRoll();
    new_characters[i].dex = this.skillRoll();
    new_characters[i].con = this.skillRoll();
    new_characters[i].int = this.skillRoll();
    new_characters[i].wis = this.skillRoll();
    new_characters[i].cha = this.skillRoll();

    this.setState({
      characters: new_characters,
    });
  }

  setDefaultSkills(i) {
    let new_characters = this.state.characters;
    new_characters[i].str = 15;
    new_characters[i].dex = 14;
    new_characters[i].con = 13;
    new_characters[i].int = 12;
    new_characters[i].wis = 10;
    new_characters[i].cha = 8;

    this.setState({
      characters: new_characters,
    });
  }

  handleNameChange =
  (event, i) => {
      let new_characters = this.state.characters;
      new_characters[i].name = event.target.value;
      this.setState({
          characters: new_characters,
      });
  };

  handleClassChange =
  (event, value, i) => {
      let new_characters = this.state.characters;
      new_characters[i].class = value;
      this.setState({
          characters: new_characters,
      });
  };

  handleRaceChange =
  (event, value, i) => {
      let new_characters = this.state.characters;
      new_characters[i].race = value;
      this.setState({
          characters: new_characters,
      });
  };

  save() {
    localStorage.setItem('characters', JSON.stringify(this.state.characters));
    localStorage.setItem('index', this.state.index);
  }

  delete() {
    localStorage.removeItem('characters');
    localStorage.removeItem('index');
    this.setState({
      characters: [],
      index: 0,
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          {this.renderCharacters()}
        </div>
        <div style={{ position: 'absolute', right: 0, margin: 8 }}>
          <Fab color="primary" aria-label="add" onClick={() => this.newCharacter()}>
            <AddIcon />
          </Fab>
          <Fab color="primary" aria-label="add" onClick={() => this.save()} style={{margin: 8 }}>
            <SaveIcon />
          </Fab>
          <Fab color="primary" aria-label="add" onClick={() => this.delete()}>
            <DeleteIcon />
          </Fab>
        </div>

      </div>
    );
  }
}

export default App;
