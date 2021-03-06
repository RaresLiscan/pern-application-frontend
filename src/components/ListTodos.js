import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const getTodos = async() => {
        try {
            
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);

        } catch (err) {
            console.error(err.message);
        }
    }

    //DELETE FUNCTION
    const deleteRow = async (id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"}
            });
            setTodos(todos.filter(todo => todo.todo_id !== id));

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, []);

    console.log(todos);
    return (
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delte</th>
                </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo} />
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteRow(todo.todo_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>*/}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos;