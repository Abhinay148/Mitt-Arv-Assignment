import React from 'react';
import parse from 'html-react-parser';

const NoteDetails = ({ note, onClose }) => {
  return (
    <div className="note-details">
      <h2>{note.title}</h2>
      <div>{typeof note.description === 'string' ? parse(note.description) : note.description}</div>
      {note.image && <img src={note.image} alt="Note" />}
      {/* Add video player for video link */}
      {note.video && <video controls><source src={note.video} type="video/mp4" /></video>}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default NoteDetails;
