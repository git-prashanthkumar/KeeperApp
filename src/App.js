

import Heading from './components/Header';
import Note from './components/Note';
import Footer from './components/Footer';
import Createnote from './components/Createnote';
import { useState , useEffect} from 'react';
import axios from 'axios';



function App() {
  const[notes,setnotes]=useState([]);

  function addNote(newNote){
    axios
       .post("http://localhost:8080/notes",newNote)
       .then((response)=>{
        const savedNote=response.data;
        setnotes(prevNotes=>{
          return [...prevNotes,savedNote];
        });
       })
       .catch((error)=>{
        console.error("Error adding note",error);
       });  
     
   
  }
  function deleteNote(id){
    axios
       .delete(`http://localhost:8080/notes/${id}`)
       .then(()=>{        
        setnotes((prevNotes) => {
          return prevNotes.filter((noteItem) => noteItem.id !== id);  // Filter by the unique ID
        });
       })
       .catch((error)=>{
        console.error("Error adding note",error);
       });  
     
    // setnotes(prevNotes=>{
    //   return prevNotes.filter((noteItem,index)=>{
    //     return index!== id;
    //   })
    // })
  }
  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/notes");
      setnotes(response.data);  // Set the fetched notes to state
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // useEffect to fetch the notes when the component is mounted
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
    <Heading />
    <Createnote onAdd={addNote}/>
   { notes.map((noteItem)=> {
      return <Note
      key={noteItem.id}
      id={noteItem.id}
      title={noteItem.title} 
      content={noteItem.content} 
      onDelete={deleteNote}/>
    })}
    
    <Footer/>
     
    </div>
  );
}

export default App;
