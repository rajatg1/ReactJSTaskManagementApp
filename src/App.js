import React, { Component } from 'react';
import Note from './Note/Note.jsx';
import NoteForm from './NoteForm/NoteForm.jsx';
import { DB_CONFIG } from './Config/Config.js';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';
//import AppBarTest from './HeaderBar/HeaderBar.jsx';

class App extends Component {
  constructor(props){
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('notes');

    // We are going to setup the React state for our components
    this.state = {
      notes: [],
    }
  }

  componentWillMount(){
    const previousNotes = this.state.notes;

    // Data Snapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      this.setState({
        notes: previousNotes
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++) {
        if(previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }

  addNote(note) {
    // push note onto the note array
    this.database.push().set({noteContent: note});
  }

  removeNote(noteId) {
    // push note onto the note array
    this.database.child(noteId).remove();
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">Metis Backlog</div>
        </div>
        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return(
                <Note noteContent={note.noteContent} noteId={note.id}
                  key={note.id} removeNote={this.removeNote}/>
              )
            })
          }
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote}/>
        </div>
      </div>
    );
  }
}

export default App;
