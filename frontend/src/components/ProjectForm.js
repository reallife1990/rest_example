import React from "react";
import {Link} from "react-router-dom";

class ProjectForm extends React.Component{
    constructor(props) {
        super(props)
            // props.users[0]?.id для значения первого user
            // иначе оно будет пустым
            this.state = {project_name:"", description:"", link:"", user:props.users[0]?.id}
    }

    handleChange(event){
        this.setState(
                {[event.target.name]:event.target.value
            }
        )
    }

    handleSubmit(event){
        this.props.createProject(this.state.project_name, this.state.description, this.state.link, this.state.user)
        event.preventDefault()

    }


    render() {
        return(
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="project_name">Проект  </label>
                    <input type="text" className="form-control" name="project_name"
                           value={this.state.project_name} onChange={(event)=>this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание </label>
                    <input type="text" className="form-control" name="description"
                           value={this.state.description} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="link">Ссылка </label>
                    <input type="text" className="form-control" name="link"
                           value={this.state.link} onChange={(event) => this.handleChange(event)}/>
                </div>
                 <div className="form-group">
                    <label htmlFor="user">Пользователь </label>
                     <select name="user" className="form-control"
                             onChange={(event) => this.handleChange(event)}>
                    {this.props.users.map((item)=><option value={item.id}>{item.first_name} {item.last_name}</option>)}
                    </select>
                    {/*<input type="text" className="form-control" name="user"*/}
                    {/*       value={this.state.user} onChange={(event) => this.handleChange(event)}/>*/}
                </div>
                <input type="submit" className="btn btn-primary" value="Сохранить"></input>
            </form>
        )
    }
}
export default ProjectForm
