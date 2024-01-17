import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
	const [notes, setNotes] = useState([]);

	const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	const LOCAL_STORAGE_KEY = "statestring"

/* 	useEffect(() => {
   
		localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(notes));
 
  }, [notes]); */



  useEffect(() => {
 
	localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);





    useEffect(() => {
        const savedNotes = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEY)
        );

        if (savedNotes) {
          setNotes(savedNotes);
        }
      }, []);


	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
     console.log(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
   

	};

	return (
		<div className='kkk'>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
	);
};

export default App;