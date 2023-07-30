import { useState } from "react"
import './TodoApp.css'
import Todo from "./Todo";

function TodoApp() {
    const[text, setText]= useState('');
    const[todo, setTodo]= useState([])

    function handleTextChange(e){
        e.preventDefault();
        setText(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        const newTodo ={
            id: crypto.randomUUID(),
            title: text
        };
        const temp = [...todo];
        temp.unshift(newTodo)
        setTodo(temp)
        setText('')
    }

    function handleUpdate(id, value){
        const temp = [...todo];
        const item = temp.find(e => e.id === id)
        item.title = value;
        setTodo(temp);
    }

    function handleDelete(id){
        const temp = todo.filter(e => e.id !== id);
        setTodo(temp)
    }

  return (
    <div className="todoContainer">
        <form className='todoForm' onSubmit={handleSubmit}>
            <input onChange={handleTextChange} 
            className='todoInput' type="text" 
            value={text}/>
            <input onClick={handleSubmit}
            className='todoButtom' 
            type="submit" 
            value='Crear Tarea' />
        </form>
        <div className="todosContainer">
            {todo.map((ele)=>(
                <Todo key={ele.id} ele={ele} onUpdate={handleUpdate} onDelete={handleDelete}/>
            ))}
        </div>
    </div>
  )
}

export default TodoApp