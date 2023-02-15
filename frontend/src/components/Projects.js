import React from 'react'
import {Link} from "react-router-dom";

const ProjectItem=({project, deleteProject, get_user_data}) => {


     return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.project_name}</Link>
            </td>
            <td>
                {project.description}
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {get_user_data(project.user)}
                {/*{project.user[0].first_name +" " +project.user[0].last_name}*/}
            </td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Удалить</button></td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject, get_user_data}) => {
return (
    <div>
        <p>Projects List</p>

    <table>
        <th>
            Name
        </th>
        <th>
            Description
        </th>
        <th>
            link
        </th>
        <th>
            User
        </th>

            {projects.map((project) => <ProjectItem project={project}
                                                    deleteProject={deleteProject}
                                                    get_user_data={get_user_data}/>)}
        </table>
        <Link to='projects/create'>Добавить проект</Link>
        </div>
    )
}
export default ProjectList
