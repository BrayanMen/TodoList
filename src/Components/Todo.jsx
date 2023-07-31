import { useState } from "react";
import './Todo.css'
import PropTypes from 'prop-types';


export default function Todo({ ele, onUpdate, onDelete, toggleTask }) {
    Todo.propTypes = {
        ele: PropTypes.object.isRequired,
        onUpdate: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        toggleTask: PropTypes.func.isRequired,
      };

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
            <td>
            <form className="updateForm" onSubmit={handleSubmit}>
                <input type="text"  onChange={handleChange} value={newValue}/>
                <button className="todoButton" onClick={handleClick}>Actualizar</button>
            </form>
            </td>
        )
    }

    function TodoElement() {
        return (
            <td className="todoInfo">
                <span className="todoText">{ele.title}</span>
                <input 
                type="checkbox" 
                checked={ele.done}
                onChange={()=>toggleTask(ele)}
                />
                <button 
                className="todoButton" 
                onClick={() => setIsEdit(true)}>Editar</button>
                <button 
                className="todoButtonDelete" 
                onClick={() => onDelete(ele.id)}>Eliminar</button>
            </td>
        )
    }
    return (
        <>
        <tr className="todo">            
                {isEdit ? 
                <FormEdit /> 
                : 
                <TodoElement />}        
        </tr>
        </>
    )
}
