import React, {Component} from 'react';
import './NoteForm.css';

class NoteForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      newNoteContent: '',
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }

  // When user input changes, set newNotecontent to value present in input box
  handleUserInput(e) {
    this.setState({
      newNoteContent: e.target.value, // text input value
    })
  }


  writeNote() {
    // sets taskContent for task to the entered input value
    this.props.addNote(this.state.newNoteContent);
    // set newNoteContent back to an empty string
    this.setState({
      newNoteContent: '',
    })
  }

  render(){
    return(
      <div>
        <input className="noteInput"
        placeholder="Write a new task..."
        value={this.state.newNoteContent}
        onChange={this.handleUserInput} />
      <button className="noteButton"
        onClick={this.writeNote}>Add Task</button>

      </div>
    )
  }
}

export default NoteForm;
