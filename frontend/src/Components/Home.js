import React, { useState, useEffect } from 'react';
import Note from './Note';
import NoteDetails from './NoteDetails';
import NoteForm from './NoteForm';
import FloatingButton from './FloatingButton';

const Home = () => {
  // State to manage notes
  const [notes, setNotes] = useState([]);
  // State to manage selected note for details view
  const [selectedNote, setSelectedNote] = useState(null);
  // State to manage form visibility
  const [showForm, setShowForm] = useState(false);
  // State to manage filter option
  const [filterOption, setFilterOption] = useState('');
  // State and handler for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle adding a new note
  const handleAddNote = (formData) => {
    setNotes([...notes, formData]);
    setShowForm(false);
  };

  // Function to handle selecting a note for details view
  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  // Function to fetch user notes from the backend
  const fetchUserNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/notes/fetchusernotes', {
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        }
      });
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      } else {
        throw new Error('Failed to fetch notes');
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchUserNotes();
  }, []);

  // Function to filter and sort notes
  const filteredAndSortedNotes = () => {
    let filteredNotes = notes;

    // Filter notes based on search query
    if (filterOption === '' && searchQuery !== '') {
      filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort notes based on filter option
    switch (filterOption) {
      case 'time':
        filteredNotes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'az':
        filteredNotes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filteredNotes;
  };

  return (
    <div className="homepage">
      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by project title"
          className="search-input"
        />
      </div>
      {/* Filter dropdown */}
      <div className="filter-container">
        <select
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
          className="filter-dropdown"
        >
          <option value="">Select filter</option>
          <option value="time">Sort by time</option>
          <option value="az">Sort A-Z</option>
        </select>
      </div>
      <div className="notes-container">
        {/* Render filtered and sorted notes */}
        {filteredAndSortedNotes().map((note, index) => (
          <Note key={index} note={note} onClick={() => handleNoteClick(note)} />
        ))}
      </div>
      {/* Render selected note details */}
      {selectedNote && <NoteDetails note={selectedNote} onClose={() => setSelectedNote(null)} />}
      {/* Render note form */}
      {showForm && <NoteForm onSubmit={handleAddNote} onClose={() => setShowForm(false)} />}
      {/* Render floating button */}
      <FloatingButton onClick={() => setShowForm(true)} />
    </div>
  );
};

export default Home;
