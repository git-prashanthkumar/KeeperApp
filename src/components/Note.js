import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
function Note(props){
    function handleDelete(){
        props.onDelete(props.id);
        removeNote(props.id);
    }
    function removeNote(id){
       axios.delete('http://localhost:8080/notes',id)
        .then(response =>{
           console.log("Note deleted successfully",response.data);
        })
        .catch(error=>{
           console.error("error deleting note",error);
        })
    }
    return (
        <div className="note">
            
            
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={handleDelete}><DeleteIcon/></button>
        </div>
    )
}

export default Note;