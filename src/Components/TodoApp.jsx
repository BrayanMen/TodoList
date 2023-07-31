import { useEffect, useState } from "react"
import './TodoApp.css'
import './Todo.css'
import Todo from "./Todo";

function TodoApp() {
    const [text, setText] = useState('');
    const [todo, setTodo] = useState([]);
    const [show, setShow] = useState(false)

    function handleTextChange(e) {
        e.preventDefault();
        setText(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        const newTodo = {
            id: crypto.randomUUID(),
            title: text,
            done: false,
        };
        const temp = [...todo];
        temp.unshift(newTodo)
        setTodo(temp)
        setText('')
    }

    function handleUpdate(id, value) {
        const temp = [...todo];
        const item = temp.find(e => e.id === id)
        item.title = value;
        setTodo(temp);
    }

    function handleDelete(id) {
        const temp = todo.filter(e => e.id !== id);
        setTodo(temp)
    }

    function handleClear() {
        const temp = todo.filter(e => !e.done);
        if (window.confirm('¿Estas seguro de borrar las tareas terminadas?')) {
            setTodo(temp);
            setShow(false)
        }
    }

    function toggleTask(task) {
        setTodo(
            todo.map((e) => (e.id == task.id ? { ...e, done: !e.done } : e))
        )
    }

    useEffect(() => {
        let data = localStorage.getItem('Tareas');
        if (data) {
            setTodo(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('Tareas', JSON.stringify(todo))
    }, [todo])

    return (
        <div className="todoContainer">
            <form className='todoForm' onSubmit={handleSubmit}>
                <input onChange={handleTextChange}
                    className='todoInput'
                    type="text"
                    placeholder="Escribe tu tarea..."
                    value={text} />
                <input onClick={handleSubmit}
                    className='todoButtom'
                    type="submit"
                    value='Crear Tarea' />
            </form>
            <div className="todosContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Tareas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todo.filter((t) => t.done === false).map((ele) => (
                            <Todo
                                key={ele.id}
                                ele={ele}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                                toggleTask={toggleTask}
                            />
                        ))}
                        <br />
                        <tr>
                            <th>Tareas Terminadas</th>
                        </tr>
                        <input type="checkbox"
                            checked={show}
                            onChange={() => setShow(!show)}
                        />
                        <label>Mostrar Tareas Terminadas.</label>
                        <button
                            className="todoButtonDelete"
                            onClick={handleClear}>Limpiar</button>
                        <br />
                        {show && todo.filter((t) => t.done === true).map((ele) => (
                            <Todo
                                key={ele.id}
                                ele={ele}
                                onUpdate={handleUpdate}
                                onDelete={handleDelete}
                                toggleTask={toggleTask}
                            />
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TodoApp