import React from 'react';
import parse from 'html-react-parser';

const Note = ({ note, onClick }) => {
  return (
    <div className="note" onClick={onClick}>
      <h3>{note.title}</h3>
      <div>{typeof note.description === 'string' ? parse(note.description) : note.description}</div>
      {note.image && <img src={note.image} alt="Note" />}
    </div>
  );
};

export default Note;
