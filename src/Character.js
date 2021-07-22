import React from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';

class Character extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        };
    }

    getName() {
        return this.state.name;
    }

    handleNameChange =
        (event) => {
            this.setState({
                name: event.target.value,
            });
        };

    render() {
        const classes = ["Bard", "Cleric", "Druid", "Fighter"];
        const races = ["Dwarf", "Elf", "Gnome", "Human"];
        console.log(this.props.character);

        return (
            <div>
                <div>
                    <TextField required id="name" label="Name" value={this.props.character.name} onChange={ (event) => this.props.handleNameChange(event, this.props.character.index)} />
                </div>
                <div>
                    <Button style={{margin: '4px'}} variant="contained" color="primary" onClick={() => this.props.randomizeName(this.props.character.index)}>Randomize Name</Button>
                </div>
                <div>
                    <TextField id="str" label="Strength" value={this.props.character.str} />
                </div>
                <div>
                    <TextField id="dex" label="Dexterity" value={this.props.character.dex} />
                </div>
                <div>
                    <TextField id="con" label="Constitution" value={this.props.character.con} />
                </div>
                <div>
                    <TextField id="int" label="Intelligence" value={this.props.character.int} />
                </div>
                <div>
                    <TextField id="wis" label="Wisdom" value={this.props.character.wis} />
                </div>
                <div>
                    <TextField id="cha" label="Charisma" value={this.props.character.cha} />
                </div>
                <div>
                    <Button style={{margin: '4px'}} variant="contained" color="primary" onClick={() => this.props.rollSkills(this.props.index)}>Roll Skills</Button>
                </div>
                <div>
                    <Button style={{margin: '4px'}} variant="contained" color="primary" onClick={() => this.props.setDefaultSkills(this.props.index)}>Default Skills</Button>
                </div>
                <div>
                    <Autocomplete
                        id="class"
                        freeSolo
                        options={classes}
                        getOptionLabel={(option) => option}
                        style={{ width: 300, margin: 8 }}
                        onInputChange={ (event, value) => this.props.handleClassChange(event, value, this.props.character.index)}
                        value={this.props.character.class}
                        renderInput={(params) => <TextField {...params} label="Class" variant="outlined" value={this.props.character.class}  />}
                    />
                </div>
                <div>
                    <Autocomplete
                        id="race"
                        freeSolo
                        options={races}
                        getOptionLabel={(option) => option}
                        style={{ width: 300, margin: 8 }}
                        onInputChange={ (event, value) => this.props.handleRaceChange(event, value, this.props.character.index)}
                        value={this.props.character.race}
                        renderInput={(params) => <TextField {...params} label="Race" variant="outlined" value={this.props.character.race}  />}
                    />
                </div>
            </div>
        )
    }
}

export default Character;
