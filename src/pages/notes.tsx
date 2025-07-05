import React, { useEffect, useRef, useState } from 'react';
import { NoteNavbar } from '../../components/Navbar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Note {
  id: string;
  content: string;
  color: string;
}

function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const notesRef = useRef<HTMLDivElement>(null); // 👈 ref to capture notes

  useEffect(() => {
    const saved = localStorage.getItem('note');
    if (saved) {
      setNotes(JSON.parse(saved));
    } else {
      handleNewNote();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('note', JSON.stringify(notes));
  }, [notes]);

  const handleNewNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      content: '',
      color: '#fff8dc',
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleNoteChange = (id: string, newContent: string) => {
    const updated = notes.map((note) =>
      note.id === id ? { ...note, content: newContent } : note
    );
    setNotes(updated);
  };

  const handleColorChange = (id: string, newColor: string) => {
    const updated = notes.map((note) =>
      note.id === id ? { ...note, color: newColor } : note
    );
    setNotes(updated);
  };

  const handleDelete = (id: string) => {
    const updated = notes.filter((note) => note.id !== id);
    setNotes(updated);
  };

  const handleExport = () => {
    if (!notesRef.current) return;

    html2canvas(notesRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('my-notes.pdf');
    });
  };

  return (
    <>
      <NoteNavbar />
      <div className='notesmaincontainer'>
        <div className='c1'>
          <h1>Quick Notes</h1>
          <div className="button-column">
            <button onClick={handleExport}>Export</button>
            <button onClick={handleNewNote}>Create A New Note</button>
          </div>
        </div>

        <div ref={notesRef}> {/* 👈 this is the exportable container */}
          <ul>
            {notes.map((note) => (
              <li key={note.id} style={{ position: 'relative' }}>
                <textarea
                  className='noteslist'
                  value={note.content}
                  onChange={(e) => handleNoteChange(note.id, e.target.value)}
                  style={{ backgroundColor: note.color }}
                  placeholder='Save your notes here...'
                />
                <input
                  type='color'
                  value={note.color || '#fff8dc'}
                  onChange={(e) => handleColorChange(note.id, e.target.value)}
                  className='color-picker'
                />
                <button onClick={() => handleDelete(note.id)}
                    className='deletenotebutton'>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Notes;
