import { useState } from "react";
import './Todo.css'

export default function Todo({ ele, onUpdate, onDelete }) {
    const [isEdit, setIsEdit] = useState(false)

    function FormEdit() {
        const[newValue, setNewValue] = useState(ele.title);

        function handleSubmit(e) {
            e.preventDefault();
        }
        function handleChange(e){
            setNewValue(e.target.value)
        }
        function handleClick(){
            onUpdate(ele.id, newValue);
            setIsEdit(false)
        }

        return (
            <form className="updateForm" onSubmit={handleSubmit}>
                <input type="text"  onChange={handleChange} value={newValue}/>
                <button className="todoButton" onClick={handleClick}>Actualizar</button>
            </form>
        )
    }

    function TodoElement() {
        return (
            <div className="todoInfo">
                <span className="todoText">{ele.title}</span>
                <button className="todoButton" onClick={() => setIsEdit(true)}>Editar</button>
                <button className="todoButtonDelete" onClick={(e) => onDelete(ele.id)}>Eliminar</button>
            </div>
        )
    }
    return (
        <>
            <div className="todo">
                {isEdit ? <FormEdit /> : <TodoElement />}
            </div>
        </>
    )
}
