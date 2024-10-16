import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function Createnote(props){

    const [isExpanded,setExpanded]=useState(false);
    const [note,setNote]=useState({
        title:"",
        content:""
    });

    function handleChange(event){
      const{name,value} =event.target;

      setNote(prevNote=>{
        return{
            ...prevNote,
            [name]:value
        }
      })
    }
    function handleClick(event){
        
       props.onAdd(note);
    //    submitNote(note);
       setNote({
        title:"",
        content:""
       });
       event.preventDefault();
    }

    function expand(){
        setExpanded(true);
    }

    // function submitNote(newNote){
       
    //      axios.post('http://localhost:8080/notes',newNote)
    //      .then(response =>{
    //         console.log("Note added successfully",response.data);
    //      })
    //      .catch(error=>{
    //         console.error("error adding note",error);
    //      })
    // }

    return(
        <div>
        <form className="create-note">

            {isExpanded && (<input name="title"
             onChange={handleChange} 
             value={note.title}
              placeholder="Title"/> )}

            

            <textarea name="content" 
            onChange={handleChange} 
            onClick={expand}
            value={note.content}
            placeholder="Take a note..." 
            rows={isExpanded? 3:1}/>
            <Zoom in={isExpanded}>
            <Fab onClick={handleClick} ><AddIcon/></Fab>
            </Zoom>
        </form>
        </div>
    );
}

export default Createnote;