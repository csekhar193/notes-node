const fs = require('fs');

let fetchNotes = () => {
	try{
		let notesString = fs.readFileSync('notes-data.json');	
		notes = JSON.parse(notesString);
		return notes;
	} catch(e) {
		return [];
	}
}

let saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

let addNote = (title, body) => {
	let notes = getAll();
	let note = {
		title,
		body
	}

	let duplicateNotes = notes.filter((note) => note.title === title);

	if(duplicateNotes.length===0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}
	
}

let getAll = () =>{
	return fetchNotes();
}

let getNote = (title) => {
	let notes = getAll();
	let note = notes.filter((note) => note.title === title);
	return note.length ? note[0] : '';
}

let removeNote = (title) => {
	let notes = getAll();
	let filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);
	return notes.length !== filteredNotes.length;
}

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
}