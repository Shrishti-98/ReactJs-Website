import React from 'react';
import {Link } from 'react-router-dom';
import './Login.css';

var modal = document.getElementById('id01');
window.onClick = function(event){
    if(event.target === modal){
        modal.style.display = "none";
    }
}
const handlebtn=() => {
    document.getElementById('id01').style.display='block' ;
}
const handleClk= ()=> {
    document.getElementById('id01').style.display='none';
}
class Login extends React.Component{
    state = {
        logs : [],
        log : {
            username : '',
            password : ''
        }
    }
    componentDidMount(){
        this.getLogs();
    }

    getLogs=_=>{
        fetch('http://localhost:4000/login')
         .then(response=>response.json())
         .then(response=>this.setState({logs:response.data}))
         .catch(err=>console.error(err))
    }

    addlog= _ => {
        const{log} = this.state;
        fetch(`http://localhost:4000/login?username=${log.username}&password=${log.password}`)
          .catch(err=>console.error(err))
        
    }

    renderUser = ({ id}) => <div key={id}></div>

    render(){
        const{logs,log} = this.state;
        return(
            <div>
              <div className="An">
                {logs.map(this.renderUser)}
                <button className="pad" onClick= {handlebtn} style={{width:'auto'}}>Login</button>
                <div id="id01" className="modal">
                <form className="modal-content animate">
                    <div className="imgcontainer">
                        <span onClick={handleClk} className="close" title="Close Modal">&times;</span>
                        <img src="img.jpg" alt="Avatar" className="avatar"/> 
                    </div>
                    <div className="container">
                        <label htmlFor="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required
                            onChange={e=>this.setState({log:{...log,username:e.target.value}})}
                        /> 

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required
                            onChange={e=>this.setState({log:{...log,password:e.target.value}})}
                        /> 

                        <button type="submit" onClick={this.addlog}>Login</button>
                        <label>
                        <input type="checkbox"  name="remember"/> Remember me   
                        </label>
                    </div>

                    <div className="container" style={{backgroundColor:"#f1f1f1"}}>
                         <button type="button" onClick= {handleClk} className="cancelbtn">Cancel</button>
                         <span className="psw">Forgot <a href="#">password?</a></span>
                    </div>
                    <span>New User ?
                    <Link to={'/Signup'}>
                        <button type="button" className="new">Signup</button>
                    </Link>
                    </span>
               
                </form>
                
                </div>
                </div>
            </div>
        );
    }
}
export default Login;
