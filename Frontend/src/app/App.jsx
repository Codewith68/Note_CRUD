import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/global.scss";
function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState("");

  const isFormValid =
    title.trim() && description.trim() && name.trim() && age !== "";

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setName("");
    setAge("");
    setEditingId(null);
    setFormError("");
  };

  const getNotes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/notes");
    setNotes(response.data.data);
  } catch (error) {
    console.log(error);
  }
};

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setFormError("Please fill up the above requirements.");
      return;
    }

    setFormError("");

    if (editingId) {
      const updatedNote = await axios.patch(
        `http://localhost:3000/notes/${editingId}`,
        {
          title,
          description,
          name,
          age,
        }
      );
      console.log(updatedNote);
    } else {
      const newNote = await axios.post("http://localhost:3000/notes", {
        title,
        description,
        name,
        age,
      });
      console.log(newNote);
    }
    getNotes();
    resetForm();
    // e.target.reset();
  };

  const handelDelete = async (id) => {
    await axios.delete(`http://localhost:3000/notes/${id}`);
    getNotes();
  };

  const handelEdit = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setDescription(note.description);
    setName(note.name);
    setAge(note.age);
    setFormError("");
  };

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <>
      <div className="main-Page">
        <form onSubmit={handelSubmit} className="create-note-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setFormError("");
            }}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setFormError("");
            }}
          />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setFormError("");
            }}
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => {
              setAge(e.target.value);
              setFormError("");
            }}
          />
          {formError && <p className="error-message">{formError}</p>}
          <button
            className="button primary-button"
            type="submit"
          >
            {editingId ? "Save Changes" : "Create Note"}
          </button>
          {editingId && (
            <button
              className="button primary-button"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>
        <div className="notes">
          {notes.map((note) => (
            <div key={note._id} className="note">
              <button
                className="button primary-button"
                onClick={() => handelDelete(note._id)}
              >
                Delete
              </button>
              <button
                className="button primary-button"
                onClick={() => handelEdit(note)}
              >
                Edit
              </button>
              <h2 >{note.title}</h2>
              <p>{note.description}</p>
              <p>{note.name}</p>
              <p>{note.age}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
