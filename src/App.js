import React, { Component } from 'react';
//importing css file
import './App.css';
//importing axios from the node modules (in order to make API call)
import axios from 'axios';

class App extends Component {

 constructor(){
   console.log("Halllo from Constructor");
   super();
   this.state = {
     jokeArray: [],
   }
 }
 componentDidMount(){
   console.log('Hello from COMPONENT DID MOUNT');
   document.addEventListener('mousedown', this.handleClickOutside);

   
 }
 componentDidUpdate(){
   console.log('hello from DID UPDATE')
 }
 componentWillUnmount(){
   console.log('hello from COMPONENT WILL UNMOUNT')
 }


getJoke = (e) => {
  axios({
    method: 'get',
    url: 'http://api.icndb.com/jokes/random?escape=javascript',
    responseType: 'json'
  }).then((res) => {
    console.log (res)

    this.setState({
      jokeArray: res.data.value,
      jokeTime: res.data.value.joke
     //  jokeName: res.dajokeObjects[0].title
    });
  })
  e.stopPropagation()
}

handleBodyClick = () => {
  alert('`no bad bad')
}

 handleClick = (ev) => {

  ev.preventDefault()

}

 render(){
   console.log('Hello from the RENDER method');
 return (
   <div className="App" onClick={this.handleBodyClick}>
     <h1>Chuckin'Norris</h1>
     <p>test test</p>
     <p>{this.state.jokeTime}</p>
     <button onClick={this.getJoke}></button>

     <p>change test</p>
     
   </div>
  );
 }
}


export default App;