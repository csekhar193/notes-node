const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')
const title =   {
			 		describe: 'Title a note.',
			 		demand: true,
			 		alias: 't' 
			 	};
const body =    {
			 		describe: 'Discribe the note.',
			 		demand: true,
			 		alias: 'b'
			 	}

const argv = yargs
			 .command('add', 'Add a new note', {
			 	title,
			 	body
			 })
			 .command('list', 'Fetch all notes.')
			 .command('read', 'Read a note',{
			 	title
			 })
			 .command('remove', 'Remove a note',{
			 	title 
			 })
			 .help()
			 .argv;
let command = argv._[0];

switch (command) {
	case 'add':
		let note = notes.addNote(argv.title, argv.body);
		_.size(note) ? console.log("Title: "+note.title+"\n Body: "+note.body) : console.log('Error: This note already exists.');
		break;
	case 'list':
		let allNotes = notes.getAll();
		_.forEach(allNotes, (note) => {
			console.log("Title: "+note.title+"\n Body: "+note.body);
		});
		break;
	case 'read':
		let noteFiltered = notes.getNote(argv.title);
		var message = noteFiltered ? "Title: "+noteFiltered.title+"\n Body: "+noteFiltered.body : "Note not found";
		console.log(message);
		break;
	case 'remove':
		let noteRemoved = notes.removeNote(argv.title);
		var message = noteRemoved ? "Note was Removed" : "Note not found";
		console.log(message);
		break;
	default:
		console.log('Command not recognized');
		break;
}
 