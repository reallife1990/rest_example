
import './App.css';
import React from 'react';
import axios from 'axios';
import AuthorList from './components/Author.js'
import UserList from './components/Users.js'
import ProjectList from './components/Projects.js'
import SimlpeProject from "./components/SimpleProject";
import {BrowserRouter, HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom'
import TodoList from "./components/todos";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie/es6";
import projects from "./components/Projects.js";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
        )
    }
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
            'users':[],
            'projects':[],
            'todos':[],
            'token':'',
        }
    }

    set_token(token){
        const cookies = new Cookies()
        cookies.set('token',token)
        this.setState({'token':token}, ()=>{this.load_data()})
    }

    is_authenticated(){
        // console.log(this.state.token != '')
        // console.log(this.state.token !== '')
        return this.state.token != ''
    }

    logout(){

        this.set_token('')

    }

    get_headers(){
        let headers = {
            'Content-Type':'application/json',
        }
        if( this.is_authenticated())
        {
            headers['Authorization'] = 'Token '+ this.state.token
        }
        return headers
    }
    get_project_name(id){
        //console.log(id)
        let pr = this.state.projects.filter((item)=>item.id == id)
        //console.log(pr[0].project_name)
        return (pr[0].project_name)
    }

     get_user_data(id){
        let data = this.state.users.filter((item)=>item.id == id)
        //console.log(data[0].first_name +" "+data[0].last_name)
        return (data[0].first_name +" "+data[0].last_name)
    }
    get_token_from_storage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        console.log({token})
        this.setState({'token': token}, ()=>{this.load_data()})
    }
    get_token(login, password){
        axios.post('http://127.0.0.1:8008/api-token-auth/', {username:login, password:password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('неверный пароль'))
    }

    deleteProject(id){
        console.log(id)
        const headers = this.get_headers()
        // при использовании переменных в урле - обратные кавычки!!!
        axios.delete(`http://127.0.0.1:8008/api/projects/${id}`, {headers})
            .then(response =>{
                this.setState({projects:this.state.projects.filter((item)=>item.id !== id)})
            }).catch(error => console.log(error))
    }


    createProject(project_name, description,link,user){
        const headers = this.get_headers()
        const data = {project_name:project_name, description:description, link:link, user:user}
        //console.log({data})
        axios.post('http://127.0.0.1:8008/api/projects/', data, {headers})
            .then(response => {
                let new_project = response.data
                console.log(new_project)
                this.setState({projects:[... this.state.projects, new_project]})
                console.log(this.state.projects)
            }).catch(error => console.log(error))




    }
    createTodo(text,project, created_user) {
        const headers = this.get_headers()
        const data = {text: text, project: project, created_user: created_user, completed: 'False'}
        // console.log({data})
        axios.post('http://127.0.0.1:8008/api/todo/', data, {headers})
            .then(response => {
                let new_todo = response.data
                console.log(new_todo)
                this.setState({todos: [...this.state.todos, new_todo]})
                console.log(this.state.todos)
            }).catch(error => console.log(error))
    }
     deleteTodo(id){
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8001/api/todo/${id}`, {headers})
            .then(response =>{
                this.state.todos.filter((item)=>item.id == id)[0].completed=true
                this.setState({todos:this.state.todos})
                // console.log(this.state.todos)
            }).catch(error => console.log(error))
    }

    updateTodo(id, text,created_user){
        const headers = this.get_headers()
        const data =  {text: text, created_user: created_user}

        axios.put(`http://127.0.0.1:8008/api/todo/${id}`,data, {headers})
            .then(response =>{
                this.state.todos.filter((item)=>item.id == id)[0].completed=true
                this.setState({todos:this.state.todos})
                // console.log(this.state.todos)
            }).catch(error => console.log(error))
    }
    load_data(){
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8008/api/authors/', {headers})
        .then(response => {
            const authors = response.data.results
                //console.log(authors)
                this.setState(
                    {
                        'authors': authors
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8008/api/users', {headers})
        .then(response => {
            const users = response.data.results
            //console.log(users)
                //console.log(users)
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8008/api/projects', {headers})
        .then(response => {
            const projects = response.data.results
                //console.log(projects)
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8008/api/todo', {headers})
        .then(response => {
            const todos = response.data.results
                //console.log(todos)
                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => console.log(error))

    }

    componentDidMount() {
      this.get_token_from_storage()

       }


    render () {
        return (
            <div className='App'>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todo'>To do </Link>
                            </li>
                           <li>
                                {this.is_authenticated() ? <button onClick={() => this.logout()}>logout</button>:<Link to='/login'>Login </Link>}

                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <UserList
                            users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList
                            projects={this.state.projects}
                            get_user_data={(id) => this.get_user_data(id)}
                            deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/projects/create' component={() => <ProjectForm
                            users={this.state.users}
                            createProject = {(project_name, description,link,user) => this.createProject(project_name, description,link,user)}
                            projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>}/>

                        <Route exact path='/project/:id' component={() => <SimlpeProject
                            projects={this.state.projects}
                            get_user_data={(id) => this.get_user_data(id)}/>}/>
                        <Route exact path='/login' component={() => <LoginForm get_token={(login,password) => this.get_token(login,password)}/>}/>
                        {/*<Route exact path='/todo' component={() => <TodoList*/}
                        {/*    todos={this.state.projects} deleteTodo={(id) => this.deleteTodo(id)}/>}/>*/}

                        <Route path="/todo">
                            <TodoList todos={this.state.todos}
                                      deleteTodo={(id) =>this.deleteTodo(id)}
                                      get_project_name={(id)=> this.get_project_name(id)}
                                      get_user_data={(id)=> this.get_user_data(id)}
                                      />
                        </Route>



                        <Route exact path='/todos/create' component={() => <TodoForm
                            users={this.state.users}
                            createTodo = {(text,project, created_user)=>this.createTodo(text,project, created_user)}
                            projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>}
                        />
                        <Redirect from='/authors' to='/'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>





            </div>
        )
    }
}
export default App;

