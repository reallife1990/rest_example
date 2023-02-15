import React from 'react'
import {Link} from "react-router-dom";

const TodoItem=({todo, deleteTodo, get_project_name, get_user_data}) => {
    return (
        <tr>
            <td>
                <Link to={`project/${todo.project}`}>{get_project_name(todo.project)}</Link>

            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created_at.replace("T"," ").slice(0,16)}
            </td>
            <td>
                {todo.updated_at.replace("T"," ").slice(0,16)}
            </td>
            <td>
                {get_user_data(todo.created_user)}
            </td>
             <td>
                 <button onClick={()=>deleteTodo(todo.id)} type='button'>Выполнить</button>
             </td>

        </tr>
    )
}

const TodoItemCompl=({todo, get_project_name, get_user_data}) => {
    return (
        <tr>
            <td>
                <Link to={`project/${todo.project}`}>{get_project_name(todo.project)}</Link>

            </td>
            <td>
                {todo.text}
            </td>

            <td>
                {todo.updated_at.replace("T"," ").slice(0,16)}
            </td>
            <td>
                {get_user_data(todo.created_user)}
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo, get_project_name, get_user_data}) => {
console.log(todos)
    //let compl=true
    //let show = todos.filter((item)=> item.completed == false)
    //console.log(show)
    return (
    <div>
        <p> Задачи к выполнению</p>
        <table border="1px">
            <th>
                Проект
            </th>
            <th>
               Задание
            </th>
            <th>
                Создано
            </th>
            <th>
                Обновлено
            </th>
            <th>
                Автор
            </th>
             <th>
                Выполнить!
            </th>

              {todos.filter((item)=> item.completed == false).map((todo) => <TodoItem todo={todo}
                                           deleteTodo={deleteTodo}
                                           get_project_name={get_project_name}
                                            get_user_data={get_user_data}/>)}
        </table>
         <Link to='todos/create'>Добавить заметку</Link>

    <p> Выполненные задачи </p>
    <table border="1px">
        <th>
            Проект
        </th>
        <th>
            Задание
        </th>

        <th>
            Выполнено
        </th>
        <th>
            Автор
        </th>

            {todos.filter((item)=> item.completed == true).map((todo_compl) => <TodoItemCompl todo={todo_compl}
                                            get_project_name={get_project_name}
                                            get_user_data={get_user_data}/>)}
            </table>
        </div>
    )
}
export default TodoList