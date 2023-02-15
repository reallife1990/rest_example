import React from 'react'
import {useParams} from "react-router-dom"; // получение ид из параметров

const ProjectItem=({project, get_user_data}) => {

     return (
        <tr>
            <td>
                {project.project_name}
            </td>
            <td>
                {project.description}
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {get_user_data(project.user)}

            </td>
        </tr>
    )
}

const SimlpeProject = ({projects, get_user_data}) => {
    let {id} =useParams()
    // console.log(id)
    // console.log([projects])
    let filtered_project = projects.filter((project) => project.id == id)


return (
    <div>
        <p>Project Object</p>

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

            {filtered_project.map((project) => <ProjectItem project={project}
                                                            get_user_data={get_user_data}
            />) }
        </table>
        </div>
    )
}
export default SimlpeProject