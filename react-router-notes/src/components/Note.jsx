import {
  useParams
} from 'react-router-dom'

const Note = ({ notes }) => {
  const id = useParams().id;
  const note = notes.find(note => note.id === id);

  return (
    <div>
      <h1>{note.content}</h1>
      <div><strong>{note.important? "important": ""}</strong></div>
    </div>
  );
};

export default Note;
