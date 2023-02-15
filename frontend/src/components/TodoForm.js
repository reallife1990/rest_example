import React from "react";

class TodoForm extends React.Component{
    constructor(props) {
        super(props)
            // props.users[0]?.id для значения первого user
            // иначе оно будет пустым
            this.state = {text:"", project:props.projects[0]?.id, created_user:props.users[0]?.id}
    }

    handleChange(event){
        this.setState(
                {[event.target.name]:event.target.value
            }
        )
    }

    handleSubmit(event){
        this.props.createTodo(this.state.text, this.state.project, this.state.created_user)
        event.preventDefault()
    }


    render() {
        return(
            <form onSubmit={(event)=>this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="text">Задание  </label>

                    <textarea  rows={5} cols={50} className="form-control" name="text"
                           value={this.state.text} onChange={(event)=>this.handleChange(event)}/>
                </div>
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="description">Описание </label>*/}
                {/*    <input type="text" className="form-control" name="description"*/}
                {/*           value={this.state.description} onChange={(event) => this.handleChange(event)}/>*/}
                {/*</div>*/}
                {/*<div className="form-group">*/}
                {/*    <label htmlFor="link">Ссылка </label>*/}
                {/*    <input type="text" className="form-control" name="link"*/}
                {/*           value={this.state.link} onChange={(event) => this.handleChange(event)}/>*/}
                {/*</div>*/}
                <div className="form-group">
                    <label htmlFor="project">Проект </label>
                     <select name="project" className="form-control"
                             onChange={(event) => this.handleChange(event)}>
                    {this.props.projects.map((item)=><option value={item.id}>{item.project_name} </option>)}
                    </select>
                    {/*<input type="text" className="form-control" name="user"*/}
                    {/*       value={this.state.user} onChange={(event) => this.handleChange(event)}/>*/}
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
                <input type="submit" className="btn btn-primary" value="Сохранить"/>
            </form>
        )
    }
}
export default TodoForm
