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

    randomizeName() {
        const first_names = ["Adana", "Bazel", "Chavorad", "Didelot", "Elina", "Florjan", "Gelbard", "Simon"];
        const last_names = ["Ashbluff", "Belmont", "Covenbreath", "Dragoncutter", "Elfscribe"];
        const first_name = first_names[Math.floor(Math.random()*first_names.length)];
        const last_name = last_names[Math.floor(Math.random()*last_names.length)];
        this.setState({
            name: first_name + " " + last_name,
          }); ;
    }

    rollDie() {
        return Math.floor(Math.random() * 6) + 1;
    }

    skillRoll() {
        let rolls = [];
        for(let i = 0; i<4; i++) {
            rolls.push(this.rollDie());
        }
        rolls.sort();
        return rolls[1] + rolls[2] + rolls[3];
    }

    rollSkills() {
        this.setState({
            str: this.skillRoll(),
            dex: this.skillRoll(),
            con: this.skillRoll(),
            int: this.skillRoll(),
            wis: this.skillRoll(),
            cha: this.skillRoll(),
        });
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

        return (
            <div>
                <div>
                    <TextField required id="name" label="Name" value={this.state.name} onChange={this.handleNameChange} />
                    <Button variant="contained" color="primary" onClick={() => this.randomizeName()}>Randomize Name</Button>
                </div>
                <div>
                    <TextField id="str" label="Strength" value={this.state.str} />
                </div>
                <div>
                    <TextField id="dex" label="Dexterity" value={this.state.dex} />
                </div>
                <div>
                    <TextField id="con" label="Constitution" value={this.state.con} />
                </div>
                <div>
                    <TextField id="int" label="Intelligence" value={this.state.int} />
                </div>
                <div>
                    <TextField id="wis" label="Wisdom" value={this.state.wis} />
                </div>
                <div>
                    <TextField id="cha" label="Charisma" value={this.state.cha} />
                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={() => this.rollSkills()}>Roll Skills</Button>
                </div>
                <div>
                    <Autocomplete
                        id="class"
                        options={classes}
                        getOptionLabel={(option) => option}
                        style={{ width: 300, margin: 8 }}
                        renderInput={(params) => <TextField {...params} label="Class" variant="outlined" />}
                    />
                </div>
                <div>
                    <Autocomplete
                        id="class"
                        options={races}
                        getOptionLabel={(option) => option}
                        style={{ width: 300, margin: 8 }}
                        renderInput={(params) => <TextField {...params} label="Race" variant="outlined" />}
                    />
                </div>
            </div>
        )
    }
}

export default Character;
