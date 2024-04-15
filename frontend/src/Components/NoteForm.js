import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const NoteForm = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');
  const editorRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.trim() !== '' && description.trim() !== '') {
      const formData = { title, description, image, video };
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/notes/addnotes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          onSubmit(data); // Assuming onSubmit expects the added note data
          // Reset form fields
          setTitle('');
          setDescription('');
          setImage('');
          setVideo('');
          window.location.reload();
        } else {
          console.error('Failed to add note');
          // Handle error if needed
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error if needed
      }
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.value);
  };

  useEffect(() => {
    const editorElement = editorRef.current?.editor?.root;
    if (editorElement) {
      const observer = new MutationObserver(() => {
      });
  
      observer.observe(editorElement, {
        childList: true,
        subtree: true, 
      });
  
      return () => {
        observer.disconnect();
      };
    }
  }, []);
  
  
  return (
    <div className="note-form">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <ReactQuill 
          ref={editorRef}
          placeholder="Description" 
          value={description} 
          onChange={setDescription} 
          modules={{ toolbar: true }} // Enable toolbar
        />
        <input type="text" placeholder="Image link" value={image} onChange={handleImageChange} />
        <input type="text" placeholder="Video link" value={video} onChange={handleVideoChange} />
        <button type="submit" className="note-submit">Add Note</button>
        <button type="button" onClick={onClose} className="note-cancel">Cancel</button>
      </form>
    </div>
  );
};

export default NoteForm;
