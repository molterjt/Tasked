import React, { Component } from 'react';
import {  MDBContainer,} from "mdbreact"
import './App.css';
import AddTask from './containers/AddTask';
import MappedTaskList from './containers/MappedTaskList';

class App extends Component {
    render() {
        return (
            <MDBContainer  md={"12"} style={{flex:1, texAlign:'center', justifyContent:'center',}} >
                <h1 className="display-3 text-center">Tasked:</h1>
                <AddTask/>
                <MappedTaskList />
            </MDBContainer>
        );
    }
}
export default App;
